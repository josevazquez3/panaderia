import { neon } from "@neondatabase/serverless";
import { put } from "@vercel/blob";
import { existsSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { defaultCarouselImages, defaultContent, defaultSettings } from "../lib/defaults";

function loadEnvFile(filePath: string): void {
  if (!existsSync(filePath)) return;

  const content = readFileSync(filePath, "utf8");

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;

    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

async function carouselUrls(): Promise<typeof defaultCarouselImages> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  if (!token) {
    console.log(
      "BLOB_READ_WRITE_TOKEN no está definido. El carrusel usará las fotos de public/images.",
    );
    return defaultCarouselImages;
  }

  const uploaded = [];

  for (const image of defaultCarouselImages) {
    const fileName = image.imageUrl.split("/").pop();
    if (!fileName) {
      throw new Error(`No se pudo leer el archivo de ${image.imageUrl}`);
    }

    const filePath = path.join(process.cwd(), "public", "images", fileName);
    const body = await readFile(filePath);
    const blob = await put(`carousel/${fileName}`, body, {
      access: "public",
      token,
      contentType: "image/jpeg",
      allowOverwrite: true,
    });

    uploaded.push({ ...image, imageUrl: blob.url });
  }

  return uploaded;
}

async function main(): Promise<void> {
  loadEnvFile(path.join(process.cwd(), ".env.local"));

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error(
      "Falta DATABASE_URL en .env.local. No se puede sembrar la base.",
    );
    process.exit(1);
  }

  const sql = neon(databaseUrl);

  await sql`
    CREATE TABLE IF NOT EXISTS site_settings (
      id INT PRIMARY KEY DEFAULT 1,
      bakery_name TEXT NOT NULL,
      logo_url TEXT,
      email TEXT NOT NULL,
      instagram_url TEXT,
      facebook_url TEXT
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS site_content (
      key TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      body TEXT NOT NULL
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS carousel_images (
      id SERIAL PRIMARY KEY,
      image_url TEXT NOT NULL,
      alt TEXT NOT NULL,
      position INT NOT NULL DEFAULT 0,
      active BOOLEAN NOT NULL DEFAULT TRUE
    )
  `;

  const settings = defaultSettings;

  await sql`
    INSERT INTO site_settings (
      id,
      bakery_name,
      logo_url,
      email,
      instagram_url,
      facebook_url
    )
    VALUES (
      ${settings.id},
      ${settings.bakeryName},
      ${settings.logoUrl},
      ${settings.email},
      ${settings.instagramUrl},
      ${settings.facebookUrl}
    )
    ON CONFLICT (id) DO UPDATE SET
      bakery_name = EXCLUDED.bakery_name,
      logo_url = EXCLUDED.logo_url,
      email = EXCLUDED.email,
      instagram_url = EXCLUDED.instagram_url,
      facebook_url = EXCLUDED.facebook_url
  `;

  for (const block of [defaultContent.origin, defaultContent.mission]) {
    await sql`
      INSERT INTO site_content (key, title, body)
      VALUES (${block.key}, ${block.title}, ${block.body})
      ON CONFLICT (key) DO UPDATE SET
        title = EXCLUDED.title,
        body = EXCLUDED.body
    `;
  }

  const images = await carouselUrls();

  await sql`DELETE FROM carousel_images`;

  for (const image of images) {
    await sql`
      INSERT INTO carousel_images (image_url, alt, position, active)
      VALUES (${image.imageUrl}, ${image.alt}, ${image.position}, ${image.active})
    `;
  }

  console.log(
    `Listo. ${settings.bakeryName} quedó cargada con ${images.length} imágenes en el carrusel.`,
  );
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Error desconocido";
  console.error(message);
  process.exit(1);
});

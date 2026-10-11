import { cache } from "react";
import { getDb } from "@/lib/db";
import {
  defaultCarouselImages,
  defaultContent,
  defaultSettings,
} from "@/lib/defaults";
import type {
  CarouselImage,
  ContentKey,
  SiteContent,
  SiteContentBlock,
  SiteSettings,
} from "@/types";

let warnedMissingDatabase = false;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readText(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function readNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function readBoolean(value: unknown): boolean | null {
  if (typeof value === "boolean") return value;
  if (value === "t" || value === "true" || value === "1") return true;
  if (value === "f" || value === "false" || value === "0") return false;
  return null;
}

function readContentKey(value: unknown): ContentKey | null {
  if (value === "origin" || value === "mission") return value;
  return null;
}

function asRows(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function logDbError(context: string, error: unknown): void {
  const message = error instanceof Error ? error.message : "error desconocido";

  if (message === "DATABASE_URL no está definida") {
    if (warnedMissingDatabase) return;
    warnedMissingDatabase = true;
    console.warn(
      "DATABASE_URL no está definida. Se muestra el contenido por defecto.",
    );
    return;
  }

  console.error(`${context}: ${message}`);
}

function parseSettings(row: unknown): SiteSettings | null {
  if (!isRecord(row)) return null;

  const bakeryName = readText(row.bakery_name);
  const email = readText(row.email);
  if (!bakeryName || !email) return null;

  return {
    id: readNumber(row.id) ?? defaultSettings.id,
    bakeryName,
    logoUrl: readText(row.logo_url),
    email,
    instagramUrl: readText(row.instagram_url),
    facebookUrl: readText(row.facebook_url),
  };
}

function parseContentBlock(row: unknown): SiteContentBlock | null {
  if (!isRecord(row)) return null;

  const key = readContentKey(row.key);
  const title = readText(row.title);
  const body = readText(row.body);
  if (!key || !title || !body) return null;

  return { key, title, body };
}

function parseCarouselImage(row: unknown): CarouselImage | null {
  if (!isRecord(row)) return null;

  const id = readNumber(row.id);
  const imageUrl = readText(row.image_url);
  const alt = readText(row.alt);
  if (id === null || !imageUrl || !alt) return null;
  if (readBoolean(row.active) === false) return null;

  return {
    id,
    imageUrl,
    alt,
    position: readNumber(row.position) ?? 0,
    active: true,
  };
}

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  try {
    const sql = getDb();
    const result: unknown = await sql`
      SELECT id, bakery_name, logo_url, email, instagram_url, facebook_url
      FROM site_settings
      WHERE id = 1
      LIMIT 1
    `;

    return parseSettings(asRows(result)[0]) ?? defaultSettings;
  } catch (error) {
    logDbError("No se pudo leer site_settings", error);
    return defaultSettings;
  }
});

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  try {
    const sql = getDb();
    const result: unknown = await sql`
      SELECT key, title, body
      FROM site_content
      WHERE key IN ('origin', 'mission')
    `;

    const content: SiteContent = {
      origin: defaultContent.origin,
      mission: defaultContent.mission,
    };

    for (const row of asRows(result)) {
      const block = parseContentBlock(row);
      if (block) content[block.key] = block;
    }

    return content;
  } catch (error) {
    logDbError("No se pudo leer site_content", error);
    return defaultContent;
  }
});

export const getCarouselImages = cache(async (): Promise<CarouselImage[]> => {
  try {
    const sql = getDb();
    const result: unknown = await sql`
      SELECT id, image_url, alt, position, active
      FROM carousel_images
      WHERE active = TRUE
      ORDER BY position ASC, id ASC
    `;

    return asRows(result)
      .map(parseCarouselImage)
      .filter((image): image is CarouselImage => image !== null)
      .sort((left, right) => left.position - right.position);
  } catch (error) {
    logDbError("No se pudo leer carousel_images", error);
    return defaultCarouselImages;
  }
});

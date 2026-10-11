import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let client: NeonQueryFunction<false, false> | undefined;
let clientUrl: string | undefined;

/**
 * El cliente se crea al usarlo. Si falta DATABASE_URL, la consulta lanza
 * y la página sigue en pie con el contenido por defecto.
 * La ventana de 60 segundos acompaña a `revalidate` en la home.
 */
export function getDb(): NeonQueryFunction<false, false> {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL no está definida");
  }

  if (!client || clientUrl !== connectionString) {
    client = neon(process.env.DATABASE_URL!, {
      fetchOptions: {
        next: { revalidate: 60 },
      },
    });
    clientUrl = connectionString;
  }

  return client;
}

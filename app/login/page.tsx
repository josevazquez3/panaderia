import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Ingresar",
  description: "Ingreso del equipo de la panadería.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <main className="bg-brand-cream">
      <Container className="flex min-h-[calc(100vh-10rem)] items-center py-16 sm:py-20">
        <div className="mx-auto w-full max-w-md rounded-3xl bg-white p-8 shadow-soft sm:p-10">
          <h1 className="font-display text-4xl font-medium tracking-tight text-brand-ink">
            Ingresar
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-gray-500 sm:text-base">
            Por ahora esta pantalla solo muestra el ingreso. El correo y la
            contraseña no se envían a ningún lado.
          </p>
          <LoginForm />
        </div>
      </Container>
    </main>
  );
}

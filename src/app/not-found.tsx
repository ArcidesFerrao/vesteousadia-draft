import { NavLink } from "@/components/Nav";
import React from "react";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="font-bold mb-4">404 - Pagina nao encontrada</h1>
      <p className="mb-6">Oops! A pagina que procura nao existe.</p>
      <NavLink href="/">
        <h3 className="p-6 bg-black text-white rounded-lg hover:bg-gray-800 transition">
          Voltar para Veste Ousadia
        </h3>
      </NavLink>
    </main>
  );
}

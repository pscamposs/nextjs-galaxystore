"use client";

import Link from "next/link";

export default function FooterComponent() {
  return (
    <section className="w-dvw fixed bottom-0 px-12 py-6 bg-zinc-900">
      <div className="flex justify-between items-center max-lg:flex-col max-lg:gap-8">
        <div className="flex flex-col justify-center text-center">
          <h4>Copyright © Galaxy Store - 2024</h4>
          <p className="text-zinc-400">
            Este site não possui quaisquer vinculos com a Mojang AB.
          </p>
        </div>
        <ul className="flex gap-4">
          <li>
            <Link href="/termos" className="hover:text-purple-700">
              Termos de Uso
            </Link>
          </li>
          <li>
            <Link href="/perfil" className="hover:text-purple-700">
              Sobre
            </Link>
          </li>
          <li>
            <Link href="/perfil" className="hover:text-purple-700">
              Suporte
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

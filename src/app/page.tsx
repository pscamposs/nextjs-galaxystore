"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCode,
  faRocket,
  faShop,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { Layout } from "@/components/Layout";
import Header from "@/components/Header";

export default function Home() {
  return (
    <Layout header={<Header />}>
      <main>
        <section className="w-[80%] m-auto">
          <div className="flex justify-center py-16 items-center m-auto gap-8 max-lg:flex-wrap">
            <div>
              <h2 className="text-3xl">
                Os melhores plugins pelos melhores preços,{" "}
                <span className="text-purple-800 font-bold">
                  impulsione o crescimento do seu servidor com excelência!
                </span>
              </h2>
              <p className="text-xl text-zinc-400">
                Contamos com pessoas especializadas para garantir qualidade e
                inovação.
              </p>
            </div>

            <div>
              <Image
                src="/res/images/floatinghouse.png"
                alt="FloatingHouse"
                width={350}
                height={350}
                className="animate-float"
              />
            </div>
          </div>
          <div className="bg-zinc-900 py-12 px-6 rounded-md">
            <div className="flex flex-col gap-2">
              <div>
                <h2 className="text-3xl font-bold">Explore nossos plugins</h2>
                <p className="text-zinc-300">
                  Descubra soluções de alta qualidade com preços acessíveis,
                  feitas para elevar sua experiência.
                </p>
              </div>

              <div className="py-4">
                <Link href="/plugins" className="bg-purple-800 p-4 rounded-sm">
                  <FontAwesomeIcon icon={faShop} className="px-2" />
                  <span>Catálogo</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-purple-800 py-12 text-center text-white rounded-md my-8">
          <h2 className="text-3xl font-bold">Oferta Especial</h2>
          <p className="text-lg py-4">
            Adquira seus plugins agora e ganhe 10% de desconto no primeiro
            pedido!
          </p>
          <Link
            href="/plugins"
            className="bg-white text-purple-800 font-bold py-2 px-6 rounded-md"
          >
            Aproveitar Oferta
          </Link>
        </section>
        <section className="w-[80%] m-auto py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 bg-zinc-800 p-4 rounded-md">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-purple-800 text-3xl"
              />
              <div>
                <h3 className="text-xl font-bold text-white">
                  Fácil Instalação
                </h3>
                <p className="text-zinc-400">
                  Instale e configure nossos plugins em poucos minutos.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-zinc-800 p-4 rounded-md">
              <FontAwesomeIcon
                icon={faRocket}
                className="text-purple-800 text-3xl"
              />
              <div>
                <h3 className="text-xl font-bold text-white">
                  Atualizações Frequentes
                </h3>
                <p className="text-zinc-400">
                  Receba melhorias constantes e novas funcionalidades.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-zinc-800 p-4 rounded-md">
              <FontAwesomeIcon
                icon={faCode}
                className="text-purple-800 text-3xl"
              />
              <div>
                <h3 className="text-xl font-bold text-white">
                  Compatibilidade Garantida
                </h3>
                <p className="text-zinc-400">
                  Compatível com as versões mais populares do Minecraft.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-zinc-800 p-4 rounded-md">
              <FontAwesomeIcon
                icon={faTachometerAlt}
                className="text-purple-800 text-3xl"
              />
              <div>
                <h3 className="text-xl font-bold text-white">
                  Alto Desempenho
                </h3>
                <p className="text-zinc-400">
                  Desenvolvido para eficiência sem prejudicar o desempenho.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-[80%] m-auto text-center py-8 cursor-default ">
          <h2 className="text-3xl text-purple-800 font-bold">
            Servidores que confiam em nossos plugins{" "}
          </h2>
          <p className="text-zinc-400">Servidores parceiros</p>
          <div className="flex justify-center py-4">
            <div className="flex items-center gap-4 hover:scale-105 hover:bg-zinc-700 transition-all cursor-pointer text-zinc-300 bg-zinc-800 rounded-md p-8">
              <Image
                src="https://cdn.discordapp.com/icons/1063820136412360765/b412b1d03ef21ead59e836fd931444d5.webp?size=128"
                alt="icon"
                width={74}
                height={74}
                className="rounded-full"
              />
              <div>
                <h3>Rede King</h3>
                <h3 className="text-lg font-bold">jogar.redeking.com</h3>
                <p className="font-medium">Offline</p>
              </div>
            </div>
          </div>
          <Link
            href="/discord"
            className="text-zinc-400 font-medium hover:text-zinc-300"
          >
            Quero aparecer aqui.
          </Link>
        </section>
      </main>
    </Layout>
  );
}

"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { Layout } from "@/components/Layout";
import Header from "@/components/Header";

export default function Home() {
  return (
    <Layout header={<Header />}>
      <section className="w-[80%] m-auto">
        <div className="flex justify-center py-16 items-center m-auto gap-8 max-lg:flex-wrap">
          <div>
            <h2 className="text-3xl">
              Os melhores plugins pelos melhores preços,{" "}
              <span className="text-purple-800 font-bold">
                cresça seu servidor com qualidade!
              </span>
            </h2>
            <p className="text-xl text-zinc-400">
              Nossa equipe conta com o melhores na área!
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
              <h2 className="text-3xl">Conheça nossos plugins</h2>
              <p>Adquira plugins com a melhor qualidade e preço do mercado</p>
            </div>
            <div className="py-4">
              <Link href="/plugins" className="bg-purple-800 p-4 rounded-sm">
                <FontAwesomeIcon icon={faShop} />
                <span>Catálogo</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

"use client";
import Header from "@/components/Header";
import { Layout } from "@/components/Layout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Discord() {
  const router = useRouter();

  useEffect(() => {
    router.push("https://discord.gg/galaxystore");
  }, [router]);

  return (
    <Layout header={<Header />}>
      <main className="flex justify-center items-center h-[80%]">
        <h1 className="text-2xl text-zinc-500">
          Redirecionando você para o Discord...
        </h1>
      </main>
    </Layout>
  );
}

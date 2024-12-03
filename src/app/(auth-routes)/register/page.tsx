"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { LoaderButton } from "@/components/LoaderButton";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import Header from "@/components/Header";
import { Input } from "@/components/input/Input";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let formData = new FormData(e.target as HTMLFormElement);

    let username = formData.get("username");
    let email = formData.get("email");

    let password = formData.get("password");

    let response = await fetch(`${process.env.API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/Json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    let data = await response.json();

    if (response.ok) {
      toast.success("Conta criado com sucesso.");
      signIn("credentials", {
        redirect: false,
        username,
        password,
      }).then(({ ok, error }: any) => {
        if (ok) {
          router.push("/perfil");
        } else {
          toast.error("Não foi possível entrar em sua conta.");
        }
      });
    } else {
      toast.error(`${data.message}`);
    }
    setLoading(false);
  };

  return (
    <Layout header={<Header />}>
      <section className="max-w-[500px] m-auto px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl">Galaxy Store</h1>
          <p>Olá! é bom ter você aqui</p>
        </div>
        <form onSubmit={handleRegister}>
          <Input
            type="text"
            placeholder="Ex. GalaxyUser"
            name="username"
            label="Usuário"
            icon={faUser}
          />

          <Input
            type="email"
            placeholder="Ex. galaxy@galaxystore.com"
            name="email"
            icon={faEnvelope}
          />

          <Input
            type="password"
            name="repeat_password"
            label="Senha de login"
            icon={faLock}
          />
          <Input
            type="password"
            name="repeat_password"
            label="Repita a senha"
            icon={faLock}
          />

          <div className="text-zinc-700 font-bold py-2">
            Ao criar sua conta você declara que leu e aceitou os {""}
            <Link href="/termos" target="_blank" className="text-zinc-500">
              termos e condições.
            </Link>
          </div>

          <div>
            <div>
              <LoaderButton
                loading={loading}
                type="submit"
                className="bg-zinc-900 w-full py-4 font-bold hover:bg-zinc-800 transition-all rounded-md"
              >
                Criar minha conta
              </LoaderButton>
            </div>
            <div>
              <p>
                Já possuo conta, quero{" "}
                <Link href="/login" className="text-purple-700 font-bold">
                  entrar em minha conta
                </Link>
              </p>
            </div>
          </div>
        </form>
      </section>
    </Layout>
  );
}

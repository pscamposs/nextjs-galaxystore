"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn, useSession } from "next-auth/react";

import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { LoaderButton } from "@/components/LoaderButton";
import { Layout } from "@/components/Layout";
import Header from "@/components/Header";
import { Input } from "@/components/input/Input";

export default function LoginPage() {
  const router = useRouter();

  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user) router.push("/perfil");
  }, [session, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let formData = new FormData(e.target as HTMLFormElement);

    let username = formData.get("username");
    let password = formData.get("password");

    signIn("credentials", {
      redirect: false,
      username,
      password,
    }).then(({ ok, error }: any) => {
      if (ok) {
        toast.success("Logado com sucesso");
        router.replace("/perfil");
      } else {
        toast.error("Usuário e ou senha incorretos.");
        console.log(error);
      }
      setLoading(false);
    });
  };

  return (
    <Layout header={<Header />}>
      <section className="max-w-[500px] m-auto px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl">Galaxy Store</h1>
          <p>Seja bem-vindo, efetue o seu login</p>
        </div>
        <form onSubmit={handleLogin} autoSave="false">
          <Input
            type="text"
            placeholder="Nome de usuário ou email"
            name="username"
            required
            label="Nome de usuário ou e-mail"
            icon={faEnvelope}
          />

          <Input type="password" label="Senha" name="password" icon={faLock} />

          <div>
            <Link
              href="/esqueci-a-senha"
              className="text-purple-600 hover:text-purple-500"
            >
              Esqueci minha senha
            </Link>
          </div>
          <div>
            <div>
              <LoaderButton
                loading={loading}
                type="submit"
                className="bg-zinc-900 w-full py-4 font-bold hover:bg-zinc-800 transition-all rounded-md"
              >
                Fazer Login
              </LoaderButton>
            </div>
            <div>
              <p>
                Não possuo conta, quero{" "}
                <Link href="/register" className="text-purple-700 font-bold">
                  criar uma conta
                </Link>
              </p>
            </div>
          </div>
        </form>
      </section>
    </Layout>
  );
}

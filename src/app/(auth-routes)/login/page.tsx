"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../../../public/res/images/galaxy-logo.png";
import { signIn, useSession } from "next-auth/react";

import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

import FormComponent, {
  FormHeader,
  FormWrapper,
  Separator,
} from "@/components/plugin/FormContainer";
import PasswordInput from "@/components/PasswordInput";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { useEffect, useState } from "react";
import { LoaderButton } from "@/components/LoaderButton";
import { Layout } from "@/components/Layout";
import Header from "@/components/Header";

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
      <FormComponent>
        <FormHeader>
          <h1 className="text-4xl">Galaxy Store</h1>
          <p>Seja bem-vindo, efetue o seu login</p>
        </FormHeader>
        <form onSubmit={handleLogin} autoSave="false">
          <FormWrapper>
            <FontAwesomeIcon icon={faEnvelope} />
            <input
              type="text"
              placeholder="Nome de usuário ou email"
              name="username"
              required
            />
          </FormWrapper>
          <FormWrapper>
            <FontAwesomeIcon icon={faLock} />
            <PasswordInput />
          </FormWrapper>
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
              <LoaderButton loading={loading} type="submit">
                Fazer Login
              </LoaderButton>
            </div>
            <Separator></Separator>
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
      </FormComponent>
    </Layout>
  );
}

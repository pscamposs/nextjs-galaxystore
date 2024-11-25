import { Layout } from "@/components/Layout";
import { LoaderButton } from "@/components/LoaderButton";
import { FormWrapper } from "@/components/plugin/FormContainer";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const Profile = () => {
  const { data: session } = useSession();

  const [userProfile, setUserProfile] = useState<{ [key: string]: string }>({});

  const handleChange = (e: any) => {
    setUserProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(userProfile);
  };

  return (
    <Layout>
      <section>
        <form className="w-[80%] " onSubmit={handleSubmit}>
          <FormWrapper>
            <input
              name="username"
              placeholder="Nome de usuário"
              value={session?.user.profile.username}
              onChange={handleChange}
              disabled
            />
          </FormWrapper>
          <FormWrapper>
            <input
              name="email"
              placeholder="E-mail"
              value={session?.user.profile.email}
              onChange={handleChange}
              disabled
            />
          </FormWrapper>
          <FormWrapper>
            <input
              placeholder="Senha atual"
              type="password"
              name="password"
              value={userProfile.password}
              onChange={handleChange}
              required
            />
          </FormWrapper>
          <FormWrapper>
            <input
              name="newpassword"
              placeholder="Nova senha"
              type="password"
              value={userProfile.npassword}
              onChange={handleChange}
              required
            />
          </FormWrapper>
          <LoaderButton className="bg-purple-800 inline-block px-10 py-4 cursor-pointer hover:bg-purple-700 transition-all">
            Salvar
          </LoaderButton>
        </form>
      </section>
    </Layout>
  );
};

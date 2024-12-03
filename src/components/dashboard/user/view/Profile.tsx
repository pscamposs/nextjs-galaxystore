import { FormWrapper } from "@/components/FormWrapper";
import { Input } from "@/components/input/Input";
import { Layout } from "@/components/Layout";
import { LoaderButton } from "@/components/LoaderButton";
import { fetchClient } from "@/libs/fetchClient";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

export const Profile = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const [userProfile, setUserProfile] = useState<{ [key: string]: string }>({
    password: "",
    newpassword: "",
  });

  const handleChange = (e: any) => {
    setUserProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetchClient(
      "/profile",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: userProfile.password,
          newpassword: userProfile.newpassword,
        }),
      },
      false
    );
    if (response.ok) {
      toast.success("Senha alterada com sucesso.");
      setUserProfile({
        password: "",
        newpassword: "",
      });
    } else {
      toast.error((await response.json()).message || "Senha atual incorreta.");
    }
    setLoading(false);
  };

  return (
    <Layout>
      <section>
        <form className="w-[40%] max-lg:w-full " onSubmit={handleSubmit}>
          <Input
            name="username"
            placeholder="Nome de usuário"
            value={session?.user.profile.username}
            onChange={handleChange}
            disabled
            label="Usuário"
            icon={faUser}
          />

          <Input
            name="email"
            placeholder="E-mail"
            value={session?.user.profile.email}
            onChange={handleChange}
            disabled
            label="Email"
            icon={faEnvelope}
          />

          <Input
            type="password"
            name="password"
            value={userProfile.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
            label="Senha atual"
            icon={faLock}
          />

          <Input
            name="newpassword"
            type="password"
            value={userProfile.npassword}
            onChange={handleChange}
            required
            label="Nova senha"
            icon={faLock}
          />

          <LoaderButton
            loading={loading}
            className="bg-purple-800 inline-block px-10 py-4 cursor-pointer hover:bg-purple-700 transition-all my-2"
          >
            Salvar
          </LoaderButton>
        </form>
      </section>
    </Layout>
  );
};

import { UserRanking } from "@/components/UserRanking";
import { fetchClient } from "@/libs/fetchClient";
import { centsToReal, timeAgo } from "@/utils/FormatUtils";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const Card = ({ label, data }: { label: string; data: any }) => {
  return (
    <div className="bg-zinc-900 w-full p-6 rounded-md shadow-sm shadow-zinc-900">
      <span className="text-4xl">{data}</span>
      <h2>{label}</h2>
    </div>
  );
};

export const HomeView = () => {
  const { data: session } = useSession();

  const fetchUserPayments = async () => {
    const response = await fetchClient("/payment");
    const data = await response.json();
    const paid = data.filter((payment: any) => payment.status === "paid");
    const total = paid.reduce((acc: number, payment: any) => {
      return acc + payment.subtotal;
    }, 0);

    return total;
  };

  const { data } = useQuery({
    queryKey: ["payments"],
    queryFn: fetchUserPayments,
  });

  return (
    <div>
      <h1 className="font-medium text-2xl">Dados da conta</h1>
      <section className="flex gap-4 justify-around flex-wrap">
        <div className="py-4 flex gap-4 flex-wrap">
          <Card
            label="Plugins comprados"
            data={session?.user.profile.plugins.length}
          />
          <Card label="Gastos totais" data={centsToReal(data)} />
          <Card label="Tickets abertos" data={0} />
          <Card label="Tickets concluidos" data={0} />
        </div>
        <UserRanking />
      </section>
    </div>
  );
};

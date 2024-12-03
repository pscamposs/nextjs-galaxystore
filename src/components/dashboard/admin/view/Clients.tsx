import Loader from "@/components/Loader";
import { TableSkeleton } from "@/components/skeleton/TableSkeleton";
import { fetchClient } from "@/libs/fetchClient";
import { centsToReal, timeAgo } from "@/utils/FormatUtils";
import { useQuery } from "@tanstack/react-query";

interface IClientPayments {
  username: string;
  email: string;
  subtotal: number;
  updatedAt: string;
  createdAt: string;
}

export const ClientsView = () => {
  const { data: clients, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const response = await fetchClient("/profile/users", {}, false);
      return (await response.json()) as IClientPayments[];
    },
  });

  if (isLoading) return <TableSkeleton />;

  const ClientItem = ({ client }: { client: IClientPayments }) => {
    return (
      <tr className=" border-b w-full  border-zinc-900 text-center hover:bg-zinc-900/10">
        <td className="p-4">{client.username}</td>
        <td>{client.email}</td>
        <td>{centsToReal(client.subtotal)}</td>
        <td>{timeAgo(client.updatedAt)}</td>
        <td>{timeAgo(client.createdAt)}</td>
      </tr>
    );
  };

  return (
    <div>
      <h1 className="font-medium text-2xl">Clientes da loja</h1>
      <section className="py-4 overflow-x-scroll">
        <table className="table-fixed w-full">
          <thead>
            <tr className="bg-zinc-900">
              <th className="p-4 text-sm font-normal leading-none text-zinc-400 w-40">
                Nome de usuário
              </th>

              <th className="p-4 text-sm font-normal leading-none text-zinc-400 w-40">
                Email
              </th>
              <th className="p-4 text-sm font-normal leading-none text-zinc-400 w-40">
                Total em compras
              </th>
              <th className="p-4 text-sm font-normal leading-none text-zinc-400 w-40">
                Ultima atualização
              </th>

              <th className="p-4 text-sm font-normal leading-none text-zinc-400 w-40">
                Data de criação
              </th>
            </tr>
          </thead>
          <tbody>
            {clients?.map((client) => {
              return <ClientItem client={client} key={client.email} />;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
};

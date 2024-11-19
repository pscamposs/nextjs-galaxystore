import { centsToReal, timeAgo } from "@/utils/FormatUtils";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";

interface ICardRanking {
  username: string;
  createdAt: string;
  total: number;
}
const CardRanking = (user: ICardRanking) => {
  return (
    <div className="flex justify-between items-center w-[80%] m-auto min-w-[400px]  p-4 cursor-default my-2">
      <div className="flex gap-2 items-end">
        <img
          className="rounded-md"
          src={`https://minotar.net/avatar/${user.username}/64`}
          alt="icon"
        />
        <div className="text-start">
          <h4 className="text-lg font-bold">{user.username}</h4>
          <p>Cliente {timeAgo(user.createdAt)}</p>
        </div>
      </div>
      <div className="bg-purple-900 font-bold p-2 rounded-sm">
        {centsToReal(user.total)}
      </div>
    </div>
  );
};

const fetchUserRanking = async () => {
  const response = await fetch(`${process.env.API_URL}/ranking`);
  const data = response.json();
  return data;
};

export const UserRanking = () => {
  const { data } = useQuery({
    queryKey: ["ranking"],
    queryFn: fetchUserRanking,
  });

  return (
    <div className="text-center bg-zinc-900 max-h-[500px] w-full max-w-[600px] py-4 rounded">
      <h2 className="font-medium">Ranking dos Clientes</h2>
      {data?.users.length > 0 ? (
        <section className="py-4 overflow-y-auto overflow-x-auto h-full overflow-hidden">
          {data.users.map((user: ICardRanking) => {
            return (
              <CardRanking
                key={user.username}
                username={user.username}
                total={user.total}
                createdAt={user.createdAt}
              />
            );
          })}
        </section>
      ) : (
        <Loader />
      )}
    </div>
  );
};

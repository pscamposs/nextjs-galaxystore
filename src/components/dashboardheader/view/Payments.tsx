import Loader from "@/components/Loader";
import { fetchClient } from "@/libs/fetchClient";
import { centsToReal, timeAgo } from "@/utils/FormatUtils";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { stat } from "fs";

interface IPaymentItem {
  method: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  subtotal: number;
}

const PaymentItem = ({ payment }: { payment: IPaymentItem }) => {
  const getPaymentMethod = (method: string) => {
    switch (method) {
      case "card":
        return "Cartão";
      default:
        return method;
    }
  };

  const getPaymentStatus = (status: string) => {
    switch (status) {
      case "unpaid":
        return "Não pago";
      case "paid":
        return "Pago";
      default:
        return status;
    }
  };

  return (
    <tr className=" border-b w-full  border-zinc-900 text-center hover:bg-zinc-900/10">
      <td className="p-4">{getPaymentMethod(payment.method)}</td>
      <td>{timeAgo(payment.createdAt)}</td>
      <td>{timeAgo(payment.updatedAt)}</td>
      <td>{getPaymentStatus(payment.status)}</td>
      <td>{centsToReal(payment.subtotal)}</td>
    </tr>
  );
};

export const PaymentsView = () => {
  const fetchPayments = async () => {
    const response = await fetchClient("/payment");

    return await response.json();
  };

  const { data: payments } = useQuery({
    queryKey: ["payment"],
    queryFn: fetchPayments,
  });

  if (!payments) return <Loader />;

  return (
    <div>
      <h1 className="font-medium text-2xl">Minhas compras</h1>
      <section className="py-4 overflow-x-scroll">
        <table className="table-fixed w-full">
          <thead>
            <tr className="bg-zinc-900">
              <th className="p-4 text-sm font-normal leading-none text-zinc-400 w-40">
                Método de Pagamento
              </th>

              <th className="p-4 text-sm font-normal leading-none text-zinc-400 w-40">
                Data de criação
              </th>
              <th className="p-4 text-sm font-normal leading-none text-zinc-400 w-40">
                Ultima atualização
              </th>
              <th className="p-4 text-sm font-normal leading-none text-zinc-400 w-40">
                Status
              </th>
              <th className="p-4 text-sm font-normal leading-none text-zinc-400 w-40">
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody className="">
            {payments.map((payment: IPaymentItem) => {
              return <PaymentItem key={payment.createdAt} payment={payment} />;
            })}
          </tbody>
        </table>
        {payments.length == 0 && (
          <div className="flex justify-center flex-col items-center py-12 gap-4">
            <FontAwesomeIcon icon={faShoppingBag} size="6x" />
            <p>Você não possuí nenhuma compra.</p>
          </div>
        )}
      </section>
    </div>
  );
};

import { centsToReal, timeAgo } from "@/utils/FormatUtils";
import Image from "next/image";
import styled from "styled-components";

const ClientCard = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  p {
    color: var(--secondary-white);
  }

  h2 {
    background-color: var(--draft-color-2);
    padding: 6px;
    border-radius: 1rem;
  }
`;

const ClientCardComponent = ({ user }: { user: ClientRanking }) => {
  return (
    <ClientCard>
      <div>
        <Image
          width={64}
          height={64}
          alt="icon"
          src={`https://minotar.net/avatar/${user.username}`}
        />
      </div>
      <div>
        <h3>{user.username}</h3>
        <p>Cliente {timeAgo(user.createdAt)}</p>
      </div>
      <h2>{centsToReal(user.total)}</h2>
    </ClientCard>
  );
};

export default ClientCardComponent;

"use client";
import PluginInfoModal from "@/components/modal/PluginInfoModal";
import PluginBuilder from "@/components/pluginBuilder/PluginBuilder";
import { Plugin } from "@/types/FilterTypes";

import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { centsToReal } from "@/utils/FormatUtils";
import Plugins from "@/components/plugin/Plugins";
import { useSession } from "next-auth/react";
import ClientCardComponent from "@/components/ClientRanking";
import Loader from "@/components/Loader";

const DashboardContainer = styled.div`
  padding: 0 2rem;

  main {
    display: flex;
    justify-content: center;

    flex-wrap: wrap;
  }

  header {
    li {
      list-style: none;
      display: flex;
      justify-content: end;

      button {
        background-color: var(--draft-color-2);
        color: aliceblue;
        padding: 0.5rem 1rem;
        cursor: pointer;
        border: none;
        cursor: pointer;

        &:hover {
          background-color: var(--draft-color);
          border-radius: 0.4rem;
          transition: all 0.2s;
        }
      }
    }
  }
`;
const CardContainer = styled.div`
  width: 100%;

  padding: 1rem 2rem;
  line-height: 200%;
  h3 {
    color: var(--draft-color-2);
    font-size: 1.5rem;
  }
  p {
    font-size: 1.6rem;
    font-weight: bold;
  }
`;

const Panels = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  padding: 2rem 1rem;
  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const PanelCard = ({ children }: { children: React.ReactNode }) => {
  return <CardContainer>{children}</CardContainer>;
};

const ClientListContainer = styled.div`
  padding: 8px 2rem;
  li {
    list-style: none;
    margin-top: 8px;
  }
`;

export default function AdminDashboard() {
  const { data: session } = useSession();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [editPlugin, setEditPlugin] = useState<Plugin>();

  return (
    <DashboardContainer>
      <PluginInfoModal />

      <header>
        <div>
          <h2>Seja bem vindo</h2>
          <p>Configure e administre a loja em seu dashboard</p>
        </div>
        <ul>
          <li>
            <button onClick={() => setDialogOpen(true)}>+ Novo plugin</button>
          </li>
        </ul>
      </header>
      <Panels>
        <PanelCard>
          <h3>Plugins na loja</h3>
          <p>{0}</p>
        </PanelCard>
        <PanelCard>
          <h3>Total em compras</h3>
          <p>{centsToReal(0)}</p>
        </PanelCard>
        <PanelCard>
          <h3>Clientes</h3>
          <p>{0} </p>
        </PanelCard>
        <PanelCard>
          <h3>Tickets Abertos</h3>
          <p>{0}</p>
        </PanelCard>
      </Panels>
      <main>
        {/* <Plugins
          setEditDialogOpen={setEditDialogOpen}
          setEditPlugin={setEditPlugin}
          plugins={query?.data}
        /> */}
        <ClientListContainer>
          <h2>Top compradores</h2>

          <ul>
            <li>
              {/* {adminQuery?.data?.clientRanking.map((client: any) => {
                return <ClientCardComponent user={client} key={0} />;
              })} */}
            </li>
          </ul>
        </ClientListContainer>
      </main>
      {isDialogOpen && (
        <PluginBuilder
          setDialogOpen={setDialogOpen}
          title="Criar um novo plugin"
        />
      )}
      {isEditDialogOpen && (
        <PluginBuilder
          setDialogOpen={setEditDialogOpen}
          title="Atualizando o plugin"
          editPlugin={editPlugin}
        />
      )}
    </DashboardContainer>
  );
}

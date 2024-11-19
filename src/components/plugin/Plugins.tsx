import { Plugin } from "@/types/FilterTypes";

import styled from "styled-components";
import PluginCard from "./PluginCard";

const PluginContainer = styled.div`
  display: flex;

  padding: 2rem;
  gap: 12px;
  border-radius: 4rem;
  white-space: nowrap;

  div {
    min-width: 300px;
  }
`;

export default function Plugins({
  plugins,
  setEditDialogOpen,
  setEditPlugin,
}: {
  plugins: Plugin[];
  setEditDialogOpen?: any;
  setEditPlugin?: any;
}) {
  if (plugins.length <= 0) {
    return (
      <PluginContainer>
        <h2>Você não possuí plugins</h2>
      </PluginContainer>
    );
  } else
    return (
      <PluginContainer>
        {plugins?.map((plugin: Plugin) => (
          <PluginCard
            key={plugin.id}
            plugin={plugin}
            edit={true}
            setEditPlugin={setEditPlugin}
            setDialogOpen={setEditDialogOpen}
          />
        ))}
      </PluginContainer>
    );
}

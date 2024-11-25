"use client";
import styled from "styled-components";
import { ContentContainer } from "../../components/ContentContainer";

import PluginInfoModal from "../../components/modal/PluginInfoModal";
import { PluginSearchWIcon } from "../../components/plugin/PluginSearchWIcon";
import { PluginFilters } from "../../components/plugin/PluginFilters";
import PluginCard from "../../components/plugin/PluginCard";
import { useQuery } from "@tanstack/react-query";
import { Category, FilterType, Plugin } from "@/types/FilterTypes";
import { use, useEffect, useMemo, useState } from "react";
import { useFilter } from "@/hooks/useFilter";
import Loader from "@/components/Loader";
import { Layout } from "@/components/Layout";
import Header from "@/components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBatteryEmpty,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";

const PluginSection = styled.section`
  margin-top: 24px;
  padding: 64px 156px;
  width: 100%;
  > div {
    display: flex;
    flex-direction: row;
    gap: 32px;
  }

  @media (max-width: 768px) {
    > div {
      flex-direction: column;
    }
    padding: 16px;
  }
`;

const PluginsSection = styled.section`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-gap: 32px;

  @media (max-width: 768px) {
    grid-template-columns: none;
  }
`;

const fetchPlugins = async (category: string) => {
  const response = await fetch(
    `${process.env.API_URL}/plugins${category ? `?category=${category}` : ""}`
  );
  const json = (await response.json()) as Plugin[];
  return json;
};

export default function PluginsHome() {
  const [category, setCategory] = useState<string>("");
  const { filterName } = useFilter();
  const [plugins, setPlugins] = useState<Plugin[]>([]);

  const queryPlugins = useQuery({
    queryKey: ["plugins", category],
    queryFn: () => fetchPlugins(category),
  });

  const handleFilter = (filter: string) => {
    if (category === filter.toLocaleLowerCase()) {
      setCategory("");
    } else setCategory(filter.toLowerCase());
  };
  const filteredPlugins = useMemo(() => {
    if (filterName) {
      return queryPlugins.data?.filter((p) =>
        p.name.toLowerCase().includes(filterName.toLowerCase())
      );
    }
    return queryPlugins.data;
  }, [filterName, queryPlugins.data]);

  useEffect(() => {
    if (filteredPlugins !== plugins) {
      if (filteredPlugins) {
        setPlugins(filteredPlugins);
      }
    }
  }, [filteredPlugins, plugins]);

  return (
    <Layout header={<Header />}>
      <ContentContainer>
        <PluginInfoModal />
        <PluginSection>
          <h2>Nossos Plugins</h2>

          <div>
            <div>
              <PluginSearchWIcon />

              <PluginFilters
                onFilter={handleFilter}
                categoryFilter={category}
              />
            </div>
            {queryPlugins.isLoading ? (
              <Loader />
            ) : (
              <PluginsSection>
                {plugins.length > 0 ? (
                  plugins.map((plugin: Plugin) => (
                    <PluginCard key={plugin.id} plugin={plugin} />
                  ))
                ) : (
                  <div className="w-full text-center">
                    <FontAwesomeIcon icon={faThumbsDown} size="4x" />
                    <h2 className="font-bold text-2xl">
                      Nenhum plugin encontrado
                    </h2>
                  </div>
                )}
              </PluginsSection>
            )}
          </div>
        </PluginSection>
      </ContentContainer>
    </Layout>
  );
}

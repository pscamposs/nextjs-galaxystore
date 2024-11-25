"use client";

import { PluginSearchWIcon } from "../../components/plugin/PluginSearchWIcon";
import { PluginFilters } from "../../components/plugin/PluginFilters";
import PluginCard from "../../components/plugin/PluginCard";
import { useQuery } from "@tanstack/react-query";
import { Plugin } from "@/types/FilterTypes";
import { useEffect, useMemo, useState } from "react";
import { useFilter } from "@/hooks/useFilter";
import Loader from "@/components/Loader";
import { Layout } from "@/components/Layout";
import Header from "@/components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";

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
      <div className="p-16">
        <h2 className="text-2xl">Nossos Plugins</h2>

        <div className="flex gap-8 flex-wrap max-lg:justify-center ">
          <div>
            <PluginSearchWIcon />

            <PluginFilters onFilter={handleFilter} categoryFilter={category} />
          </div>
          {queryPlugins.isLoading ? (
            <Loader />
          ) : (
            <div className="flex gap-8 flex-wrap justify-center">
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
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

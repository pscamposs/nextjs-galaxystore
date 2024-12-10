"use client";

import { useQuery } from "@tanstack/react-query";
import { Plugin } from "@/types/FilterTypes";
import { useEffect, useMemo, useState } from "react";
import { useFilter } from "@/hooks/useFilter";
import Loader from "@/components/Loader";
import { Layout } from "@/components/Layout";
import Header from "@/components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { PluginFilterSkeleton } from "@/components/skeleton/PluginFilterSkeleton";
import { PluginSkeleton } from "@/components/skeleton/PluginSkeleton";
import { Input } from "@/components/input/Input";
import { PluginFilters } from "@/components/plugin/PluginFilters";
import { PluginCard } from "@/components/plugin/PluginCard";

const fetchPlugins = async (category: string) => {
  const response = await fetch(
    `${process.env.API_URL}/plugins${category ? `?category=${category}` : ""}`
  );
  const json = (await response.json()) as Plugin[];
  return json;
};

export default function PluginsHome() {
  const [category, setCategory] = useState<string>("");
  const [filterName, setFilterName] = useState("");
  const [plugins, setPlugins] = useState<Plugin[]>([]);

  const { data: pluginsData, isLoading } = useQuery({
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
      return pluginsData?.filter((p) =>
        p.name.toLowerCase().includes(filterName.toLowerCase())
      );
    }
    return pluginsData;
  }, [filterName, pluginsData]);

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

        <div className="flex gap-8 max-lg:flex-col max-lg:justify-center items-center">
          <div className="min-w-[250px]">
            <Input
              type="search"
              label="Buscar plugin"
              icon={faSearch}
              placeholder="Ex. GalaxyPlugin"
              onChange={(e) => setFilterName(e.target.value)}
            />

            <PluginFilters onFilter={handleFilter} categoryFilter={category} />
          </div>
          {isLoading ? (
            <div className="flex flex-wrap gap-4">
              <PluginSkeleton />
              <PluginSkeleton />
              <PluginSkeleton />
              <PluginSkeleton />
            </div>
          ) : plugins.length ? (
            <div className="flex gap-8 flex-wrap justify-center">
              {plugins.map((plugin: Plugin) => (
                <PluginCard plugin={plugin} key={plugin.id} />
              ))}
            </div>
          ) : (
            <div className="text-zinc-400 text-center w-full">
              <FontAwesomeIcon icon={faThumbsDown} size="4x" />
              <h2 className="text-sm">
                Nenhum plugin encontrado com esse filtro.
              </h2>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

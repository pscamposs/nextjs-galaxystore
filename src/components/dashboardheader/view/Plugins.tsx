import { Plugin } from "@/types/FilterTypes";
import { faPlug } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Image from "next/image";

export const PluginsView = () => {
  const { data: session } = useSession();

  return (
    <div>
      <h1 className="font-medium text-2xl">Meus plugins</h1>
      {session?.user.profile.plugins.length == 0 && (
        <section className="text-slate-200 text-center py-8">
          <FontAwesomeIcon icon={faPlug} size="4x" />
          <h2 className="text-xl ">Você não possuí plugins</h2>
        </section>
      )}

      <section className="flex gap-4 flex-wrap py-8">
        {Array.from(
          new Map(
            session?.user.profile.plugins.map((plugin: Plugin) => [
              plugin.id,
              plugin,
            ])
          ).values()
        ).map((plugin: Plugin) => {
          return (
            <div
              key={plugin.id}
              className="flex items-center  gap-4 cursor-default"
            >
              <div className="bg-zinc-900 p-4">
                <Image
                  width={64}
                  height={64}
                  src={plugin.image}
                  alt="pluginImage"
                />
              </div>
              <div className="flex flex-col justify-between h-24">
                <div>
                  <h2 className="text-slate-400">{plugin.category.name}</h2>
                  <p className="font-bold text-2xl">{plugin.name}</p>
                </div>
                <div>
                  <button className="bg-purple-900 px-4 py-2 rounded-sm hover:bg-purple-800">
                    Baixar
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

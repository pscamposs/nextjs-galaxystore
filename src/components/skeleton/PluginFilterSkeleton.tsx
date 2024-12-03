export const PluginFilterSkeleton = () => {
  return (
    <div className="inline-flex w-[250px] gap-4 mx-2">
      <div className="animate-pulse flex space-x-4 w-[550px] ">
        <div className="animate-pulse flex space-x-4 w-full">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-16 bg-zinc-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

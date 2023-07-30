const BottomDrawerItemInfoSkeleton = () => (
  <div className="w-full animate-pulse flex flex-col">
    <div className="h-8 w-full rounded-md bg-fog " />
    <hr className="border-gunmetal dark:border-snow my-2" />
    <div className="flex mb-4 w-full">
      <div className="w-[120px] h-[172px] rounded-md bg-fog mr-4" />
      <div className="h-32 w-full rounded-md bg-fog " />
    </div>
    <div className="mb-4 w-full">
      <div className="h-6 lg:h-7 w-1/3 rounded-md bg-fog " />
      <hr className="border-gunmetal dark:border-snow mt-1 mb-2" />
      <div className="w-2/3 h-6 lg:h-7 rounded-md bg-fog mb-1" />
      <div className="w-2/3 h-6 lg:h-7 rounded-md bg-fog mb-1" />
      <div className="w-2/3 h-6 lg:h-7 rounded-md bg-fog mb-1" />
      <div className="w-2/3 h-6 lg:h-7 rounded-md bg-fog " />
    </div>
    <div className="w-full h-12 rounded-md bg-fog " />
  </div>
);

export default BottomDrawerItemInfoSkeleton;

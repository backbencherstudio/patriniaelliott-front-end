
function Overview({ overview }: any) {
  return (
    <div className="mb-8">
      <h3 className="text-2xl lg:text-[32px] font-medium text-blackColor leading-[126%]">
        Overview
      </h3>
      <p className="text-lg font-normal text-grayColor1 leading-[150%] mt-3">
        {overview?.description || "No description available."}
      </p>
    </div>
  );
}

export default Overview;


function ToureOverview({vendorPackage}) {
  return (
    <div className="mb-8">
      <h3 className="text-2xl lg:text-[32px] font-medium text-blackColor leading-[126%] pb-2 ">
        Overview
      </h3>
      <p dangerouslySetInnerHTML={{__html: vendorPackage?.description}}>
       

      </p>
     <div>
      <div className="mt-4">
        <h2 className="text-lg  font-semibold text-headerColor leading-[150%]">Meet Point: <span className=" font-medium text-grayColor1">{vendorPackage?.meting_points}</span></h2>
      </div>
      
     </div>
    </div>
  );
}

export default ToureOverview;

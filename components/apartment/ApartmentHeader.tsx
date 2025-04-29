import Rating from "../reusable/Rating";

const ApartmentHeader = ({ singleApartment }: any) => {
  const { title, reviews, price, rating, location } = singleApartment;
  return (
    <div className="lg:flex justify-between items-center pb-8">
      {/* Left side: Hotel Information */}
      <div className="flex flex-col">
        <h2 className=" text-2xl lg:text-5xl font-semibold mb-2">{title}</h2>
        <div className=" flex ">
          <div className="pr-5 lg:pr-16 border-r border-y-grayColor1/20">
            <h4 className=" text-base text-grayColor1 mb-1">Review</h4>
            <div className="flex gap-2 items-center text-sm text-yellow-500 mb-2 ">
              <Rating rating={rating} />
              <span className="text-gray-500">({reviews} reviews)</span>
            </div>
          </div>
          <div className="text-base text-headerColor pl-5 lg:pl-16">
            <h4 className=" text-base text-grayColor1 mb-1">Location</h4>
            <p className="text-base text-headerColor">{location}</p>
          </div>
        </div>
      </div>
      {/* Right side: Price */}
      <div className="flex mt-2 lg:mt-0 flex-col items-start lg:items-end text-right">
        <p className="text-base font-medium text-headerColor mb-0.5">
          Starting from
        </p>
        <div className=" flex items-end">
          <p className="text-[32px] font-semibold text-secondaryColor">
            {price}
          </p>
          <p className="text-sm text-grayColor1 mb-2">/per night</p>
        </div>
      </div>
    </div>
  );
};

export default ApartmentHeader;

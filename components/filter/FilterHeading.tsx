
function FilterHeading({onReset , title}:any) {
  return (
    <div>
       <div className="flex justify-between items-center">
        <h3 className="text-base  font-medium text-headerColor">{title}</h3>
        <div className=" flex gap-3 items-center">

        <button
          onClick={onReset}
          className="hover:text-white  transition cursor-pointer border text-blueColor  border-blueColor hover:bg-blueColor rounded-sm px-3 py-1 text-sm"
        >
          Reset 
        </button>
        {/* <div>
            <IoIosArrowUp size={25}/>
        </div> */}
        </div>
      </div>
    </div>
  )
}

export default FilterHeading

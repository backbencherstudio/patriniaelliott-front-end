
function FilterHeading({onReset , title}:any) {
  const handleResetClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent button (AccordionTrigger)
    onReset();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      onReset();
    }
  };

  return (
    <div>
       <div className="flex justify-between items-center">
        <h3 className="text-base  font-medium text-headerColor">{title}</h3>
        <div className=" flex gap-3 items-center">

        <div
          onClick={handleResetClick}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          className="hover:text-white  transition cursor-pointer border text-blueColor  border-blueColor hover:bg-blueColor rounded-sm px-3 py-1 text-sm"
        >
          Reset 
        </div>
        {/* <div>
            <IoIosArrowUp size={25}/>
        </div> */}
        </div>
      </div>
    </div>
  )
}

export default FilterHeading

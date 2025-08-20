function PaginationPage({ totalPages, setCurrentPage, currentPage }: any) {
  const getPagination = () => {
    let pages: (number | string)[] = [];
    if (totalPages <= 5) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, "...", totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        // Single ellipsis in the middle
        pages = [1, "...", currentPage - 1, currentPage, currentPage + 1, totalPages];
      }
    }
    return pages;
  };

  const pages = getPagination();

  return (
    <div className="lg:mt-10 my-8 lg:mb-20 ">
      <div className=" flex justify-center lg:justify-end ">
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="inline-flex justify-center items-center  gap-2">
            <div className="h-8 px-1 py-2.5 bg-white rounded-xs inline-flex flex-col justify-center items-center gap-2.5">

              <button
                onClick={() => setCurrentPage((prev: number) => Math.max(prev - 1, 1))}
                className={`justify-start ${currentPage === 1 ? 'text-grayColor1 bg-grayColor1/20' : 'text-[#1d1f2c]'} border  border-descriptionColor/20 text-descriptionColor cursor-pointer disabled:cursor-not-allowed  px-[4px] lg:px-4 py-1 lg:py-2 rounded-md flex items-center text-xs md:text-sm lg:text-base gap-2`}
                disabled={currentPage === 1}
              >
                &lt;&lt; Previous
              </button>

            </div>

            {pages.map((p, idx) => {
              if (p === '...') {
                return (
                  <div key={`ellipsis-${idx}`} className="lg:w-8 lg:h-8 w-5 h-5 p-1.5 lg:p-2.5 bg-white rounded-xs inline-flex flex-col justify-center items-center gap-2.5">
                    <div className="justify-center text-[#1d1f2c] text-xs md:text-sm lg:text-base font-medium leading-relaxed tracking-tight">...</div>
                  </div>
                );
              }

              const pageNum = p as number;
              return (
                <div
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`lg:w-8 lg:h-8 w-5 h-5 p-1.5 lg:p-2.5 ${currentPage === pageNum
                    ? 'bg-secondaryColor'
                    : 'bg-white outline-1 outline-offset-[-1px] outline-[#f1f1f1]'
                    } rounded-xs inline-flex flex-col justify-center items-center gap-2.5 cursor-pointer`}
                >
                  <div className={`justify-start ${currentPage === pageNum
                    ? 'text-white'
                    : 'text-[#1d1f2c]'
                    } text-xs md:text-sm lg:text-base font-medium leading-relaxed tracking-tight`}>
                    {pageNum}
                  </div>
                </div>
              );
            })}

            <div className="h-8 px-1 py-2.5 bg-white rounded-xs inline-flex flex-col justify-center items-center gap-2.5">
              <button
                onClick={() => setCurrentPage((prev: number) => Math.min(prev + 1, totalPages))}
                className={`justify-start ${currentPage === totalPages ? 'text-grayColor1 bg-grayColor1/20' : 'text-[#1d1f2c]'} border  border-descriptionColor/20 text-descriptionColor cursor-pointer disabled:cursor-not-allowed  px-[4px] lg:px-4 py-1 lg:py-2 rounded-md flex items-center text-xs md:text-sm lg:text-base gap-2`}
                disabled={currentPage === totalPages}
              >
                Next &gt;&gt;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>

  )
}

export default PaginationPage
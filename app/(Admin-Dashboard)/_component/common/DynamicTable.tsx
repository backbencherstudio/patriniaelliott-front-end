"use client";

import { Loader } from "lucide-react";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";


interface ColumnConfig {
  label: React.ReactNode;
  accessor: string;
  width?: string;
  formatter?: (value: any, row: any, index: number) => React.ReactNode;
}

interface DynamicTableProps {
  columns: ColumnConfig[];
  data: any[];
  loading:boolean;
  currentPage: number;
  itemsPerPage: number;
  totalPages:number;
  totalItems?:any;
  onPageChange: (page: number) => void;
  onView?: (row: any) => void;
  onDelete?: (id: any) => void;
  noDataMessage?: string;
    editLoading?:boolean;
  className?: string;
}

export default function DynamicTableWithPagination({
  columns,
  data,
  currentPage,
  loading,
  itemsPerPage,
  totalPages,
  totalItems,
  onPageChange,
  onView,
  onDelete,
  noDataMessage = "No data found.",
  editLoading,
  className,
}: DynamicTableProps) {
  

  const getPagination = () => {
    let pages: (number | string)[] = [];
    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      // Show smart pagination with ellipsis
      if (currentPage <= 4) {
        // Show first 5 pages, then ellipsis, then last page
        pages = [1, 2, 3, 4, 5, "...", totalPages];
      } else if (currentPage >= totalPages - 3) {
        // Show first page, ellipsis, then last 5 pages
        pages = [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        // Show first page, ellipsis, current-1, current, current+1, ellipsis, last page
        pages = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
      }
    }
    return pages;
  };

  return (
    <div>
    
      <div className={`overflow-x-auto ${className || ''}`}>
        <table className="w-full text-left table-auto">
          <colgroup>
            {columns.map((col, index) => (
              <col key={index} style={{ width: col.width ? col.width : "auto" }} />
            ))}
            {(onView || onDelete) && (
              <col style={{ width: "120px" }} />
            )}
          </colgroup>
          <thead className="bg-neutral-50">
            <tr>
              {columns.map((col, index) => (
                <th 
                  key={index} 
                  className="px-3 py-3 text-sm font-medium text-[#4a4c56] whitespace-nowrap"
                  style={{ width: col.width ? col.width : "auto" }}
                >
                  {col.label}
                </th>
              ))}
              {(onView || onDelete) && (
                <th className="px-3 py-3 text-sm font-medium text-[#4a4c56]">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-3 py-10 text-center text-[#777980] text-sm">
                <span className="flex items-center justify-center  gap-2"><Loader size={17} className="text-primaryColor"/> Loading...</span> 
                </td>
              </tr>
            ) : data && data.length > 0 ? (
              data.map((row, i) => (
                <tr key={i} className="border-t">
                  {columns.map((col, idx) => (
                    <td 
                      key={idx} 
                      className="px-2 py-3 text-sm text-[#777980] whitespace-nowrap"
                      style={{ width: col.width ? col.width : "auto" }}
                    >
                      {col.formatter ? col.formatter(row[col.accessor], row, i) : row[col.accessor]}
                    </td>
                  ))}
                  {(onView || onDelete) && (
                    <td className="px-2 py-3 flex gap-4">
                      {onView && (
                        <button
                          className="text-sm underline text-nowrap text-[#777980] hover:text-[#0068ef] cursor-pointer"
                          aria-label="View details"
                          onClick={() => onView(row)}
                        >
                          View details
                        </button>
                      )}
                      {onDelete && (
                        
                        <button aria-label="Delete" disabled={editLoading} className="hover:text-redColor text-[#777980] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"  onClick={() => onDelete(row.id)}>
                          {editLoading ? <Loader size={18} className="text-primaryColor" /> : <RiDeleteBin6Line
                             size={18} className="" />}
                          </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-10 text-center text-[#777980] text-sm">
                  {noDataMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mt-6 gap-4">
          {/* Page Info */}
          <div className="text-sm text-[#777980] order-2 lg:order-1">
            {(() => {
              const total = typeof totalItems === 'number' ? totalItems : data.length;
              if (!total || total === 0) return <>No entries to display</>;
              const from = (currentPage - 1) * itemsPerPage + 1;
              const to = Math.min(currentPage * itemsPerPage);
              return <>Showing {from} to {to} of {totalItems || 0} entries</>;
            })()}
          </div>
          
          {/* Pagination Controls */}
          <div className="flex items-center gap-1 lg:gap-2 order-1 lg:order-2 flex-wrap">
            {/* First Page Button */}
            <button
              aria-label="First page"
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1 || loading}
              className="px-3 py-2 border border-[#E2E8F0] rounded-lg cursor-pointer hover:bg-[#F8FAFC] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="First page"
            >
              <span className="text-sm font-medium">««</span>
            </button>
            
            {/* Previous Button */}
            <button
              aria-label="Previous"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1 || loading}
              className="px-4 py-2 border border-[#E2E8F0] rounded-lg cursor-pointer hover:bg-[#F8FAFC] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <span className="text-lg">‹</span>
              <span className="text-sm font-medium">Previous</span>
            </button>
            
            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {getPagination().map((page, i) => (
                <button
                  key={i}
                  aria-label="Page number"
                  onClick={() => typeof page === "number" && onPageChange(page)}
                  disabled={page === "..." || loading}
                  className={`px-2 lg:px-3 py-2 rounded-lg cursor-pointer text-sm font-medium transition-colors ${
                    page === currentPage 
                      ? "bg-[#0068ef] text-white" 
                      : page === "..." 
                        ? "text-[#777980] cursor-default" 
                        : "text-[#4a4c56] hover:bg-[#F8FAFC] border border-[#E2E8F0]"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            {/* Next Button */}
            <button
              aria-label="Next"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages || loading}
              className="px-4 py-2 border border-[#E2E8F0] rounded-lg cursor-pointer hover:bg-[#F8FAFC] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <span className="text-sm font-medium">Next</span>
              <span className="text-lg">›</span>
            </button>
            
            {/* Last Page Button */}
            <button
              aria-label="Last page"
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages || loading}
              className="px-3 py-2 border border-[#E2E8F0] rounded-lg cursor-pointer hover:bg-[#F8FAFC] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Last page"
            >
              <span className="text-sm font-medium">»»</span>
            </button>
          </div>
        </div>
      )}

      <div>
        
      </div>
    </div>
  );
}

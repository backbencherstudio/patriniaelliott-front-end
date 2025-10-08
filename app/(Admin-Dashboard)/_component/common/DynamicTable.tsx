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
  onPageChange,
  onView,
  onDelete,
  noDataMessage = "No data found.",
  editLoading,
  className,
}: DynamicTableProps) {
  

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
                        <span
                          className="text-sm underline text-nowrap text-[#777980] hover:text-[#0068ef] cursor-pointer"
                          onClick={() => onView(row)}
                        >
                          View details
                        </span>
                      )}
                      {onDelete && (
                        
                        <button disabled={editLoading} className="hover:text-redColor text-[#777980] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"  onClick={() => onDelete(row.id)}>
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
        <div className="flex justify-end mt-6 gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border cursor-pointer rounded disabled:opacity-40"
          >
            ❮
          </button>
          {getPagination().map((page, i) => (
            <button
              key={i}
              onClick={() => typeof page === "number" && onPageChange(page)}
              disabled={page === "..."}
              className={`px-2 py-1 rounded cursor-pointer text-sm ${
                page === currentPage ? " text-blackColor font-medium" : " text-grayColor1"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border cursor-pointer rounded disabled:opacity-40"
          >
            ❯
          </button>
        </div>
      )}

      <div>
        
      </div>
    </div>
  );
}

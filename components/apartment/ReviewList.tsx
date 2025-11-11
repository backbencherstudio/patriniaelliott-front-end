"use client";
import proImg from "@/public/profile.png";
import dayjs from "dayjs";
import Image from "next/image";
import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import PaginationPage from "../reusable/PaginationPage";
import Rating from "../reusable/Rating";

function ReviewList({ reviewData, currentPage, setCurrentPage, totalPages, onDelete }: any) {
  const [tab, setTab] = useState("all");

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-4">
          {/* Tab buttons */}
          <button
            className={`${tab === "all" ? "border border-secondaryColor text-secondaryColor" : "border border-grayColor1 text-grayColor1"
              } px-4 py-2 rounded-md cursor-pointer font-medium`}
            onClick={() => setTab("all")}
          >
            All Review
          </button>
          <button
            className={`${tab === "recent" ? "border border-secondaryColor text-secondaryColor" : "border border-grayColor1 text-grayColor1"
              } px-4 py-2 rounded-md cursor-pointer font-medium`}
            onClick={() => setTab("recent")}
          >
            Recent ones
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Review Lists</h2>

      {/* Reviews */}
      {reviewData.map((review) => (
        <div key={review.id} className="bg-white py-4  mb-4 border-b border-grayColor1/20">
          <div className="flex items-center ">
            <Rating rating={review?.rating_value} />
          </div>
          <p className="text-descriptionColor text-base lg:text-lg my-3">{review.comment}</p>
          <p className="text-grayColor1/80 text-base">{dayjs(review.created_at).format("MMMM D, YYYY hh:mm A")}</p>
          <div className="flex justify-between items-end text-sm text-gray-500">
            <div>
              <div className="flex items-center gap-3 mt-5">
                <Image src={review.user?.avatar ? review?.user?.avatar : proImg} alt="rating" width={36} height={36} className=" rounded-full overflow-hidden" />
                <h4 className="text-base lg:text-xl font-medium text-headerColor">{review?.user?.first_name ? review?.user?.first_name : review?.user?.email}</h4>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* <button
                className={`
                 border text-base border-grayColor1/20 text-[#8F6F65] px-3 py-1 rounded-sm flex items-center space-x-1`}
              >
                <span>{review.likes % 2 === 0 ? <BiSolidLike /> : <BiLike />}</span>
              
                <span className="text-descriptionColor">{review.likes}</span>
              </button> */}
              <button
                onClick={() => onDelete(review.id)}
                className={`
                 border text-base cursor-pointer border-redColor/20 text-redColor px-3 py-1 rounded-sm flex items-center space-x-1`}

              >
                <span><RiDeleteBin6Line /></span>

              </button>

            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <PaginationPage
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
};

export default React.memo(ReviewList);

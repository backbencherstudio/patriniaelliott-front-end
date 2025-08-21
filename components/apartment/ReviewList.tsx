"use client";
import p1 from "@/public/icon/r1.png";
import p2 from "@/public/icon/r2.png";
import Image from "next/image";
import { useState } from "react";
import { AiFillDislike, AiOutlineDislike } from "react-icons/ai";
import { BiLike, BiSolidLike } from "react-icons/bi";
import PaginationPage from "../reusable/PaginationPage";
import Rating from "../reusable/Rating";
const reviewsData = [
  {
    id: 1,
    rating: 5,
    text: "Impressive apartment: Perfectly located apartment with a cozy vibe and all the amenities I needed. The host was super responsive and made the stay seamless!",
    date: "July 2, 2020 03:29 PM",
    author: "Darrell Steward",
    likes: 128,
    dislikes: 3,
    image: p1, // Image URL for the reviewer
  },
  {
    id: 2,
    rating: 4,
    text: "Clean, modern, and surprisingly quiet despite being in the city center. Highly recommend for a comfortable and convenient stay!",
    date: "July 2, 2020 03:29 PM",
    author: "Darrell Steward",
    likes: 128,
    dislikes: 2,
    image: p2, // Image URL for the reviewer
  },
  {
    id: 3,
    rating: 5,
    text: "Great experience! The apartment was wonderful and everything was close by.",
    date: "September 15, 2022 10:00 AM",
    author: "Alex Smith",
    likes: 200,
    dislikes: 0,
    image: p2, // Image URL for the reviewer
  },
  {
    id: 4,
    rating: 3,
    text: "The apartment was decent but could have been cleaner. The host was friendly though.",
    date: "October 5, 2022 11:30 AM",
    author: "Mia Zhang",
    likes: 45,
    dislikes: 5,
    image: p1, // Image URL for the reviewer
  },
  // Add more reviews here with image fields
];


const ReviewList = ({ reviewData }) => {
  const [tab, setTab] = useState("all"); // Track current tab: "all" or "recent"
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 2;

  const [reviews, setReviews] = useState(reviewsData); // Store reviews with dynamic like/dislike

  // Filter reviews based on the selected tab
  const filteredReviews =
    tab === "recent"
      ? reviews
          .slice()
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by most recent first
      : reviews;

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const currentReviews = filteredReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  // Handle Like/Dislike logic (click to increase/decrease)
  const handleLike = (id: number) => {
    const updatedReviews = reviews.map((review) =>
      review.id === id
        ? {
            ...review,
            likes: review.likes % 2 !== 0 ? review.likes + 1 : review.likes - 1,
          }
        : review
    );
    setReviews(updatedReviews);
  };

  const handleDislike = (id: number) => {
    const updatedReviews = reviews.map((review) =>
      review.id === id
        ? {
            ...review,
            dislikes: review.dislikes % 2 !== 0 ? review.dislikes + 1 : review.dislikes - 1,
          }
        : review
    );
    setReviews(updatedReviews);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-4">
          {/* Tab buttons */}
          <button
            className={`${
              tab === "all" ? "border border-secondaryColor text-secondaryColor" : "border border-grayColor1 text-grayColor1"
            } px-4 py-2 rounded-md cursor-pointer font-medium`}
            onClick={() => setTab("all")}
          >
            All Review
          </button>
          <button
            className={`${
              tab === "recent" ? "border border-secondaryColor text-secondaryColor" : "border border-grayColor1 text-grayColor1"
            } px-4 py-2 rounded-md cursor-pointer font-medium`}
            onClick={() => setTab("recent")}
          >
            Recent ones
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Review Lists</h2>

      {/* Reviews */}
      {currentReviews.map((review) => (
        <div key={review.id} className="bg-white py-4  mb-4 border-b border-grayColor1/20">
          <div className="flex items-center ">
            <Rating rating={review.rating} />
          </div>
          <p className="text-descriptionColor text-base lg:text-lg my-3">{review.text}</p>
          <p className="text-grayColor1/80 text-base">{review.date}</p>
          <div className="flex justify-between items-end text-sm text-gray-500">
            <div>
                
                <div className="flex items-center gap-3 mt-5">
                    <Image src={review.image} alt="rating" width={36} height={36} className=" rounded-full overflow-hidden"/>
                 <h4 className="text-base lg:text-xl font-medium text-headerColor">{review.author}</h4>
                </div>
            </div>

            
            <div className="flex items-center space-x-2">
             
              <button
                className={`
                 border text-base border-grayColor1/20 text-[#8F6F65] px-3 py-1 rounded-sm flex items-center space-x-1`}
                onClick={() => handleLike(review.id)}
              >
                <span>{review.likes % 2 === 0 ? <BiSolidLike />:<BiLike /> }</span>
                <span className="text-descriptionColor">{review.likes}</span>
              </button>
              <button
                className={`
                 border text-base border-grayColor1/20 text-[#8F6F65] px-3 py-1 rounded-sm flex items-center space-x-1`}
                onClick={() => handleDislike(review.id)}
              >
                <span>{review.dislikes % 2 === 0 ? <AiFillDislike />:<AiOutlineDislike />}</span>
                <span className="text-descriptionColor">{review.dislikes}</span>
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

export default ReviewList;

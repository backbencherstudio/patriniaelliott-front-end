"use client";

function BookingAction({ status, onView }: any) {
  const handleAccept = () => {
    console.log("accept");
  }
  const handleReject = () => {
    console.log("reject");
  }
  return (
    <div>
      {status?.status == "approved" || status?.status == "cancele" ? (
        <span
          className="text-xs underline text-[#777980] hover:text-[#0068ef] cursor-pointer"
          onClick={() => onView(status)}
        >
          View details
        </span>
      ) : (
        <div className="flex gap-1">
          <button onClick={handleAccept} className=" cursor-pointer py-1 px-[6px] bg-[#38c976]/10 rounded-[8px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
            >
              <path
                d="M15.0013 7.9987C15.0013 4.3168 12.0165 1.33203 8.33464 1.33203C4.65274 1.33203 1.66797 4.3168 1.66797 7.9987C1.66797 11.6806 4.65274 14.6654 8.33464 14.6654C12.0165 14.6654 15.0013 11.6806 15.0013 7.9987Z"
                stroke="#40C754"
                strokeWidth="1.5"
              />
              <path
                d="M5.66797 8.4987C5.66797 8.4987 6.73464 9.10703 7.26797 9.9987C7.26797 9.9987 8.86797 6.4987 11.0013 5.33203"
                stroke="#40C754"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className="bg-[#fe5050]/10 cursor-pointer py-1 px-[6px] rounded-[8px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
            >
              <path
                d="M10.3336 10L6.33398 6M6.33441 10L10.334 6"
                stroke="#FE5050"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.0013 7.9987C15.0013 4.3168 12.0165 1.33203 8.33464 1.33203C4.65274 1.33203 1.66797 4.3168 1.66797 7.9987C1.66797 11.6806 4.65274 14.6654 8.33464 14.6654C12.0165 14.6654 15.0013 11.6806 15.0013 7.9987Z"
                stroke="#FE5050"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </div>
      )}

     
    </div>
  );
}

export default BookingAction;

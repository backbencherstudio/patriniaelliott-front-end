"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FiMail } from "react-icons/fi";

export default function InviteTeamMembers() {
  const [emails, setEmails] = useState([""]);

  const handleAddField = () => {
    setEmails([...emails, ""]);
  };

  const handleEmailChange = (index: number, value: string) => {
    const updated = [...emails];
    updated[index] = value;
    setEmails(updated);
  };

  const handleSendInvites = () => {
    console.log("Inviting:", emails);
    // Add your API logic here
  };

  return (
    <div className="bg-white rounded-2xl  space-y-4 ">
      <div>
        <h3 className="text-lg md:text-xl lg:text-2xl font-medium text-headerColor">
          Manage user accounts
        </h3>
        <p className="text-base md:text-lg text-descriptionColor mt-1">
          Invite team members
        </p>
      </div>

      {emails.map((email, index) => (
        <div key={index} className="flex items-center h-full space-x-3 mt-2">
          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FiMail />
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(index, e.target.value)}
              placeholder="email@example.com"
              className="w-full pl-10 pr-4 py-2 lg:py-3 rounded-md text-sm md:text-base  border border-gray-300 focus:outline-none focus:ring focus:border-blue-400 text-[#777980]"
            />
          </div>

          {index === 0 && (
            <button
              aria-label="Send invites"
              onClick={handleSendInvites}
              type="button"
              className="bg-blue-600 whitespace-nowrap hover:bg-blue-700 text-white text-xs md:text-sm lg:text-base font-medium px-2 py-2 lg:py-3.5 rounded-md cursor-pointer flex items-center space-x-2"
            >
              <FiMail size={16} />
              <span>Send invites</span>
            </button>
          )}
        </div>
      ))}

      <button
        aria-label="Add another"
        onClick={handleAddField}
        type="button"
        className="text-secondaryColor/90 cursor-pointer text-base mt-2 flex items-center space-x-2"
      >
        <span>
          <FaPlus />
        </span>
        <span>Add another</span>
      </button>
    </div>
  );
}

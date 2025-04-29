// ProfileCard.tsx


const ProfileCard = () => {
  return (
    
    <div className="bg-secondaryColor/5 shadow-md rounded-lg p-6 ">
      <div className="flex items-center space-x-4">
        <img
          src="https://via.placeholder.com/80"
          alt="Profile"
          className="w-20 h-20 rounded-full"
        />
        <div className="flex-1">
          <h2 className="text-xl font-semibold">Jacob Jones</h2>
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-2">⭐ 4.9</span>
            <span className="text-gray-400">• 256 reviews</span>
          </div>
          <p className="text-sm text-gray-400 mt-2">Member since Mar 15, 2017</p>
        </div>
      </div>
      <div className="mt-4 space-x-4 text-sm text-gray-500">
        <span>
          <strong className="text-gray-700">3 Properties</strong>
        </span>
        <span>
          <strong className="text-gray-700">Served Guests: 248</strong>
        </span>
      </div>
      <button className="w-full bg-blue-500 text-white mt-6 py-2 rounded-lg">
        Contact Host
      </button>
      <div className="text-sm text-gray-500 mt-4">
        <p>
          Jacob Jones, with 12+ years in hospitality, owns Eclipse Haven
          apartments. He offers modern, charming stays and partners with local
          vendors for tours and car rentals, ensuring a memorable guest
          experience.
        </p>
      </div>
      <button className="text-xs text-red-500 mt-4 w-full text-center">
        Report this host
      </button>
    </div>
  );
};

export default ProfileCard;

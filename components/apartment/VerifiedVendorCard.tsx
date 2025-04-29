// VerifiedVendorCard.tsx


const VerifiedVendorCard = () => {
  return (
    <div className="bg-white border border-yellow-200 rounded-lg p-6  mt-5">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-blue-100 text-blue-500 p-2 rounded-full">
          <i className="fas fa-check-circle"></i> {/* You can use an icon library like FontAwesome */}
        </div>
        <h2 className="text-lg font-semibold">Verified vendor information</h2>
      </div>
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <div className="bg-yellow-100 text-yellow-500 p-1 rounded-full text-xs">
            <i className="fas fa-id-card"></i> {/* Icon */}
          </div>
          <span className="text-sm font-medium">Identity</span>
          <span className="ml-auto text-blue-500">✔</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="bg-blue-100 text-blue-500 p-1 rounded-full text-xs">
            <i className="fas fa-envelope"></i> {/* Icon */}
          </div>
          <span className="text-sm font-medium">Email Address</span>
          <span className="ml-auto text-blue-500">✔</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="bg-gray-100 text-gray-500 p-1 rounded-full text-xs">
            <i className="fas fa-phone-alt"></i> {/* Icon */}
          </div>
          <span className="text-sm font-medium">Phone Number</span>
          <span className="ml-auto text-gray-500">✘</span>
        </div>
      </div>
    </div>
  );
};

export default VerifiedVendorCard;

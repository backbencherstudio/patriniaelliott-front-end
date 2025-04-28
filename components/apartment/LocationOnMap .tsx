
const LocationOnMap = () => {
  return (
    <div className="font-sans">
      <h2 className="text-2xl lg:text-[32px] font-medium mb-4">Location on Map</h2>
      <div className="relative w-full h-72 rounded-lg overflow-hidden shadow-lg">
        {/* Map Embedding (Example using Google Maps iframe) */}
        <iframe
          className="w-full h-full border-0"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14166.868508381924!2d-81.5554252389289!3d28.371433879275472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e77fa6edfe82b7%3A0x93862dca4f9dbbd6!2sDisney%27s%20Animal%20Kingdom%20Theme%20Park!5e0!3m2!1sen!2sus!4v1615483425642!5m2!1sen!2sus"
        
          loading="lazy"
        ></iframe>
        <a
          href="https://www.google.com/maps/place/Disney's+Animal+Kingdom+Theme+Park"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 bg-blue-600 text-white py-2 px-4 rounded-lg text-lg shadow-lg hover:bg-blue-700 transition-all"
        >
          Show on map
        </a>
      </div>
    </div>
  );
};

export default LocationOnMap;

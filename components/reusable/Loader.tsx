import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-full py-10">
      <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default Loader;

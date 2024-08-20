import React, { useState } from "react";
import UploadFile from "./UploadFile";

const Hero = () => {
  const [showUploader, setShowUploader] = useState(false);

  const handleClick = () => {
    setShowUploader(true);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="container relative">
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[4rem] md:mb-20 lg:mb:[6rem]">
          <h1 className="h1 mb-6">Fix your f*cking resume!</h1>
          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
            Are you ready to shred your resume? Because after clicking on
            "Get Roast" button below, there's no going back.
          </p>
          <button
            onClick={handleClick}
            className="rounded-xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#FD1D1D]/50"
          >
            Get Roasted!
          </button>
          {showUploader && <UploadFile />}
        </div>
      </div>
    </div>
  );
};

export default Hero;

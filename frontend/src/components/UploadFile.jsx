import React, { useState, useRef } from "react";
import axios from "axios";

const UploadFile = () => {
  const [files, setFiles] = useState(null);
  const [roasted, setRoasted] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const handleFileSelect = () => {
    inputRef.current.click();
  };

  const handleFilesChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("Files", file);
    });

    try {
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL || "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);

      if (response.data && response.data.roasted) {
        setRoasted(response.data.roasted);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetUpload = () => {
    setFiles(null);
    setRoasted(null);
  };

  return (
    <div className="relative z-10 p-6 bg-dark shadow-md rounded-xl">
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <div className="custom-loader mb-4"></div>
          <p className="text-n-2">Uploading...</p>
        </div>
      ) : roasted ? (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Your Royal Roast Awaits!</h2>
          <p className="mb-6">{roasted}</p>
          <button
            onClick={resetUpload}
            className="rounded-xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#FD1D1D]/50"
          >
            Clear Roast
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Resume Roaster</h2>
          <p className="mb-6 text-n-2">
            Prepare to get roasted! Upload your resume below.
          </p>
          <input
            type="file"
            multiple
            hidden
            accept="application/pdf, image/png, image/jpeg"
            ref={inputRef}
            onChange={handleFilesChange}
          />
          <button
            onClick={handleFileSelect}
            className="rounded-xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#FD1D1D]/50"
          >
            Select Files
          </button>
          {files && (
            <div className="mt-6 flex justify-center space-x-4">
              <button
                onClick={resetUpload}
                className="rounded-xl bg-gray-300 px-4 py-2 text-base font-medium text-n-6 transition duration-200 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="rounded-xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] px-4 py-2 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#FD1D1D]/50"
              >
                Upload
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadFile;

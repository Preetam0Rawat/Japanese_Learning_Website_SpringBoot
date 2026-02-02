import { useState } from "react";
import { reportBug } from "../api";
import reportBG from '../images/reportBG.jpg'
import { FcUndo } from "react-icons/fc";
import { Link } from "react-router-dom";


const ReportBug = () => {
  const [bugText, setBugText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleReport = async () => {
    if (!bugText.trim()) {
      alert("Please describe the bug before submitting.");
      return;
    }

    try {
      const response = await reportBug({ bug: bugText });
      console.log(response.data)
      setSubmitted(true);
      setBugText("");
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.log("Error in reporting bug")
    }

  };

  return (
    <div className="flex justify-center items-center h-dvh  bg-cover bg-center" style={{ background: `url(${reportBG})` }}>
     
     
      <div className="absolute left-0 top-0 hidden sm:block">
            <Link to="/home">
              <FcUndo size={100} className=" transition-transform duration-200 hover:scale-120" />
            </Link>
          </div>

      <div className=" w-[80vw] h-[70vh]   lg:w-[50vw] sm:h-[65vh] p-6 rounded-2xl shadow-lg backdrop-blur-2xl">

        <h2 className="text-3xl font-semibold text-orange-400 mb-4 text-center">
          REPORT BUG
        </h2>

        <textarea
          value={bugText}
          onChange={(e) => setBugText(e.target.value)}
          placeholder="Describe the issue you encountered..."
          className="w-full h-3/5 p-3 border border-orange-500  rounded-lg  focus:outline-none resize-none text-gray-700 text-2xl"
        />

        <div className="flex justify-end mt-4">
          <button
            onClick={handleReport}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-300 text-white font-medium rounded-lg transition-all duration-200 cursor-pointer"
          >
            Submit
          </button>
        </div>

        {submitted && (
          <div className="mt-4 text-center text-green-600 font-semibold animate-pulse text-2xl">
            ✅ Thank you! Your report has been submitted.
          </div>
        )}

      </div>
    </div>
  );
};

export default ReportBug;

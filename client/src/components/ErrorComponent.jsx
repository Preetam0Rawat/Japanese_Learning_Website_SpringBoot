import { useNavigate } from "react-router-dom";

export default function ErrorComponent() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center   bg-linear-to-b from-lime-200  to-sky-200
 px-6">

      {/* 404 number */}
      <h1 className="text-6xl md:text-9xl font-bold text-yellow-400 mb-4">
        404
      </h1>

      {/* message */}
      <h2 className="text-xl md:text-3xl font-semibold text-gray-800 mb-2 text-center">
        Page Not Found
      </h2>

      <p className="text-gray-600 md:text-xl mb-8 text-center max-w-md">
        The resource you’re looking for doesn’t exist or something went wrong while loading.
      </p>

      {/* button */}
      <button
        onClick={() => navigate("/home")}
        className="bg-white text-black cursor-pointer font-medium px-6 py-3 rounded-xl shadow-md transition"
      >
        Go Home
      </button>
    </div>
  );
}

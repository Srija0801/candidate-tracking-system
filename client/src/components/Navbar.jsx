import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
            C
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              Candidate Dashboard
            </h1>

            <p className="text-gray-500">
              Recruitment Management System
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            className={`px-5 py-3 rounded-xl font-semibold ${
              location.pathname === "/"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-700"
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/candidates"
            className={`px-5 py-3 rounded-xl font-semibold ${
              location.pathname ===
              "/candidates"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-700"
            }`}
          >
            Candidates
          </Link>

          <button
            onClick={() => {
              localStorage.removeItem(
                "editingCandidate"
              );

              window.location.href =
                "/add-candidate";
            }}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            + Add Candidate
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");

              window.location.href = "/login";
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
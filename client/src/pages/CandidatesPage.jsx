import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import {
  getCandidates,
  deleteCandidate,
} from "../services/candidateService";

export default function CandidatesPage() {
  const navigate = useNavigate();

  const [candidates, setCandidates] =
    useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  
  const fetchCandidates = async () => {
    try {
      const response =
        await getCandidates();

      setCandidates(response.data.data);
    } catch (error) {
      console.error(
        "Error fetching candidates:",
        error
      );

      alert(
        "Failed to fetch candidates"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  
  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this candidate?"
      );

    if (!confirmDelete) return;

    try {
      await deleteCandidate(id);

      alert(
        "Candidate deleted successfully"
      );

      fetchCandidates();
    } catch (error) {
      console.error(
        "Delete Candidate Error:",
        error
      );

      alert(
        "Failed to delete candidate"
      );
    }
  };


  const handleEdit = (candidate) => {
    localStorage.setItem(
      "editingCandidate",
      JSON.stringify(candidate)
    );

    navigate("/add-candidate");
  };

 
  const getStatusColor = (status) => {
    switch (status) {
      case "Applied":
        return "bg-gray-100 text-gray-700";

      case "Interview":
        return "bg-blue-100 text-blue-700";

      case "Screening":
        return "bg-yellow-100 text-yellow-700";

      case "Hired":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  
  const filteredCandidates =
    candidates.filter((candidate) => {
      return (
        candidate.full_name
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        candidate.email
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
      );
    });

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 p-6">
        <div className="max-w-6xl mx-auto">

          
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">

            <div className="flex justify-between items-center mb-6">

              <div>
                <h1 className="text-5xl font-bold text-slate-800 mb-3">
                  Candidates
                </h1>

                <p className="text-slate-500 text-lg">
                  View and manage all candidate applications.
                </p>
              </div>

            
          
            </div>

           
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
              className="w-full px-5 py-4 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

       
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

         
            <div className="grid grid-cols-4 gap-4 px-8 py-5 bg-slate-50 border-b font-semibold text-slate-600">
              <div>Candidate</div>
              <div>
                Current Company
              </div>
              <div>Status</div>
              <div className="text-right">
                Actions
              </div>
            </div>

           
            {loading ? (
              <div className="p-10 text-center text-slate-500">
                Loading...
              </div>
            ) : filteredCandidates.length >
              0 ? (
              filteredCandidates.map(
                (candidate) => (
                  <div
                    key={candidate.id}
                    className="grid grid-cols-4 gap-4 px-8 py-6 border-b last:border-b-0 hover:bg-slate-50 transition"
                  >

                    
                    <div>
                      <h3 className="font-bold text-slate-800 text-xl">
                        {
                          candidate.full_name
                        }
                      </h3>

                      <p className="text-slate-500">
                        {
                          candidate.email
                        }
                      </p>
                    </div>

                   
                    <div className="flex items-center text-slate-700 font-medium">
                      {candidate.current_company ||
                        "No Company"}
                    </div>

                   
                    <div className="flex items-center">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                          candidate.interview_status
                        )}`}
                      >
                        {
                          candidate.interview_status
                        }
                      </span>
                    </div>

                   
                    <div className="flex justify-end gap-3">

                    
                      <button
                        onClick={() =>
                          handleEdit(
                            candidate
                          )
                        }
                        className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-xl font-medium hover:bg-yellow-200 transition"
                      >
                        Edit
                      </button>

                     
                      <button
                        onClick={() =>
                          handleDelete(
                            candidate.id
                          )
                        }
                        className="px-4 py-2 bg-red-100 text-red-700 rounded-xl font-medium hover:bg-red-200 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )
              )
            ) : (
              <div className="p-12 text-center text-slate-500 text-lg">
                No candidates found.
              </div>
            )}
          </div>

        
          <p className="text-center text-slate-500 mt-6">
            Showing {
              filteredCandidates.length
            }{" "}
            candidates
          </p>
        </div>
      </div>
    </>
  );
}
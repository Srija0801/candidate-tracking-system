import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  getDashboardCandidates,
} from "../services/dashboardService";

export default function DashboardPage() {
  const [candidates, setCandidates] =
    useState([]);


  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response =
        await getDashboardCandidates();

      setCandidates(response.data.data);
    } catch (error) {
      console.error(
        "Error fetching dashboard data:",
        error
      );
    }
  };

  const totalCandidates =
    candidates.length;

  const appliedCandidates =
    candidates.filter(
      (c) =>
        c.interview_status ===
        "Applied"
    ).length;

  const interviewCandidates =
    candidates.filter(
      (c) =>
        c.interview_status ===
        "Interview"
    ).length;

  const hiredCandidates =
    candidates.filter(
      (c) =>
        c.interview_status ===
        "Hired"
    ).length;


  const recentCandidates = [
    ...candidates,
  ].slice(0, 5);

 
  const skillsMap = {};

  candidates.forEach((candidate) => {
    if (candidate.skills) {
      const skillsArray =
        typeof candidate.skills ===
        "string"
          ? candidate.skills.split(",")
          : candidate.skills;

      skillsArray.forEach((skill) => {
        const trimmedSkill =
          skill.trim();

        if (trimmedSkill) {
          skillsMap[trimmedSkill] =
            (skillsMap[
              trimmedSkill
            ] || 0) + 1;
        }
      });
    }
  });

  const topSkills = Object.entries(
    skillsMap
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

     
      <Navbar />

    
      <main className="max-w-7xl mx-auto px-6 py-10">

     
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back 👋
          </h2>

          <p className="text-gray-500">
            Manage candidates,
            track applications,
            and monitor hiring
            progress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

          
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <p className="text-gray-500 text-sm">
              Total Candidates
            </p>

            <h3 className="text-3xl font-bold text-gray-800 mt-2">
              {totalCandidates}
            </h3>
          </div>

        
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">
            <p className="text-gray-500 text-sm">
              Applied
            </p>

            <h3 className="text-3xl font-bold text-gray-800 mt-2">
              {appliedCandidates}
            </h3>
          </div>

         
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-indigo-500">
            <p className="text-gray-500 text-sm">
              Interviews
            </p>

            <h3 className="text-3xl font-bold text-gray-800 mt-2">
              {interviewCandidates}
            </h3>
          </div>

        
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
            <p className="text-gray-500 text-sm">
              Hired
            </p>

            <h3 className="text-3xl font-bold text-gray-800 mt-2">
              {hiredCandidates}
            </h3>
          </div>
        </div>

       
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

         
          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="flex justify-between items-center mb-6">

              <h3 className="text-2xl font-bold text-gray-800">
                Recently Added Candidates
              </h3>

              <Link
                to="/candidates"
                className="text-indigo-600 font-medium hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="space-y-4">

              {recentCandidates.length >
              0 ? (
                recentCandidates.map(
                  (candidate) => (
                    <div
                      key={
                        candidate.id
                      }
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl"
                    >
                      <div>
                        <p className="font-semibold text-gray-800">
                          {
                            candidate.full_name
                          }
                        </p>

                        <p className="text-sm text-gray-500">
                          {
                            candidate.current_company
                          }
                        </p>
                      </div>

                      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                        {
                          candidate.interview_status
                        }
                      </span>
                    </div>
                  )
                )
              ) : (
                <p className="text-gray-500">
                  No candidates found.
                </p>
              )}
            </div>
          </div>

          
          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Top Skills Distribution
            </h3>

            <div className="space-y-4">

              {topSkills.length >
              0 ? (
                topSkills.map(
                  ([skill, count]) => (
                    <div
                      key={skill}
                    >
                      <div className="flex justify-between mb-2">

                        <span className="font-medium text-gray-700">
                          {skill}
                        </span>

                        <span className="text-gray-500">
                          {count}
                        </span>
                      </div>

                      <div className="w-full bg-slate-200 rounded-full h-3">

                        <div
                          className="bg-indigo-500 h-3 rounded-full"
                          style={{
                            width: `${count * 20}%`,
                          }}
                        />
                      </div>
                    </div>
                  )
                )
              ) : (
                <p className="text-gray-500">
                  No skills data available.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import CandidateFormFields from "../components/CandidateFormFields"

import CandidateNotes from "../components/CandidateNotes";

import CandidateButtons from "../components/CandidateButtons";

import {
  createCandidate,
  updateCandidate,
} from "../services/candidateService";

export default function AddCandidatePage() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      id: null,

      full_name: "",

      email: "",

      phone_number: "",

      years_of_experience: "",

      skills: "",

      current_company: "",

      expected_salary: "",

      notice_period: "",

      interview_status: "Applied",

      resume_link: "",

      notes: "",
    });

 
  useEffect(() => {

    const editingCandidate =
      localStorage.getItem(
        "editingCandidate"
      );

    if (editingCandidate) {

      const candidate = JSON.parse(
        editingCandidate
      );

      setFormData({
        id: candidate.id || null,

        full_name:
          candidate.full_name || "",

        email:
          candidate.email || "",

        phone_number:
          candidate.phone_number ||
          "",

        years_of_experience:
          candidate.years_of_experience ||
          "",

        skills: Array.isArray(
          candidate.skills
        )
          ? candidate.skills.join(", ")
          : candidate.skills || "",

        current_company:
          candidate.current_company ||
          "",

        expected_salary:
          candidate.expected_salary ||
          "",

        notice_period:
          candidate.notice_period ||
          "",

        interview_status:
          candidate.interview_status ||
          "Applied",

        resume_link:
          candidate.resume_link ||
          "",

        notes:
          candidate.notes || "",
      });
    }
  }, []);

  // Handle input
  const handleChange = (e) => {

    const { name, value } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const payload = {
        ...formData,

        skills: formData.skills
          ? formData.skills
              .split(",")
              .map((skill) =>
                skill.trim()
              )
              .filter(Boolean)
          : [],
      };

      // Update
      if (formData.id) {

        await updateCandidate(
          formData.id,
          payload
        );

        alert(
          "Candidate updated successfully"
        );
      }

      // Create
      else {

        await createCandidate(
          payload
        );

        alert(
          "Candidate added successfully"
        );
      }

      localStorage.removeItem(
        "editingCandidate"
      );

      navigate("/candidates");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data
          ?.message ||
          "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <>
    

      <div className="min-h-screen bg-slate-100 p-6">

        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-8">

          <h1 className="text-4xl font-bold text-slate-800 mb-8">
            {formData.id
              ? "Edit Candidate"
              : "Add Candidate"}
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <CandidateFormFields
              formData={formData}
              handleChange={handleChange}
            />

            <CandidateNotes
              formData={formData}
              handleChange={handleChange}
            />

            <CandidateButtons
              loading={loading}
              formData={formData}
              navigate={navigate}
            />

          </form>
        </div>
      </div>
    </>
  );
}
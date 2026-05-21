export default function CandidateFormFields({
  formData,
  handleChange,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div>
        <label className="block font-semibold mb-2">
          Full Name
        </label>

        <input
          type="text"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3"
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3"
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">
          Phone Number
        </label>

        <input
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3"
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">
          Years of Experience
        </label>

        <input
          type="number"
          name="years_of_experience"
          value={formData.years_of_experience}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3"
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">
          Skills
        </label>

        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3"
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">
          Current Company
        </label>

        <input
          type="text"
          name="current_company"
          value={formData.current_company}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3"
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">
          Expected Salary
        </label>

        <input
          type="number"
          name="expected_salary"
          value={formData.expected_salary}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3"
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">
          Notice Period
        </label>

        <input
          type="number"
          name="notice_period"
          value={formData.notice_period}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3"
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">
          Interview Status
        </label>

        <select
          name="interview_status"
          value={formData.interview_status}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3"
        >
          <option value="Applied">Applied</option>
          <option value="Screening">Screening</option>
          <option value="Interview">Interview</option>
          <option value="Hired">Hired</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-2">
          Resume Link
        </label>

        <input
          type="url"
          name="resume_link"
          value={formData.resume_link}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3"
        />
      </div>
    </div>
  );
}
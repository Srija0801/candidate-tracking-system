export default function CandidateNotes({
  formData,
  handleChange,
}) {
  return (
    <div>
      <label className="block font-semibold mb-2">
        Notes
      </label>

      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        rows="4"
        className="w-full border rounded-xl px-4 py-3"
      />
    </div>
  );
}
export default function CandidateButtons({
  loading,
  formData,
  navigate,
}) {
  return (
    <div className="flex gap-4">

      <button
        type="submit"
        disabled={loading}
        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : formData.id
          ? "Update Candidate"
          : "Save Candidate"}
      </button>

      <button
        type="button"
        onClick={() => {
          localStorage.removeItem(
            "editingCandidate"
          );

          navigate("/candidates");
        }}
        className="flex-1 py-3 rounded-xl border border-slate-300 font-semibold"
      >
        Cancel
      </button>
    </div>
  );
}
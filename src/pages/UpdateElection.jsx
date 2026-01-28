import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCalendarAlt, FaPenNib, FaLock } from "react-icons/fa";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";

const UpdateElection = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const electionId = state?.electionId;

  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: null,
    endDate: null,
    candidates: [],
    votePassword: "",
  });

  const [originalForm, setOriginalForm] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!electionId) {
      toast.error("Election ID missing.");
      return navigate("/dashboard");
    }

    const fetchElection = async () => {
      try {
        const res = await axios.get(`/api/v2/elections/id/${electionId}`, {
          withCredentials: true,
        });
        const election = res.data.election;
        const nextForm = {
          title: election.title || "",
          description: election.description || "",
          startDate: election.startDate ? new Date(election.startDate) : null,
          endDate: election.endDate ? new Date(election.endDate) : null,
          candidates: election.candidates?.map((c) => c._id) || [],
          votePassword: "",
        };
        setForm(nextForm);
        setOriginalForm(nextForm);
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Failed to fetch election details.");
      } finally {
        setLoading(false);
      }
    };

    fetchElection();
  }, [electionId, navigate]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isFormChanged = JSON.stringify({ ...form, votePassword: "" }) !== JSON.stringify({ ...originalForm, votePassword: "" }) || Boolean(form.votePassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {};
      if (form.title) payload.title = form.title;
      if (form.description) payload.description = form.description;
      if (form.startDate) payload.startDate = form.startDate;
      if (form.endDate) payload.endDate = form.endDate;
      if (form.candidates.length) payload.candidates = form.candidates;
      if (form.votePassword) payload.votePassword = form.votePassword;

      const res = await axios.put(`/api/v2/elections/${electionId}`, payload, {
        withCredentials: true,
      });

      toast.success(res.data?.message || "Election updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update election.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[var(--vv-sand)] text-[var(--vv-ink)]">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--vv-sand)] px-6 pb-24 pt-28 text-[var(--vv-ink)]">
      <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-2xl shadow-black/5">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ember)]">Update election</p>
          <h1 className="font-display mt-3 text-4xl font-semibold">Refine your election details.</h1>
          <p className="mt-4 text-sm text-[var(--vv-ink-2)]/75">
            Keep your title, description, timeline, and voting password up to date.
          </p>

          <div className="mt-6 grid gap-4">
            <div className="rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3 text-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ink-2)]/70">Current title</p>
              <p className="mt-2 font-semibold text-[var(--vv-ink)]">{originalForm.title}</p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3 text-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ink-2)]/70">Current dates</p>
              <div className="mt-2 flex flex-wrap gap-3 text-[var(--vv-ink)]">
                <span className="flex items-center gap-2">
                  <FaCalendarAlt className="text-[var(--vv-ember)]" />
                  {originalForm.startDate ? originalForm.startDate.toLocaleString() : "Not set"}
                </span>
                <span className="flex items-center gap-2">
                  <FaCalendarAlt className="text-[var(--vv-ember)]" />
                  {originalForm.endDate ? originalForm.endDate.toLocaleString() : "Not set"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-2xl shadow-black/5">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-[var(--vv-ink-2)]/70">Title</label>
              <input
                type="text"
                placeholder="Election title"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3 text-sm focus:border-[var(--vv-ink)] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[var(--vv-ink-2)]/70">Description</label>
              <textarea
                placeholder="Election description"
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3 text-sm focus:border-[var(--vv-ink)] focus:outline-none"
                rows="4"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[var(--vv-ink-2)]/70">Start date</label>
              <Flatpickr
                value={form.startDate}
                onChange={(dates) => handleChange("startDate", dates[0] || null)}
                options={{
                  enableTime: true,
                  time_24hr: false,
                  dateFormat: "F j, Y h:i K",
                }}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3 text-sm focus:border-[var(--vv-ink)] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[var(--vv-ink-2)]/70">End date</label>
              <Flatpickr
                value={form.endDate}
                onChange={(dates) => handleChange("endDate", dates[0] || null)}
                options={{
                  enableTime: true,
                  time_24hr: false,
                  dateFormat: "F j, Y h:i K",
                }}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3 text-sm focus:border-[var(--vv-ink)] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[var(--vv-ink-2)]/70">New voting password (optional)</label>
              <div className="mt-2 flex items-center gap-2 rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3">
                <FaLock className="text-[var(--vv-ink-2)]/60" />
                <input
                  type="password"
                  placeholder="Set a new voting password"
                  value={form.votePassword}
                  onChange={(e) => handleChange("votePassword", e.target.value)}
                  className="w-full bg-transparent text-sm focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!isFormChanged}
              className={`flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${
                isFormChanged
                  ? "bg-[var(--vv-ink)] text-white shadow-lg shadow-black/20 hover:-translate-y-0.5"
                  : "cursor-not-allowed bg-black/10 text-[var(--vv-ink-2)]/50"
              }`}
            >
              <FaPenNib /> Update election
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default UpdateElection;

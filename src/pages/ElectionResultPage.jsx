import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FaCalendarAlt, FaIdBadge, FaTrophy } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import "react-toastify/dist/ReactToastify.css";

const ElectionResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const electionId = location.state?.electionId;

  const [loading, setLoading] = useState(true);
  const [election, setElection] = useState(null);
  const [result, setResult] = useState([]);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (!electionId) {
      toast.error("No election ID found in state");
      setLoading(false);
      return;
    }

    const fetchResult = async () => {
      try {
        const res = await axios.get(`/api/elections/result/${electionId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          setElection(res.data.election || {});
          setResult(res.data.result || []);
          setWinner(res.data.winner || null);
        } else {
          toast.error(res.data.message || "Failed to fetch results");
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Server error fetching results");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [electionId]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    if (isNaN(date)) return "Invalid Date";
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const chartData = useMemo(
    () =>
      result.map((item) => ({
        name: item.candidate.name,
        votes: item.votes,
        id: item.candidate._id,
      })),
    [result]
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--vv-sand)] text-[var(--vv-ink)]">
        Loading election results...
      </div>
    );
  }

  if (!result.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--vv-sand)] text-[var(--vv-ink)] p-6 text-center">
        No candidates or results found for this election.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--vv-sand)] px-6 pb-24 pt-28 text-[var(--vv-ink)]">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ember)]">Results</p>
            <h1 className="font-display mt-3 text-4xl font-semibold md:text-5xl">
              {election?.title || "Election Results"}
            </h1>
            <p className="mt-3 text-sm text-[var(--vv-ink-2)]/75">
              Final results with verified vote counts.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="rounded-full border border-black/10 bg-white px-5 py-2 text-xs font-semibold text-[var(--vv-ink)]"
          >
            Back to dashboard
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-xl shadow-black/5">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ink-2)]/70">Election ID</p>
            <div className="mt-3 flex items-center gap-2 text-sm">
              <FaIdBadge className="text-[var(--vv-ember)]" />
              <span className="break-all text-[var(--vv-ink)]">{election?._id || electionId}</span>
            </div>
          </div>
          <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-xl shadow-black/5">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ink-2)]/70">Start date</p>
            <div className="mt-3 flex items-center gap-2 text-sm">
              <FaCalendarAlt className="text-[var(--vv-ember)]" />
              <span>{formatDate(election?.startDate)}</span>
            </div>
          </div>
          <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-xl shadow-black/5">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ink-2)]/70">End date</p>
            <div className="mt-3 flex items-center gap-2 text-sm">
              <FaCalendarAlt className="text-[var(--vv-ember)]" />
              <span>{formatDate(election?.endDate)}</span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-2xl shadow-black/5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold">Vote distribution</h2>
              <span className="rounded-full border border-black/10 bg-[var(--vv-sand)] px-3 py-1 text-xs font-semibold">
                {result.length} candidates
              </span>
            </div>
            <div className="mt-6 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis type="number" tick={{ fill: "#6B7280", fontSize: 12 }} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fill: "#111827", fontSize: 12 }}
                    width={120}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(17,24,39,0.06)" }}
                    contentStyle={{ borderRadius: 12, borderColor: "#E5E7EB" }}
                  />
                  <Bar dataKey="votes" radius={[12, 12, 12, 12]}>
                    {chartData.map((entry) => (
                      <Cell
                        key={entry.id}
                        fill={
                          winner && entry.id === winner.candidate._id
                            ? "#F3C969"
                            : "#101826"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 bg-[var(--vv-ink)] p-6 text-white shadow-2xl shadow-black/10">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-gold)]">Winner</p>
            <div className="mt-6 flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[var(--vv-gold)]">
                <FaTrophy />
              </span>
              <div>
                <p className="text-lg font-semibold">
                  {winner?.candidate?.name || "No winner"}
                </p>
                <p className="text-sm text-white/70">
                  {winner ? `${winner.votes} votes` : "Waiting for results"}
                </p>
              </div>
            </div>
            <div className="mt-6 space-y-3 text-sm text-white/70">
              {result.map((item) => (
                <div key={item.candidate._id} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-2">
                  <span>{item.candidate.name}</span>
                  <span className="text-white">{item.votes}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2500} hideProgressBar theme="colored" />
    </div>
  );
};

export default ElectionResultPage;

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FaCalendarAlt, FaIdBadge, FaTrophy, FaCrown } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";
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

  const sortedResult = useMemo(() => {
    return [...result].sort((a, b) => b.votes - a.votes);
  }, [result]);

  const maxVotes = useMemo(() => {
    return sortedResult.reduce((max, item) => Math.max(max, item.votes), 1);
  }, [sortedResult]);

  const chartData = useMemo(() => {
    const labels = sortedResult.map((item) => item.candidate.name);
    const data = sortedResult.map((item) => item.votes);
    const winnerId = winner?.candidate?._id;
    const colors = sortedResult.map((item) =>
      item.candidate._id === winnerId ? "#F3C969" : "#101826"
    );

    return { labels, data, colors };
  }, [sortedResult, winner]);

  const heroChartOptions = useMemo(
    () => ({
      chart: {
        type: "bar",
        toolbar: { show: false },
        fontFamily: "Instrument Sans, sans-serif",
        sparkline: { enabled: true },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 10,
          barHeight: "65%",
        },
      },
      dataLabels: { enabled: false },
      xaxis: { categories: chartData.labels },
      colors: chartData.colors,
      tooltip: { enabled: false },
    }),
    [chartData]
  );

  const heroSeries = useMemo(
    () => [
      {
        name: "Votes",
        data: chartData.data,
      },
    ],
    [chartData]
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
              Magazine-style leaderboard with compact vote trends.
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

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-2xl shadow-black/5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold">Leaderboard</h2>
              <span className="rounded-full border border-black/10 bg-[var(--vv-sand)] px-3 py-1 text-xs font-semibold">
                {result.length} candidates
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {sortedResult.map((item, index) => {
                const isWinner = winner?.candidate?._id === item.candidate._id;
                const voteShare = Math.round((item.votes / maxVotes) * 100);

                const sparkSeries = [
                  {
                    name: "Votes",
                    data: [
                      Math.max(1, Math.round(item.votes * 0.4)),
                      Math.max(1, Math.round(item.votes * 0.6)),
                      Math.max(1, Math.round(item.votes * 0.8)),
                      Math.max(1, item.votes),
                    ],
                  },
                ];

                const sparkOptions = {
                  chart: {
                    type: "bar",
                    sparkline: { enabled: true },
                    toolbar: { show: false },
                  },
                  plotOptions: {
                    bar: {
                      borderRadius: 6,
                      columnWidth: "55%",
                    },
                  },
                  colors: [isWinner ? "#F3C969" : "#101826"],
                  tooltip: { enabled: false },
                };

                return (
                  <div
                    key={item.candidate._id}
                    className={`grid gap-4 rounded-3xl border border-black/10 p-4 md:grid-cols-[48px_1fr_140px] ${
                      isWinner ? "bg-[var(--vv-ink)] text-white" : "bg-[var(--vv-sand)]"
                    }`}
                  >
                    <div className="flex items-center justify-center text-lg font-semibold">
                      {isWinner ? <FaCrown className="text-[var(--vv-gold)]" /> : `#${index + 1}`}
                    </div>
                    <div>
                      <p className={`text-sm uppercase tracking-[0.2em] ${isWinner ? "text-white/60" : "text-[var(--vv-ember)]"}`}>
                        Candidate
                      </p>
                      <h3 className={`font-display mt-2 text-lg font-semibold ${isWinner ? "text-white" : "text-[var(--vv-ink)]"}`}>
                        {item.candidate.name}
                      </h3>
                      <p className={`mt-2 text-xs ${isWinner ? "text-white/70" : "text-[var(--vv-ink-2)]/70"}`}>
                        {item.candidate.bio || "No bio provided."}
                      </p>
                      <div className="mt-3 flex items-center gap-3 text-xs">
                        <span className={`rounded-full px-3 py-1 ${isWinner ? "bg-white/10 text-white" : "bg-white text-[var(--vv-ink)]"}`}>
                          {item.votes} votes
                        </span>
                        <span className={`${isWinner ? "text-white/70" : "text-[var(--vv-ink-2)]/70"}`}>
                          {voteShare}% share
                        </span>
                      </div>
                    </div>
                    <div className="h-16">
                      <Chart options={sparkOptions} series={sparkSeries} type="bar" height="100%" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-2xl shadow-black/5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold">Vote distribution</h2>
              <span className="rounded-full border border-black/10 bg-[var(--vv-sand)] px-3 py-1 text-xs font-semibold">
                Overview
              </span>
            </div>
            <div className="mt-6 h-80">
              <Chart options={heroChartOptions} series={heroSeries} type="bar" height="100%" />
            </div>
            <div className="mt-6 rounded-2xl border border-black/10 bg-[var(--vv-sand)] p-4 text-sm">
              <p className="font-semibold text-[var(--vv-ink)]">Winner spotlight</p>
              <div className="mt-3 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[var(--vv-ember)]">
                  <FaTrophy />
                </span>
                <div>
                  <p className="font-semibold">{winner?.candidate?.name || "No winner"}</p>
                  <p className="text-xs text-[var(--vv-ink-2)]/70">
                    {winner ? `${winner.votes} votes` : "Waiting for results"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2500} hideProgressBar theme="colored" />
    </div>
  );
};

export default ElectionResultPage;

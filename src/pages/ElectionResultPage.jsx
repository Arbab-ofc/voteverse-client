import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FaCalendarAlt, FaIdBadge, FaTrophy, FaCrown } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";
import socket from "../lib/socket";
import "react-toastify/dist/ReactToastify.css";

const ElectionResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const electionId = location.state?.electionId;

  const [loading, setLoading] = useState(true);
  const [election, setElection] = useState(null);
  const [result, setResult] = useState([]);
  const [winner, setWinner] = useState(null);
  const [isFinal, setIsFinal] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);
  const [trend, setTrend] = useState([]);
  const [candidateTrends, setCandidateTrends] = useState({});

  useEffect(() => {
    if (!electionId) {
      toast.error("No election ID found in state");
      setLoading(false);
      return;
    }

    const fetchResult = async () => {
      try {
        const res = await axios.get(`/api/v2/elections/result/${electionId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          setElection(res.data.election || {});
          setResult(res.data.result || []);
          setWinner(res.data.winner || null);
          setIsFinal(Boolean(res.data.isFinal));
          const initialTotal = res.data.totalVotes || 0;
          setTotalVotes(initialTotal);
          setTrend((prev) => {
            if (prev.length) return prev;
            const now = new Date();
            return [
              { x: now.toISOString(), y: initialTotal },
              { x: new Date(now.getTime() + 60 * 1000).toISOString(), y: initialTotal },
            ];
          });
          const now = new Date();
          const seed = [
            { x: now.toISOString(), y: 0.05 },
            { x: new Date(now.getTime() + 60 * 1000).toISOString(), y: 0.1 },
          ];
          const initialCandidateTrends = {};
          const candidatesSource = (res.data.election?.candidates || []).map((c) => ({ candidate: c }));
          const trendSource = (res.data.result || []).length ? res.data.result : candidatesSource;
          trendSource.forEach((item, idx) => {
            if (item?.candidate?._id) {
              const offset = (idx + 1) * 0.15;
              initialCandidateTrends[item.candidate._id] = seed.map((point) => ({
                ...point,
                y: point.y + offset,
              }));
            }
          });
          setCandidateTrends(initialCandidateTrends);
        } else {
          toast.error(res.data.message || "Failed to fetch results");
        }
      } catch (error) {
        console.error(error);
        const message = error.response?.data?.message;
        if (error.response?.status === 400) {
          try {
            const fallback = await axios.get(`/api/v2/elections/id/${electionId}`, {
              withCredentials: true,
            });
            if (fallback.data?.election) {
              setElection(fallback.data.election);
              const fallbackCandidates = fallback.data.election.candidates || [];
              setResult(
                fallbackCandidates.map((candidate) => ({
                  candidate,
                  votes: null,
                }))
              );
              setWinner(null);
              setIsFinal(false);
              setTotalVotes(0);
              setTrend((prev) => {
                if (prev.length) return prev;
                const now = new Date();
                return [
                  { x: now.toISOString(), y: 0 },
                  { x: new Date(now.getTime() + 60 * 1000).toISOString(), y: 0 },
                ];
              });
              const seed = [
                { x: new Date().toISOString(), y: 0.05 },
                { x: new Date(Date.now() + 60 * 1000).toISOString(), y: 0.1 },
              ];
              const fallbackTrends = {};
              fallbackCandidates.forEach((candidate, idx) => {
                if (candidate?._id) {
                  const offset = (idx + 1) * 0.15;
                  fallbackTrends[candidate._id] = seed.map((point) => ({
                    ...point,
                    y: point.y + offset,
                  }));
                }
              });
              setCandidateTrends(fallbackTrends);
            }
          } catch (fallbackError) {
            console.error(fallbackError);
          }
        }
        toast.error(message || "Server error fetching results");
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
    return [...result].sort((a, b) => (b.votes || 0) - (a.votes || 0));
  }, [result]);

  const candidateIndexMap = useMemo(() => {
    const map = {};
    sortedResult.forEach((item, index) => {
      if (item?.candidate?._id) {
        map[item.candidate._id] = index;
      }
    });
    return map;
  }, [sortedResult]);

  const candidateNameMap = useMemo(() => {
    const map = {};
    result.forEach((item) => {
      if (item?.candidate?._id) {
        map[item.candidate._id] = item.candidate.name || "Candidate";
      }
    });
    return map;
  }, [result]);

  const stripApexForeignObject = useCallback((chartContext) => {
    const root = chartContext?.el;
    if (!root) return;
    const cleanup = () => {
      root.querySelectorAll("foreignObject").forEach((node) => {
        if (node.querySelector("style")) {
          node.remove();
        }
      });
      root.querySelectorAll(".apexcharts-legend").forEach((node) => node.remove());
    };
    cleanup();
    if (root.dataset.apexCleaned === "1") return;
    root.dataset.apexCleaned = "1";
    const observer = new MutationObserver(() => cleanup());
    observer.observe(root, { childList: true, subtree: true });
  }, []);

  useEffect(() => {
    if (!electionId) return;

    socket.emit("join-election", electionId);

    const handleVoteUpdate = (payload) => {
      if (payload.electionId !== electionId) return;
      if (payload.voterName) {
        toast.info(`${payload.voterName} voted`);
      } else {
        toast.info("A new vote was cast");
      }
      if (typeof payload.totalVotes === "number") {
        setTotalVotes(payload.totalVotes);
        setTrend((prev) => [
          ...prev,
          { x: payload.votedAt || new Date().toISOString(), y: payload.totalVotes },
        ]);
      }
      if (payload.candidateId && typeof payload.voteCount === "number") {
        setCandidateTrends((prev) => {
          const next = { ...prev };
          const existing = next[payload.candidateId] || [];
          const offset = ((candidateIndexMap[payload.candidateId] ?? 0) + 1) * 0.15;
          next[payload.candidateId] = [
            ...existing,
            {
              x: payload.votedAt || new Date().toISOString(),
              y: Math.log1p(payload.voteCount) + offset,
            },
          ];
          return next;
        });
      }
      if (isFinal && typeof payload.voteCount === "number") {
        setResult((prev) => {
          const next = prev.map((item) =>
            item.candidate._id === payload.candidateId
              ? { ...item, votes: payload.voteCount }
              : item
          );
          const sorted = [...next].sort((a, b) => b.votes - a.votes);
          setWinner(sorted[0] || null);
          return next;
        });
      }
    };

    socket.on("vote-updated", handleVoteUpdate);
    return () => {
      socket.off("vote-updated", handleVoteUpdate);
    };
  }, [electionId, candidateIndexMap, isFinal]);

  const maxVotes = useMemo(() => {
    return sortedResult.reduce((max, item) => Math.max(max, item.votes), 1);
  }, [sortedResult]);

  const candidateTrendSeries = useMemo(() => {
    const ids = Object.keys(candidateTrends);
    if (!ids.length) {
      const now = new Date();
      return [
        {
          name: "Candidate",
          data: [
            { x: now.toISOString(), y: 0.2 },
            { x: new Date(now.getTime() + 60 * 1000).toISOString(), y: 0.25 },
          ],
        },
      ];
    }
    return ids.map((id, index) => ({
      name: candidateNameMap[id] || `Candidate ${index + 1}`,
      data: candidateTrends[id] || [],
    }));
  }, [candidateTrends, candidateNameMap]);

  const trendOptions = useMemo(
    () => ({
      chart: {
        type: "line",
        toolbar: { show: false },
        fontFamily: "Instrument Sans, sans-serif",
        sparkline: { enabled: false },
        events: {
          mounted: stripApexForeignObject,
          updated: stripApexForeignObject,
        },
      },
      legend: { show: false },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 3 },
      markers: { size: 2 },
      colors: ["#101826", "#F3C969", "#7BD5C2", "#FF6B3D", "#6B7280", "#7C5CFF"],
      xaxis: { type: "datetime", labels: { show: true } },
      yaxis: { labels: { show: true }, min: 0 },
      grid: { show: true },
      tooltip: { enabled: true, shared: true, intersect: false },
    }),
    [stripApexForeignObject]
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--vv-sand)] text-[var(--vv-ink)]">
        Loading election results...
      </div>
    );
  }

  if (!result.length) {
    const hasCandidates = (election?.candidates || []).length > 0;
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--vv-sand)] text-[var(--vv-ink)] p-6 text-center">
        {hasCandidates ? "Results are hidden until the election ends." : "No candidates found for this election."}
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

            {!isFinal && (
              <div className="mt-6 rounded-2xl border border-dashed border-black/10 bg-[var(--vv-sand)] p-5 text-sm text-[var(--vv-ink-2)]/70">
                Results are hidden until the election ends. Live trend is shown on the right.
              </div>
            )}

            <div className="mt-6 space-y-4">
              {sortedResult.map((item, index) => {
                const isWinner = winner?.candidate?._id === item.candidate._id;
                const voteShare = isFinal ? Math.round(((item.votes || 0) / maxVotes) * 100) : 0;

                return (
                  <div
                    key={item.candidate._id}
                    className={`grid gap-4 rounded-3xl border border-black/10 p-4 md:grid-cols-[48px_1fr] ${
                      isFinal && isWinner ? "bg-[var(--vv-ink)] text-white" : "bg-[var(--vv-sand)]"
                    }`}
                  >
                    <div className="flex items-center justify-center text-lg font-semibold">
                      {isFinal && isWinner ? <FaCrown className="text-[var(--vv-gold)]" /> : `#${index + 1}`}
                    </div>
                    <div>
                      <p className={`text-sm uppercase tracking-[0.2em] ${isFinal && isWinner ? "text-white/60" : "text-[var(--vv-ember)]"}`}>
                        Candidate
                      </p>
                      <h3 className={`font-display mt-2 text-lg font-semibold ${isFinal && isWinner ? "text-white" : "text-[var(--vv-ink)]"}`}>
                        {item.candidate.name}
                      </h3>
                      <p className={`mt-2 text-xs ${isFinal && isWinner ? "text-white/70" : "text-[var(--vv-ink-2)]/70"}`}>
                        {item.candidate.bio || "No bio provided."}
                      </p>
                      {isFinal && (
                        <div className="mt-3 flex items-center gap-3 text-xs">
                          <span className={`rounded-full px-3 py-1 ${isWinner ? "bg-white/10 text-white" : "bg-white text-[var(--vv-ink)]"}`}>
                            {item.votes} votes
                          </span>
                          <span className={`${isWinner ? "text-white/70" : "text-[var(--vv-ink-2)]/70"}`}>
                            {voteShare}% share
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-2xl shadow-black/5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold">Voting trends</h2>
              <span className="rounded-full border border-black/10 bg-[var(--vv-sand)] px-3 py-1 text-xs font-semibold">
                Live total votes: {totalVotes}
              </span>
            </div>
            <div className="mt-6 h-80">
              <Chart options={trendOptions} series={candidateTrendSeries} type="line" height="100%" />
            </div>
            <div className="mt-6 rounded-2xl border border-black/10 bg-[var(--vv-sand)] p-4 text-sm">
              <p className="font-semibold text-[var(--vv-ink)]">Winner spotlight</p>
              <div className="mt-3 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[var(--vv-ember)]">
                  <FaTrophy />
                </span>
                <div>
                  <p className="font-semibold">{isFinal ? (winner?.candidate?.name || "No winner") : "Hidden until final"}</p>
                  <p className="text-xs text-[var(--vv-ink-2)]/70">
                    {isFinal && winner ? `${winner.votes} votes` : "Results available when election ends"}
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

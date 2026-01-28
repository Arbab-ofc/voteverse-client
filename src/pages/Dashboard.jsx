import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MyElectionCard from '../components/MyElectionCard';
import ElectionCard from '../components/ElectionCard';
import { useNavigate } from 'react-router-dom';
import socket from '../lib/socket';

const Dashboard = () => {
  const [myElections, setMyElections] = useState([]);
  const [allElections, setAllElections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const [myRes, allRes] = await Promise.all([
          axios.get('/api/v2/elections/my', { withCredentials: true }),
          axios.get('/api/v2/elections/all', { withCredentials: true }),
        ]);
        const withVotes = (elections) =>
          (elections || []).map((election) => ({
            ...election,
            liveVotes: election.voters?.length ?? 0,
          }));
        setMyElections(withVotes(myRes.data.elections));
        setAllElections(withVotes(allRes.data.elections));
      } catch (error) {
        console.error('❌ Error fetching elections:', error);
      }
    };

    fetchElections();
  }, []);

  useEffect(() => {
    const ids = new Set([
      ...myElections.map((election) => election._id),
      ...allElections.map((election) => election._id),
    ]);
    ids.forEach((id) => socket.emit('join-election', id));

    const handleVoteUpdate = (payload) => {
      const { electionId, totalVotes } = payload;
      setMyElections((prev) =>
        prev.map((election) =>
          election._id === electionId
            ? { ...election, liveVotes: totalVotes }
            : election
        )
      );
      setAllElections((prev) =>
        prev.map((election) =>
          election._id === electionId
            ? { ...election, liveVotes: totalVotes }
            : election
        )
      );
    };

    socket.on('vote-updated', handleVoteUpdate);
    return () => {
      socket.off('vote-updated', handleVoteUpdate);
    };
  }, [myElections, allElections]);

  const totalLiveVotes = allElections.reduce(
    (sum, election) => sum + (election.liveVotes ?? 0),
    0
  );

  const stats = [
    { label: 'My elections', value: myElections.length },
    { label: 'All elections', value: allElections.length },
    { label: 'Live votes', value: totalLiveVotes },
  ];

  return (
    <div className="min-h-screen bg-[var(--vv-sand)] px-6 pb-24 pt-28 text-[var(--vv-ink)]">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ember)]">Dashboard</p>
            <h1 className="font-display mt-3 text-4xl font-semibold md:text-5xl">
              Your election command center.
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-[var(--vv-ink-2)]/75">
              Track your elections, monitor participation, and spin up new ballots in minutes.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/create-election')}
              className="rounded-full border-2 border-black/80 bg-[var(--vv-ink)] px-6 py-3 text-sm font-semibold text-white shadow-[6px_6px_0_#111827] transition hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#111827]"
            >
              Create election
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="rounded-full border-2 border-black/80 bg-white px-6 py-3 text-sm font-semibold text-[var(--vv-ink)] shadow-[6px_6px_0_#111827] transition hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#111827]"
            >
              Talk to support
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[24px] border-2 border-black/80 bg-white px-6 py-5 shadow-[10px_10px_0_#111827]"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ink-2)]/70">{stat.label}</p>
              <p className="font-display mt-3 text-3xl font-semibold text-[var(--vv-ink)]">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-[28px] border-2 border-black/80 bg-white p-6 shadow-[12px_12px_0_#111827]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl font-semibold">My elections</h2>
                <p className="text-sm text-[var(--vv-ink-2)]/70">Elections you created or manage.</p>
              </div>
              <span className="rounded-full border-2 border-black/80 bg-[var(--vv-sand)] px-4 py-2 text-xs font-semibold shadow-[4px_4px_0_#111827]">
                {myElections.length} total
              </span>
            </div>

            <div className="mt-6 grid gap-4">
              {myElections.length > 0 ? (
                myElections.map((election) => (
                  <MyElectionCard key={election._id} election={election} />
                ))
              ) : (
                <div className="rounded-2xl border-2 border-dashed border-black/40 bg-[var(--vv-sand)] p-6 text-sm text-[var(--vv-ink-2)]/70">
                  You haven't created any elections yet. Start with a new ballot and invite voters.
                </div>
              )}
            </div>
          </section>

          <section className="rounded-[28px] border-2 border-black/80 bg-white p-6 shadow-[12px_12px_0_#111827]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl font-semibold">All elections</h2>
                <p className="text-sm text-[var(--vv-ink-2)]/70">Browse ongoing and public elections.</p>
              </div>
              <span className="rounded-full border-2 border-black/80 bg-[var(--vv-sand)] px-4 py-2 text-xs font-semibold shadow-[4px_4px_0_#111827]">
                {allElections.length} live
              </span>
            </div>

            <div className="mt-6 grid gap-4">
              {allElections.length > 0 ? (
                allElections.map((election) => (
                  <ElectionCard key={election._id} election={election} />
                ))
              ) : (
                <div className="rounded-2xl border-2 border-dashed border-black/40 bg-[var(--vv-sand)] p-6 text-sm text-[var(--vv-ink-2)]/70">
                  No elections are live right now. Check back soon.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

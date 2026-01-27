import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MyElectionCard from '../components/MyElectionCard';
import ElectionCard from '../components/ElectionCard';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [myElections, setMyElections] = useState([]);
  const [allElections, setAllElections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const [myRes, allRes] = await Promise.all([
          axios.get('/api/elections/my', { withCredentials: true }),
          axios.get('/api/elections/all', { withCredentials: true }),
        ]);
        setMyElections(myRes.data.elections || []);
        setAllElections(allRes.data.elections || []);
      } catch (error) {
        console.error('❌ Error fetching elections:', error);
      }
    };

    fetchElections();
  }, []);

  const stats = [
    { label: 'My elections', value: myElections.length },
    { label: 'All elections', value: allElections.length },
    { label: 'Ready to launch', value: myElections.length > 0 ? 'Yes' : 'Create' },
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
              className="rounded-full bg-[var(--vv-ink)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5"
            >
              Create election
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-[var(--vv-ink)]"
            >
              Talk to support
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-black/10 bg-white px-6 py-5 shadow-xl shadow-black/5">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ink-2)]/70">{stat.label}</p>
              <p className="font-display mt-3 text-3xl font-semibold text-[var(--vv-ink)]">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-2xl shadow-black/5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl font-semibold">My elections</h2>
                <p className="text-sm text-[var(--vv-ink-2)]/70">Elections you created or manage.</p>
              </div>
              <span className="rounded-full border border-black/10 bg-[var(--vv-sand)] px-4 py-2 text-xs font-semibold">
                {myElections.length} total
              </span>
            </div>

            <div className="mt-6 grid gap-4">
              {myElections.length > 0 ? (
                myElections.map((election) => (
                  <MyElectionCard key={election._id} election={election} />
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-black/10 bg-[var(--vv-sand)] p-6 text-sm text-[var(--vv-ink-2)]/70">
                  You haven't created any elections yet. Start with a new ballot and invite voters.
                </div>
              )}
            </div>
          </section>

          <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-2xl shadow-black/5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl font-semibold">All elections</h2>
                <p className="text-sm text-[var(--vv-ink-2)]/70">Browse ongoing and public elections.</p>
              </div>
              <span className="rounded-full border border-black/10 bg-[var(--vv-sand)] px-4 py-2 text-xs font-semibold">
                {allElections.length} live
              </span>
            </div>

            <div className="mt-6 grid gap-4">
              {allElections.length > 0 ? (
                allElections.map((election) => (
                  <ElectionCard key={election._id} election={election} />
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-black/10 bg-[var(--vv-sand)] p-6 text-sm text-[var(--vv-ink-2)]/70">
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

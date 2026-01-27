import React from 'react';
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaEdit,
  FaVoteYea,
  FaChartBar,
  FaToolbox,
  FaInfoCircle,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const MyElectionCard = ({ election }) => {
  const { title, startDate, endDate, createdBy, isActive } = election;
  const liveVotes = election.liveVotes ?? election.voters?.length ?? 0;
  const navigate = useNavigate();

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  const handleInfoClick = () => {
    navigate(`/election-details/${election._id}`);
  };

  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-2xl shadow-black/5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ember)]">My election</p>
          <h3 className="font-display mt-2 text-lg font-semibold text-[var(--vv-ink)] line-clamp-2">
            {title}
          </h3>
          <p className="mt-2 text-xs text-[var(--vv-ink-2)]/70">
            Created by <span className="font-semibold">{createdBy?.name || 'Unknown'}</span>
          </p>
        </div>
        <button
          onClick={handleInfoClick}
          className="rounded-full border border-black/10 p-2 text-[var(--vv-ink)] hover:bg-black/5"
          aria-label="More info"
          title="More info"
        >
          <FaInfoCircle />
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 ${
            isActive
              ? 'bg-[var(--vv-sage)]/30 text-[var(--vv-ink)]'
              : 'bg-black/10 text-[var(--vv-ink-2)]/70'
          }`}
        >
          {isActive ? <FaCheckCircle /> : <FaTimesCircle />}
          {isActive ? 'Active' : 'Ended'}
        </span>
        <span className="rounded-full border border-black/10 bg-[var(--vv-sand)] px-3 py-1 text-[var(--vv-ink)]">
          Live votes: {liveVotes}
        </span>
      </div>

      <div className="mt-4 grid gap-3 rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3 text-xs text-[var(--vv-ink-2)]/70">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <FaCalendarAlt className="text-[var(--vv-ember)]" />
            Start
          </span>
          <span className="font-semibold text-[var(--vv-ink)]">{formatDate(startDate)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <FaCalendarAlt className="text-[var(--vv-ember)]" />
            End
          </span>
          <span className="font-semibold text-[var(--vv-ink)]">{formatDate(endDate)}</span>
        </div>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <button
          onClick={() => navigate('/update-election', { state: { electionId: election._id } })}
          disabled={!isActive}
          className={`flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition ${
            isActive
              ? 'bg-[var(--vv-ink)] text-white hover:-translate-y-0.5'
              : 'cursor-not-allowed bg-black/10 text-[var(--vv-ink-2)]/50'
          }`}
        >
          <FaEdit /> Update
        </button>

        <button
          onClick={() => navigate('/manage-election', { state: { electionId: election._id, electionTitle: title } })}
          className="flex items-center justify-center gap-2 rounded-full border border-black/10 px-4 py-2 text-xs font-semibold text-[var(--vv-ink)] hover:-translate-y-0.5"
        >
          <FaToolbox /> Manage
        </button>

        <button
          onClick={() => navigate('/candidates', { state: { electionId: election._id } })}
          disabled={!isActive}
          className={`flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition ${
            isActive
              ? 'bg-white border border-black/10 text-[var(--vv-ink)] hover:-translate-y-0.5'
              : 'cursor-not-allowed bg-black/10 text-[var(--vv-ink-2)]/50'
          }`}
        >
          <FaVoteYea /> Vote
        </button>

        <button
          onClick={() => navigate('/election-result', { state: { electionId: election._id } })}
          className="flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition bg-[var(--vv-ink)] text-white hover:-translate-y-0.5"
        >
          <FaChartBar /> Results
        </button>
      </div>
    </div>
  );
};

export default MyElectionCard;

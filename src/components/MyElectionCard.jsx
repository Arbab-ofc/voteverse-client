import React from 'react';
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaUserPlus,
  FaUserMinus,
  FaEdit,
  FaTrash,
  FaVoteYea,
  FaPowerOff,
  FaChartBar,
  FaInfoCircle,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const MyElectionCard = ({ election }) => {
  const { title, startDate, endDate, createdBy, isActive } = election;
  const navigate = useNavigate();

  const handleAddCandidate = () => {
    navigate('/add-candidate', {
      state: { electionId: election._id },
    });
  };

  const handleViewCandidates = () => {
    navigate('/candidates', {
      state: {
        electionId: election._id,
      },
    });
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  const handleDeleteNavigation = (currentElection) => {
    navigate('/delete-election', {
      state: {
        electionId: currentElection._id,
        title: currentElection.title,
        startDate: currentElection.startDate,
        endDate: currentElection.endDate,
      },
    });
  };

  const handleClick = (electionId) => {
    navigate('/update-election', {
      state: { electionId },
    });
  };

  const handleRemoveCandidate = () => {
    navigate('/remove-candidate', { state: { electionId: election._id, electionTitle: election.title } });
  };

  const handleEndElection = () => {
    navigate('/end-election', { state: { electionId: election._id, electionTitle: election.title } });
  };

  const handleViewResult = () => {
    navigate('/election-result', { state: { electionId: election._id } });
  };

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

      <div className="mt-4 flex items-center gap-2 text-xs font-semibold">
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
          onClick={() => handleClick(election._id)}
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
          onClick={() => handleDeleteNavigation(election)}
          disabled={!isActive}
          className={`flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition ${
            isActive
              ? 'border border-black/10 text-[var(--vv-ink)] hover:-translate-y-0.5'
              : 'cursor-not-allowed bg-black/10 text-[var(--vv-ink-2)]/50'
          }`}
        >
          <FaTrash /> Delete
        </button>

        <button
          onClick={handleAddCandidate}
          disabled={!isActive}
          className={`flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition ${
            isActive
              ? 'bg-[var(--vv-ember)] text-white hover:-translate-y-0.5'
              : 'cursor-not-allowed bg-black/10 text-[var(--vv-ink-2)]/50'
          }`}
        >
          <FaUserPlus /> Add
        </button>

        <button
          onClick={handleRemoveCandidate}
          disabled={!isActive}
          className={`flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition ${
            isActive
              ? 'border border-black/10 text-[var(--vv-ink)] hover:-translate-y-0.5'
              : 'cursor-not-allowed bg-black/10 text-[var(--vv-ink-2)]/50'
          }`}
        >
          <FaUserMinus /> Remove
        </button>

        <button
          onClick={handleViewCandidates}
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
          onClick={handleEndElection}
          disabled={!isActive}
          className={`flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition ${
            isActive
              ? 'border border-black/10 text-[var(--vv-ink)] hover:-translate-y-0.5'
              : 'cursor-not-allowed bg-black/10 text-[var(--vv-ink-2)]/50'
          }`}
        >
          <FaPowerOff /> End
        </button>

        <button
          onClick={handleViewResult}
          disabled={isActive}
          className={`flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition sm:col-span-2 ${
            !isActive
              ? 'bg-[var(--vv-ink)] text-white hover:-translate-y-0.5'
              : 'cursor-not-allowed bg-black/10 text-[var(--vv-ink-2)]/50'
          }`}
        >
          <FaChartBar /> Results
        </button>
      </div>
    </div>
  );
};

export default MyElectionCard;

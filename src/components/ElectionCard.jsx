import React, { useMemo } from 'react';
import { FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaPoll } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';

const ElectionCard = ({ election }) => {
  const { title, startDate, endDate, createdBy } = election;
  const liveVotes = election.liveVotes ?? election.voters?.length ?? 0;
  const navigate = useNavigate();

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  const now = new Date();
  const hasStarted = new Date(startDate) <= now;
  const hasEnded = new Date(endDate) < now;
  const isActive = hasStarted && !hasEnded;

  const handleViewCandidates = () => {
    navigate(`/vote/${election._id}`);
  };

  const handleViewResult = () => {
    navigate('/election-result', {
      state: {
        electionId: election._id,
      },
    });
  };

  const qrValue = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return `${window.location.origin}/vote/${election._id}`;
  }, [election._id]);

  return (
    <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-xl shadow-black/5 transition hover:-translate-y-1">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ember)]">Election</p>
          <h3 className="font-display mt-2 text-lg font-semibold text-[var(--vv-ink)] line-clamp-2">
            {title}
          </h3>
          <p className="mt-2 text-xs text-[var(--vv-ink-2)]/70">
            Created by <span className="font-semibold">{createdBy?.name || 'Unknown'}</span>
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 text-xs font-semibold">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 ${
              isActive
                ? 'bg-[var(--vv-sage)]/30 text-[var(--vv-ink)]'
                : 'bg-black/10 text-[var(--vv-ink-2)]/70'
            }`}
          >
            {isActive ? <FaCheckCircle /> : <FaTimesCircle />}
            {isActive ? 'Active' : 'Closed'}
          </span>
          <span className="rounded-full border border-black/10 bg-[var(--vv-sand)] px-3 py-1 text-[var(--vv-ink)]">
            Live votes: {liveVotes}
          </span>
        </div>
      </div>

      {qrValue && (
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ember)]">QR vote link</p>
            <p className="mt-2 text-xs text-[var(--vv-ink-2)]/70">
              Scan to open voting page
            </p>
          </div>
          <div className="rounded-2xl bg-white p-2 shadow-lg shadow-black/10">
            <QRCodeCanvas value={qrValue} size={72} bgColor="#ffffff" fgColor="#0b0f17" />
          </div>
        </div>
      )}

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

      <div className="mt-5 flex gap-3">
        <button
          className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
            isActive
              ? 'bg-[var(--vv-ink)] text-white hover:-translate-y-0.5'
              : 'cursor-not-allowed bg-black/10 text-[var(--vv-ink-2)]/50'
          }`}
          onClick={handleViewCandidates}
          disabled={!isActive}
        >
          Vote now
        </button>
        <button
          className="flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition bg-white border border-black/10 text-[var(--vv-ink)] hover:-translate-y-0.5"
          onClick={handleViewResult}
        >
          <FaPoll />
          Results
        </button>
      </div>
    </div>
  );
};

export default ElectionCard;

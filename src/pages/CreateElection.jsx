import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Edit, Info, Clock, Lock } from 'lucide-react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/airbnb.css';

const CreateElection = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: null,
    endDate: null,
    votePassword: '',
    allowedEmails: '',
    allowedEmailDomains: ''
  });
  const [showAllowedEmails, setShowAllowedEmails] = useState(false);
  const [showAllowedDomains, setShowAllowedDomains] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, field) => {
    setFormData({ ...formData, [field]: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, startDate, endDate, votePassword, allowedEmails, allowedEmailDomains } = formData;
    const hasRestrictions = Boolean(allowedEmails.trim()) || Boolean(allowedEmailDomains.trim());

    if (!title || !startDate || !endDate) {
      return toast.error('Title and dates are required!');
    }
    if (!hasRestrictions && !votePassword) {
      return toast.error('Set a voting password or add allowed emails/domains.');
    }

    try {
      const { data } = await axios.post(
        '/api/v2/elections/create-election',
        formData,
        { withCredentials: true }
      );

      toast.success(data.message);
      setTimeout(() => navigate(`/dashboard`), 2000);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--vv-sand)] px-6 pb-16 pt-24">
      <ToastContainer position="top-center" theme="light" />
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 right-10 h-56 w-56 rounded-full bg-[var(--vv-sage)]/40 blur-3xl" />
        <div className="absolute bottom-10 left-0 h-72 w-72 rounded-full bg-[var(--vv-ember)]/30 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/60 to-transparent" />
      </div>
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-3 text-[var(--vv-ink)]">
          <span className="w-fit rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--vv-ink-2)]/70">
            Election Studio
          </span>
          <h1 className="font-display text-4xl font-semibold md:text-5xl">Create an election with confidence.</h1>
          <p className="max-w-2xl text-sm text-[var(--vv-ink-2)]/80">
            Set the title, timeline, and security in one focused flow. You can add candidates and launch the ballot right after creation.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr]">
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-black/10 bg-white p-5 text-[var(--vv-ink)] shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
                <div className="flex items-center gap-3 text-sm font-semibold">
                  <Info className="text-[var(--vv-ember)]" />
                  Details that scale
                </div>
                <p className="mt-2 text-xs text-[var(--vv-ink-2)]/70">Clear metadata keeps voters aligned and reduces setup errors.</p>
              </div>
              <div className="rounded-2xl border border-black/10 bg-white p-5 text-[var(--vv-ink)] shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
                <div className="flex items-center gap-3 text-sm font-semibold">
                  <CalendarDays className="text-[var(--vv-sage)]" />
                  Precision timing
                </div>
                <p className="mt-2 text-xs text-[var(--vv-ink-2)]/70">Define the start and end windows down to the minute.</p>
              </div>
              <div className="rounded-2xl border border-black/10 bg-white p-5 text-[var(--vv-ink)] shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
                <div className="flex items-center gap-3 text-sm font-semibold">
                  <Clock className="text-[var(--vv-gold)]" />
                  Fast iteration
                </div>
                <p className="mt-2 text-xs text-[var(--vv-ink-2)]/70">Candidates can be added immediately after creation.</p>
              </div>
              <div className="rounded-2xl border border-black/10 bg-white p-5 text-[var(--vv-ink)] shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
                <div className="flex items-center gap-3 text-sm font-semibold">
                  <Lock className="text-[var(--vv-ember)]" />
                  Secure access
                </div>
                <p className="mt-2 text-xs text-[var(--vv-ink-2)]/70">Protect ballots with a dedicated election password.</p>
              </div>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6 text-[var(--vv-ink)] shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--vv-ink-2)]/70">Setup checklist</p>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center gap-3 rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3">
                  <span className="h-2 w-2 rounded-full bg-[var(--vv-sage)]" />
                  Add a clear title and a short description.
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3">
                  <span className="h-2 w-2 rounded-full bg-[var(--vv-gold)]" />
                  Select the exact voting window.
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3">
                  <span className="h-2 w-2 rounded-full bg-[var(--vv-ember)]" />
                  Lock access with a secure password.
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6 text-[var(--vv-ink)] shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--vv-ink-2)]/70">Platform highlights</p>
              <div className="mt-4 space-y-3 text-sm text-[var(--vv-ink-2)]/80">
                <div className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[var(--vv-ember)]" />
                  Real-time vote tracking with live updates.
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[var(--vv-sage)]" />
                  Encrypted ballots and audited results.
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[var(--vv-gold)]" />
                  Mobile-friendly voting flows for all devices.
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[var(--vv-ember)]" />
                  Export-ready results and transparent logs.
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[var(--vv-sage)]" />
                  Flexible access controls for private elections.
                </div>
              </div>
            </div>
          </div>

          <form
            className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.18)]"
            onSubmit={handleSubmit}
          >
            <div className="border-b border-black/10 bg-[var(--vv-sand)] px-8 py-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--vv-ink-2)]/70">Election setup</p>
              <h2 className="font-display mt-2 text-2xl font-semibold text-[var(--vv-ink)]">Core details</h2>
              <p className="mt-2 text-sm text-[var(--vv-ink-2)]/70">
                Create the election shell now. Candidates and voter access follow in the next step.
              </p>
            </div>

            <div className="space-y-8 px-8 py-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[var(--vv-ink-2)]/70">
                  <span>Basics</span>
                  <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-[10px] font-semibold text-[var(--vv-ink-2)]/70">Step 1</span>
                </div>
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[var(--vv-ink)]">Election Title</label>
                    <div className="mt-2 flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-3 py-2 shadow-[0_10px_24px_rgba(15,23,42,0.05)] focus-within:border-[var(--vv-ember)]">
                      <Edit className="text-[var(--vv-ink-2)]/60" />
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full bg-transparent text-sm text-[var(--vv-ink)] placeholder:text-[var(--vv-ink-2)]/50 focus:outline-none"
                        placeholder="Enter election title"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[var(--vv-ink)]">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3"
                      className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3 text-sm text-[var(--vv-ink)] shadow-[0_10px_24px_rgba(15,23,42,0.05)] placeholder:text-[var(--vv-ink-2)]/50 focus:border-[var(--vv-ember)] focus:outline-none"
                      placeholder="Add a short overview (optional)"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[var(--vv-ink-2)]/70">
                  <span>Schedule</span>
                  <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-[10px] font-semibold text-[var(--vv-ink-2)]/70">Step 2</span>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-[var(--vv-ink)]">Start Date</label>
                    <Flatpickr
                      value={formData.startDate}
                      onChange={(dates) => handleDateChange(dates[0] || null, 'startDate')}
                      options={{
                        enableTime: true,
                        time_24hr: false,
                        dateFormat: "F j, Y h:i K",
                      }}
                      className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3 text-sm text-[var(--vv-ink)] shadow-[0_10px_24px_rgba(15,23,42,0.05)] focus:border-[var(--vv-ember)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[var(--vv-ink)]">End Date</label>
                    <Flatpickr
                      value={formData.endDate}
                      onChange={(dates) => handleDateChange(dates[0] || null, 'endDate')}
                      options={{
                        enableTime: true,
                        time_24hr: false,
                        dateFormat: "F j, Y h:i K",
                      }}
                      className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3 text-sm text-[var(--vv-ink)] shadow-[0_10px_24px_rgba(15,23,42,0.05)] focus:border-[var(--vv-ember)] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[var(--vv-ink-2)]/70">
                  <span>Security</span>
                  <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-[10px] font-semibold text-[var(--vv-ink-2)]/70">Step 3</span>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--vv-ink)]">Election Password</label>
                  <input
                    type="password"
                    name="votePassword"
                    value={formData.votePassword}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3 text-sm text-[var(--vv-ink)] shadow-[0_10px_24px_rgba(15,23,42,0.05)] placeholder:text-[var(--vv-ink-2)]/50 focus:border-[var(--vv-ember)] focus:outline-none"
                    placeholder="Set a voting password"
                  />
                  <p className="mt-2 text-xs text-[var(--vv-ink-2)]/70">
                    Optional if you restrict voting by email or domain.
                  </p>
                </div>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3 text-sm">
                    <input
                      type="checkbox"
                      checked={showAllowedEmails}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setShowAllowedEmails(checked);
                        if (!checked) {
                          setFormData((prev) => ({ ...prev, allowedEmails: "" }));
                        }
                      }}
                      className="h-4 w-4 accent-[var(--vv-ink)]"
                    />
                    Restrict voting to specific email addresses
                  </label>
                  {showAllowedEmails && (
                    <div>
                      <label className="block text-sm font-semibold text-[var(--vv-ink)]">Allowed Emails</label>
                      <textarea
                        name="allowedEmails"
                        value={formData.allowedEmails}
                        onChange={handleChange}
                        rows="3"
                        className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3 text-sm text-[var(--vv-ink)] shadow-[0_10px_24px_rgba(15,23,42,0.05)] placeholder:text-[var(--vv-ink-2)]/50 focus:border-[var(--vv-ember)] focus:outline-none"
                        placeholder="user1@example.com, user2@example.com"
                      />
                      <p className="mt-2 text-xs text-[var(--vv-ink-2)]/70">
                        Only these emails can vote. Separate multiple emails with commas.
                      </p>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3 text-sm">
                    <input
                      type="checkbox"
                      checked={showAllowedDomains}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setShowAllowedDomains(checked);
                        if (!checked) {
                          setFormData((prev) => ({ ...prev, allowedEmailDomains: "" }));
                        }
                      }}
                      className="h-4 w-4 accent-[var(--vv-ink)]"
                    />
                    Restrict voting to email domains
                  </label>
                  {showAllowedDomains && (
                    <div>
                      <label className="block text-sm font-semibold text-[var(--vv-ink)]">Allowed Email Domains</label>
                      <input
                        type="text"
                        name="allowedEmailDomains"
                        value={formData.allowedEmailDomains}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3 text-sm text-[var(--vv-ink)] shadow-[0_10px_24px_rgba(15,23,42,0.05)] placeholder:text-[var(--vv-ink-2)]/50 focus:border-[var(--vv-ember)] focus:outline-none"
                        placeholder="@company.com"
                      />
                      <p className="mt-2 text-xs text-[var(--vv-ink-2)]/70">
                        Allow anyone with these domains. Separate multiple domains with commas.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-black/10 bg-white px-8 py-6">
              <button
                type="submit"
                className="w-full rounded-2xl bg-[var(--vv-ink)] py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(15,23,42,0.25)] transition hover:-translate-y-0.5"
              >
                Create Election
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateElection;

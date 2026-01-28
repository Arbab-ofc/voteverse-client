import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaShieldAlt, FaVoteYea, FaUserCheck } from 'react-icons/fa';
import TestimonialsSlider from '../components/TestimonialsSlider';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    title: 'Verified Identity Flow',
    body: 'Layered checks with secure sessions and audit logs that keep every vote attributable and private.'
  },
  {
    title: 'Live Result Streams',
    body: 'Transparent outcomes with real-time dashboards and instant election close summaries.'
  },
  {
    title: 'Zero-Fragile UX',
    body: 'Fast, resilient flows that keep voters confident even on slow networks.'
  },
  {
    title: 'Multi-Device Ready',
    body: 'A consistent experience across desktop, tablet, and mobile with accessibility in mind.'
  }
];

const steps = [
  { title: 'Create & Verify', detail: 'Launch a new election in minutes and verify organizers.' },
  { title: 'Invite Voters', detail: 'Send secure access and track voter engagement.' },
  { title: 'Cast Votes', detail: 'Guided, distraction-free ballot flow with confirmations.' },
  { title: 'Close & Publish', detail: 'Finalize, publish results, and export reports.' }
];

const stats = [
  { label: 'Uptime', value: '99.98%' },
  { label: 'Avg. Vote Time', value: '38s' },
  { label: 'Audit Events', value: '1.6M+' },
  { label: 'Device Support', value: 'All Major' }
];

const faqs = [
  {
    question: 'How is VoteVerse secure?',
    answer: 'We combine encryption, session hardening, and immutable audit trails for every voting action.'
  },
  {
    question: 'Can elections be run remotely?',
    answer: 'Yes. Invite voters by email and monitor participation from a single dashboard.'
  },
  {
    question: 'Does it scale for large groups?',
    answer: 'VoteVerse is optimized for heavy traffic with real-time updates and reliable queues.'
  }
];

const Home = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate('/register');
  };

  return (
    <div className="overflow-x-hidden bg-[var(--vv-sand)]">
      <section className="relative px-6 pt-20 pb-16 md:pt-24 md:pb-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-24 right-10 h-56 w-56 rounded-full bg-[var(--vv-sage)]/40 blur-3xl" />
          <div className="absolute bottom-10 left-0 h-72 w-72 rounded-full bg-[var(--vv-ember)]/30 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/60 to-transparent" />
        </div>

        <div className="mx-auto flex max-w-6xl flex-col gap-12 md:flex-row md:items-center">
          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[var(--vv-ink)]"
            >
              <span className="h-2 w-2 rounded-full bg-[var(--vv-ember)]" />
              Secure digital voting, built for trust
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="font-display mt-6 text-4xl font-semibold leading-tight text-[var(--vv-ink)] md:text-5xl"
            >
              The clean, confident way to run elections online.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-5 text-base text-[var(--vv-ink-2)]/80 md:text-lg"
            >
              VoteVerse blends verified identity, live transparency, and calm UX so every voter can move fast and feel safe.
            </motion.p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={handleGetStarted}
                className="rounded-full bg-[var(--vv-ink)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5"
              >
                Start an election
              </button>
              <button
                type="button"
                onClick={() => navigate('/about')}
                className="rounded-full border border-black/15 bg-white px-6 py-3 text-sm font-semibold text-[var(--vv-ink)] transition hover:-translate-y-0.5"
              >
                Explore the platform
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="md:w-1/2"
          >
            <div className="relative">
              <div className="absolute -left-3 top-3 hidden h-full w-full rounded-[24px] border-2 border-black/80 bg-[var(--vv-sand)] shadow-[10px_10px_0_#111827] sm:block" />
              <div className="relative rounded-[24px] border-2 border-black/80 bg-white p-6 shadow-[10px_10px_0_#111827] transition duration-300 hover:-translate-y-1 hover:shadow-[14px_14px_0_#111827] sm:rounded-[28px] sm:p-6 sm:shadow-[12px_12px_0_#111827]">
                <div className="pointer-events-none absolute inset-0 rounded-[26px] border border-black/10" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ember)]">Live election</p>
                  <h3 className="font-display mt-2 text-2xl font-semibold">City Council 2026</h3>
                </div>
                <span className="rounded-full bg-[var(--vv-sage)]/30 px-3 py-1 text-xs font-semibold text-[var(--vv-ink)]">
                  68% turnout
                </span>
              </div>
              <div className="mt-6 space-y-3">
                {['District 1', 'District 2', 'District 3'].map((label, index) => (
                  <div key={label} className="rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3 shadow-[4px_4px_0_rgba(17,24,39,0.08)]">
                    <div className="flex items-center justify-between text-sm font-semibold">
                      <span>{label}</span>
                      <span>{64 + index * 6}%</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-black/10">
                      <div
                        className="h-2 rounded-full bg-[var(--vv-ink)]"
                        style={{ width: `${64 + index * 6}%` }}
                      />
                    </div>
                  </div>
                  ))}
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs font-semibold text-[var(--vv-ink-2)]/70">
                <div className="rounded-xl border-2 border-black/80 bg-white px-2 py-3 shadow-[6px_6px_0_#111827]">
                  <FaVoteYea className="mx-auto mb-2 text-[var(--vv-ember)]" />
                  Live ballots
                </div>
                <div className="rounded-xl border-2 border-black/80 bg-white px-2 py-3 shadow-[6px_6px_0_#111827]">
                  <FaShieldAlt className="mx-auto mb-2 text-[var(--vv-ember)]" />
                  Encrypted
                </div>
                <div className="rounded-xl border-2 border-black/80 bg-white px-2 py-3 shadow-[6px_6px_0_#111827]">
                  <FaUserCheck className="mx-auto mb-2 text-[var(--vv-ember)]" />
                  Verified
                </div>
              </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="relative mx-auto max-w-6xl">
          <div className="absolute -left-3 top-3 hidden h-full w-full rounded-[24px] border-2 border-black/80 bg-[var(--vv-sand)] shadow-[10px_10px_0_#111827] sm:block" />
          <div className="relative grid gap-4 rounded-[24px] border-2 border-black/80 bg-white px-6 py-6 text-center text-sm font-semibold text-[var(--vv-ink-2)]/70 shadow-[10px_10px_0_#111827] sm:grid-cols-4 sm:rounded-[28px] sm:shadow-[12px_12px_0_#111827]">
            <div className="pointer-events-none absolute inset-0 rounded-[26px] border border-black/10" />
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border-2 border-black/80 bg-[var(--vv-sand)] px-4 py-5 shadow-[6px_6px_0_#111827]"
              >
                <div className="font-display text-2xl text-[var(--vv-ink)]">{stat.value}</div>
                <div className="mt-1 uppercase tracking-[0.2em] text-[11px]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ember)]">Why VoteVerse</p>
              <h2 className="font-display mt-3 text-3xl font-semibold text-[var(--vv-ink)] md:text-4xl">
                Designed for trust, speed, and calm focus.
              </h2>
            </div>
            <p className="max-w-lg text-sm text-[var(--vv-ink-2)]/70">
              Every flow is optimized for confidence: from secure logins to transparent results and audit trails.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-[24px] border-2 border-black/80 bg-white p-6 shadow-[10px_10px_0_#111827] transition duration-300 hover:-translate-y-1 hover:shadow-[14px_14px_0_#111827]"
              >
                <FaCheckCircle className="text-2xl text-[var(--vv-ember)]" />
                <h3 className="font-display mt-4 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-3 text-sm text-[var(--vv-ink-2)]/70">{feature.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 rounded-[28px] border-2 border-black/80 bg-[var(--vv-ink)] px-8 py-12 text-white shadow-[12px_12px_0_#111827] md:flex-row md:items-center">
          <div className="md:w-2/3">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-gold)]">Election flow</p>
            <h2 className="font-display mt-3 text-3xl font-semibold md:text-4xl">
              Every step is guided, visible, and auditable.
            </h2>
            <p className="mt-4 text-sm text-white/70">
              Set up, invite, vote, and publish with clarity. No confusion. No delays.
            </p>
          </div>
          <div className="md:w-1/3">
            <button
              type="button"
              onClick={handleGetStarted}
              className="w-full rounded-full border-2 border-black/80 bg-[var(--vv-gold)] px-6 py-3 text-sm font-semibold text-[var(--vv-ink)] shadow-[6px_6px_0_#111827] transition hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#111827]"
            >
              Launch your first election
            </button>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-[24px] border-2 border-black/80 bg-white p-6 shadow-[10px_10px_0_#111827] transition duration-300 hover:-translate-y-1 hover:shadow-[14px_14px_0_#111827]"
              >
                <div className="font-display text-3xl text-[var(--vv-ember)]">0{index + 1}</div>
                <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-[var(--vv-ink-2)]/70">{step.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSlider />

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] border-2 border-black/80 bg-white p-8 shadow-[12px_12px_0_#111827]">
            <h2 className="font-display text-3xl font-semibold">Frequently asked questions</h2>
            <div className="mt-6 space-y-5">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-2xl border-2 border-black/80 bg-[var(--vv-sand)] px-5 py-4 shadow-[6px_6px_0_#111827]"
                >
                  <h3 className="text-sm font-semibold text-[var(--vv-ink)]">{faq.question}</h3>
                  <p className="mt-2 text-sm text-[var(--vv-ink-2)]/70">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[28px] border-2 border-black/80 bg-[var(--vv-ink)] p-8 text-white shadow-[12px_12px_0_#111827]">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-gold)]">Next steps</p>
            <h3 className="font-display mt-4 text-3xl font-semibold">Ready to modernize your elections?</h3>
            <p className="mt-4 text-sm text-white/70">
              Move from paper chaos to verified, digital simplicity. Invite your team and start in minutes.
            </p>
            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={handleGetStarted}
                className="w-full rounded-full border-2 border-black/80 bg-white px-6 py-3 text-sm font-semibold text-[var(--vv-ink)] shadow-[6px_6px_0_#111827] transition hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#111827]"
              >
                Create account
              </button>
              <button
                type="button"
                onClick={() => navigate('/contact')}
                className="w-full rounded-full border-2 border-white/60 px-6 py-3 text-sm font-semibold text-white shadow-[6px_6px_0_rgba(255,255,255,0.2)] transition hover:-translate-y-0.5"
              >
                Talk to support
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

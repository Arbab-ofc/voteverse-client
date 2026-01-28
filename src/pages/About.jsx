import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const About = () => {
  const values = [
    { title: "Transparency", body: "Every action is tracked with auditable proof." },
    { title: "Security", body: "Encryption-first workflows keep ballots safe." },
    { title: "Empowerment", body: "Voters stay informed at every stage." },
    { title: "Integrity", body: "Clear outcomes with verifiable trails." },
    { title: "Innovation", body: "Modern UX for serious civic work." },
  ];

  const milestones = [
    { year: "2023", label: "Idea to prototype with verified vote flows." },
    { year: "2024", label: "Scaled to pilot programs and audit tooling." },
    { year: "2025", label: "Public launch with real-time reporting." },
    { year: "2026", label: "Trusted by growing communities worldwide." },
  ];

  const techStack = ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"];

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-[var(--vv-sand)] px-6 pb-24 pt-28 text-[var(--vv-ink)]">
      <section className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ember)]">About VoteVerse</p>
            <h1 className="font-display mt-3 text-4xl font-semibold md:text-5xl">
              Built for elections that feel calm, clear, and trusted.
            </h1>
            <p className="mt-5 text-base text-[var(--vv-ink-2)]/75">
              VoteVerse exists to remove uncertainty from digital voting. We combine verified identity, real-time results,
              and thoughtful UX so organizers can run transparent elections without friction.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border-2 border-black/80 bg-white p-8 shadow-[12px_12px_0_#111827]">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ember)]">Impact snapshot</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { label: "Votes Cast", value: "+10K" },
                { label: "Uptime", value: "99.9%" },
                { label: "Org Partners", value: "50+" },
                { label: "Avg Vote Time", value: "38s" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border-2 border-black/80 bg-[var(--vv-sand)] px-4 py-4 shadow-[6px_6px_0_#111827]"
                >
                  <p className="font-display text-xl font-semibold">{stat.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--vv-ink-2)]/70">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <motion.section
        className="mx-auto mt-16 max-w-6xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-[24px] border-2 border-black/80 bg-white p-6 shadow-[10px_10px_0_#111827] transition duration-300 hover:-translate-y-1 hover:shadow-[14px_14px_0_#111827]"
            >
              <h3 className="font-display text-xl font-semibold">{value.title}</h3>
              <p className="mt-3 text-sm text-[var(--vv-ink-2)]/70">{value.body}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="mx-auto mt-16 max-w-6xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="rounded-[28px] border-2 border-black/80 bg-[var(--vv-ink)] p-8 text-white shadow-[12px_12px_0_#111827]">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-gold)]">Our journey</p>
          <h2 className="font-display mt-3 text-3xl font-semibold">From concept to trusted platform.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {milestones.map((milestone) => (
              <div
                key={milestone.year}
                className="rounded-2xl border-2 border-white/60 bg-white/5 px-5 py-4 shadow-[6px_6px_0_rgba(255,255,255,0.2)]"
              >
                <p className="text-sm font-semibold text-[var(--vv-gold)]">{milestone.year}</p>
                <p className="mt-2 text-sm text-white/70">{milestone.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="mx-auto mt-16 max-w-6xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] border-2 border-black/80 bg-white p-8 shadow-[12px_12px_0_#111827]">
            <h2 className="font-display text-3xl font-semibold">A note from the founder</h2>
            <blockquote className="mt-4 text-sm text-[var(--vv-ink-2)]/75">
              “We believe voting should be as secure as your bank and as easy as your favorite app.”
            </blockquote>
            <p className="mt-4 text-sm font-semibold">— Arbab Arshad</p>
          </div>
          <div className="rounded-[28px] border-2 border-black/80 bg-white p-8 shadow-[12px_12px_0_#111827]">
            <h3 className="font-display text-2xl font-semibold">Join the community</h3>
            <p className="mt-3 text-sm text-[var(--vv-ink-2)]/70">
              Follow the journey, contribute ideas, and help us keep democracy transparent.
            </p>
            <div className="mt-6 flex items-center gap-4 text-2xl text-[var(--vv-ink)]">
              <a
                href="https://github.com/Arbab-ofc"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-black/80 bg-white p-3 shadow-[6px_6px_0_#111827] transition hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#111827]"
              >
                <FaGithub />
              </a>
              <a
                href="mailto:arbababby111@gmail.com"
                className="rounded-full border-2 border-black/80 bg-white p-3 shadow-[6px_6px_0_#111827] transition hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#111827]"
              >
                <FaEnvelope />
              </a>
              <a
                href="https://www.linkedin.com/in/arbab-arshad-0b2961326/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-black/80 bg-white p-3 shadow-[6px_6px_0_#111827] transition hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#111827]"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;

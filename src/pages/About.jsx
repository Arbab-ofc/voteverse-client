import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const About = () => {
  const coreValues = [
    "Transparency",
    "Security",
    "Empowerment",
    "Integrity",
    "Innovation",
  ];

  const techStack = [
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Tailwind CSS",
  ];

  const stats = [
    { label: "Launch Year", value: "2025" },
    { label: "Votes Cast", value: "+10K" },
    { label: "Uptime", value: "99.9%" },
    { label: "Organizations", value: "50+" },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-[var(--vv-sand)] px-6 pb-24 pt-28 text-[var(--vv-ink)]">
      <section className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ember)]">About VoteVerse</p>
        <h1 className="font-display mt-3 text-4xl font-semibold md:text-5xl">
          The modern standard for transparent elections.
        </h1>
        <p className="mt-5 max-w-3xl text-base text-[var(--vv-ink-2)]/75">
          VoteVerse is built to make every election feel calm, secure, and easy to trust. We combine strong verification,
          real-time results, and accessible interfaces for teams and communities that want confidence over chaos.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-black/10 bg-white px-6 py-5 shadow-xl shadow-black/5">
              <div className="font-display text-2xl font-semibold">{stat.value}</div>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[var(--vv-ink-2)]/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <motion.section
        className="mx-auto mt-16 max-w-6xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-2xl shadow-black/10">
            <h2 className="font-display text-3xl font-semibold">Our mission</h2>
            <p className="mt-4 text-sm text-[var(--vv-ink-2)]/75">
              We empower every voter to participate confidently from anywhere. Our platform prioritizes transparency
              without sacrificing usability, so elections stay credible and human.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                "End-to-end encrypted voting",
                "Real-time results with audit trails",
                "Inclusive design for every device",
                "Instant communication with voters",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3 text-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 bg-[var(--vv-ink)] p-8 text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-gold)]">Our principles</p>
            <div className="mt-6 grid gap-3">
              {coreValues.map((value) => (
                <div key={value} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
                  {value}
                </div>
              ))}
            </div>
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
        <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-2xl shadow-black/5">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ember)]">Technology</p>
              <h2 className="font-display mt-3 text-3xl font-semibold">Built on a trusted stack</h2>
            </div>
            <p className="max-w-lg text-sm text-[var(--vv-ink-2)]/75">
              We rely on proven tools to keep VoteVerse fast, reliable, and secure while scaling for large elections.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-black/10 bg-[var(--vv-sand)] px-4 py-2 text-xs font-semibold text-[var(--vv-ink)]"
              >
                {tech}
              </span>
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
        <div className="grid gap-8 md:grid-cols-[1fr_0.9fr]">
          <div className="rounded-3xl border border-black/10 bg-white p-8">
            <h2 className="font-display text-3xl font-semibold">A note from the founder</h2>
            <blockquote className="mt-4 text-sm text-[var(--vv-ink-2)]/75">
              “We believe voting should be as secure as your bank and as easy as your favorite app.”
            </blockquote>
            <p className="mt-4 text-sm font-semibold text-[var(--vv-ink)]">— Arbab Arshad</p>
          </div>
          <div className="rounded-3xl border border-black/10 bg-[var(--vv-ink)] p-8 text-white">
            <h3 className="font-display text-2xl font-semibold">Join the community</h3>
            <p className="mt-3 text-sm text-white/70">
              Follow the journey, contribute ideas, and help us keep democracy transparent.
            </p>
            <div className="mt-6 flex items-center gap-4 text-2xl">
              <a
                href="https://github.com/Arbab-ofc"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/20 p-3 hover:bg-white/10"
              >
                <FaGithub />
              </a>
              <a
                href="mailto:arbababby111@gmail.com"
                className="rounded-full border border-white/20 p-3 hover:bg-white/10"
              >
                <FaEnvelope />
              </a>
              <a
                href="https://www.linkedin.com/in/arbab-arshad-0b2961326/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/20 p-3 hover:bg-white/10"
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

import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="border-t-2 border-black/80 bg-[var(--vv-ink)] text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid items-stretch gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="h-full rounded-[24px] border-2 border-black/80 bg-white/10 p-6 shadow-[10px_10px_0_#111827]">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--vv-gold)]">VoteVerse</p>
              <h3 className="font-display mt-3 text-2xl font-semibold">Run elections with clarity.</h3>
              <p className="mt-3 text-sm text-white/85">
                Secure, audited, and beautifully simple voting for teams, communities, and institutions.
              </p>
              <div className="mt-auto flex flex-wrap gap-2 pt-6 text-[10px] uppercase tracking-[0.2em] text-white/85">
                <span className="rounded-full border border-white/40 px-3 py-1">Trusted</span>
                <span className="rounded-full border border-white/40 px-3 py-1">Audited</span>
                <span className="rounded-full border border-white/40 px-3 py-1">Realtime</span>
              </div>
          </div>

          <div className="h-full rounded-[24px] border-2 border-black/80 bg-white/10 p-6 shadow-[10px_10px_0_#111827]">
            <p className="text-xs uppercase tracking-[0.3em] text-white/80">Navigate</p>
            <div className="mt-4 space-y-2 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Dashboard", href: "/dashboard" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block rounded-full border-2 border-black/80 bg-white/10 px-4 py-2 text-white/90 shadow-[6px_6px_0_#111827] transition hover:-translate-y-0.5 hover:text-white hover:shadow-[8px_8px_0_#111827]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="h-full rounded-[24px] border-2 border-black/80 bg-white/10 p-6 shadow-[10px_10px_0_#111827]">
            <p className="text-xs uppercase tracking-[0.3em] text-white/80">Connect</p>
            <div className="mt-4 space-y-3 text-sm text-white/90">
              <a
                href="mailto:arbababby111@gmail.com"
                className="flex items-center gap-3 rounded-full border-2 border-black/80 bg-white/10 px-4 py-2 shadow-[6px_6px_0_#111827] transition hover:-translate-y-0.5 hover:text-white hover:shadow-[8px_8px_0_#111827]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                  <MdEmail />
                </span>
                arbababby111@gmail.com
              </a>
              <a
                href="https://github.com/Arbab-ofc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-full border-2 border-black/80 bg-white/10 px-4 py-2 shadow-[6px_6px_0_#111827] transition hover:-translate-y-0.5 hover:text-white hover:shadow-[8px_8px_0_#111827]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                  <FaGithub />
                </span>
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/arbab-arshad-0b2961326/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-full border-2 border-black/80 bg-white/10 px-4 py-2 shadow-[6px_6px_0_#111827] transition hover:-translate-y-0.5 hover:text-white hover:shadow-[8px_8px_0_#111827]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                  <FaLinkedin />
                </span>
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/60 md:flex-row md:items-center">
          <span>© 2026 VoteVerse. All rights reserved.</span>
          <span>Designed & built by Arbab.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

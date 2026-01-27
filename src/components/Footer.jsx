import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="border-t border-black/10 bg-[var(--vv-ink)] text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-gold)]">VoteVerse</p>
            <h3 className="font-display mt-3 text-2xl font-semibold">Run elections with clarity.</h3>
            <p className="mt-3 text-sm text-white/70">
              Secure, audited, and beautifully simple voting for teams, communities, and institutions.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Navigate</p>
            <div className="mt-4 space-y-2 text-sm">
              <a href="/" className="block text-white/80 hover:text-white">
                Home
              </a>
              <a href="/about" className="block text-white/80 hover:text-white">
                About
              </a>
              <a href="/contact" className="block text-white/80 hover:text-white">
                Contact
              </a>
              <a href="/dashboard" className="block text-white/80 hover:text-white">
                Dashboard
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Connect</p>
            <div className="mt-4 space-y-3 text-sm text-white/80">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                  <MdEmail />
                </span>
                <a href="mailto:arbababby111@gmail.com" className="hover:text-white">
                  arbababby111@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                  <FaGithub />
                </span>
                <a
                  href="https://github.com/Arbab-ofc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  GitHub
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                  <FaLinkedin />
                </span>
                <a
                  href="https://www.linkedin.com/in/arbab-arshad-0b2961326/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  LinkedIn
                </a>
              </div>
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

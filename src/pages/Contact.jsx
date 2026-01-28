import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Mail, Phone, MapPin } from "lucide-react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      toast.error("All fields are required");
      return;
    }

    try {
      const { data } = await axios.post("/api/v2/contact", formData);
      if (data?.success) {
        toast.success(data?.message || "Message submitted successfully");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(data?.message || "Failed to submit message");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to submit message");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--vv-sand)] px-6 pb-24 pt-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ember)]">Contact</p>
            <h1 className="font-display mt-3 text-4xl font-semibold text-[var(--vv-ink)] md:text-5xl">
              Let’s build a trusted election together.
            </h1>
            <p className="mt-4 max-w-xl text-base text-[var(--vv-ink-2)]/75">
              We respond quickly and keep things human. Share your goal, timeline, and any constraints — we’ll map the best path.
            </p>

            <div className="mt-10 space-y-4">
              <div className="rounded-[24px] border-2 border-black/80 bg-white p-5 shadow-[10px_10px_0_#111827]">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--vv-sand)] text-[var(--vv-ember)]">
                    <Mail />
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--vv-ink)]">Email</h4>
                    <a href="mailto:arbababby111@gmail.com" className="text-sm text-[var(--vv-ink-2)]/70 hover:text-[var(--vv-ink)]">
                      arbababby111@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border-2 border-black/80 bg-white p-5 shadow-[10px_10px_0_#111827]">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--vv-sand)] text-[var(--vv-ember)]">
                    <Phone />
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--vv-ink)]">Phone</h4>
                    <p className="text-sm text-[var(--vv-ink-2)]/70">+91 73670 84034</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border-2 border-black/80 bg-white p-5 shadow-[10px_10px_0_#111827]">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--vv-sand)] text-[var(--vv-ember)]">
                    <MapPin />
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--vv-ink)]">Location</h4>
                    <p className="text-sm text-[var(--vv-ink-2)]/70">Delhi, India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[28px] border-2 border-black/80 bg-white p-8 shadow-[12px_12px_0_#111827]"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ember)]">Send a message</p>
            <h2 className="font-display mt-3 text-2xl font-semibold text-[var(--vv-ink)]">
              Tell us what you need.
            </h2>

            <div className="mt-8 space-y-5">
              <div>
                <label className="text-xs font-semibold text-[var(--vv-ink-2)]/70">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3 text-sm focus:border-[var(--vv-ink)] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--vv-ink-2)]/70">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3 text-sm focus:border-[var(--vv-ink)] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--vv-ink-2)]/70">Message</label>
                <textarea
                  name="message"
                  placeholder="Tell us about your election goals..."
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-2 w-full resize-none rounded-2xl border border-black/10 bg-[var(--vv-sand)] px-4 py-3 text-sm focus:border-[var(--vv-ink)] focus:outline-none"
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              className="mt-8 w-full rounded-full border-2 border-black/80 bg-[var(--vv-ink)] px-6 py-3 text-sm font-semibold text-white shadow-[6px_6px_0_#111827] transition hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#111827]"
            >
              Send message
            </button>

            <p className="mt-4 text-center text-xs text-[var(--vv-ink-2)]/60">
              We reply within 24 hours on business days.
            </p>
          </form>
        </div>
      </div>

      <ToastContainer position="top-center" theme="colored" />
    </div>
  );
};

export default Contact;

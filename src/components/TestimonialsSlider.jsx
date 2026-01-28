import React, { useEffect, useRef, useState } from 'react';
import { FaStar, FaChevronLeft, FaChevronRight, FaCheckCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';

const testimonials = [
  {
    name: 'Aarav Sharma',
    role: 'Student',
    rating: 5,
    message: 'VoteVerse made my first voting experience seamless and secure!',
  },
  {
    name: 'Neha Verma',
    role: 'Software Engineer',
    rating: 4,
    message: 'A revolutionary way to bring trust and transparency to elections.',
  },
  {
    name: 'Rohan Singh',
    role: 'Teacher',
    rating: 5,
    message: 'Impressed by the security and simplicity of the platform.',
  },
  {
    name: 'Sanya Kapoor',
    role: 'Designer',
    rating: 4,
    message: 'Clean UI and trustworthy system. Loved it!',
  },
  {
    name: 'Vikram Malhotra',
    role: 'Entrepreneur',
    rating: 5,
    message: 'Finally a voting system I can trust!',
  },
  {
    name: 'Priya Nair',
    role: 'Doctor',
    rating: 4,
    message: 'Very intuitive and secure. Great job!',
  },
  {
    name: 'Kunal Joshi',
    role: 'Student',
    rating: 5,
    message: 'Voting made so simple and reliable. Highly recommend.',
  },
];

const TestimonialsSlider = () => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  const nextSlide = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    timeoutRef.current = setInterval(nextSlide, 6000);
    return () => clearInterval(timeoutRef.current);
  }, [index]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const sideCards = [0, 1, 2].map((offset) => testimonials[(index + offset) % testimonials.length]);

  return (
    <section className="relative overflow-hidden px-6 py-20" {...swipeHandlers}>
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-[var(--vv-sage)]/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[var(--vv-ember)]/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--vv-ember)]">Testimonials</p>
            <h2 className="font-display mt-3 text-3xl font-semibold text-[var(--vv-ink)] md:text-4xl">
              Trusted by voters who expect transparency.
            </h2>
          </div>
          <div className="flex items-center gap-3 text-sm text-[var(--vv-ink-2)]/70">
            <span className="rounded-full border border-black/10 bg-white px-3 py-1">{index + 1} / {testimonials.length}</span>
            <div className="flex gap-1">
              {testimonials.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-6 rounded-full transition ${i === index ? 'bg-[var(--vv-ink)]' : 'bg-black/10'}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_240px]">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="absolute -left-3 top-3 hidden h-full w-full rounded-[24px] border-2 border-black/80 bg-[var(--vv-sand)] shadow-[10px_10px_0_#111827] sm:block" />
                <div className="relative rounded-[24px] border-2 border-black/80 bg-white p-8 shadow-[10px_10px_0_#111827] transition duration-300 hover:-translate-y-1 hover:shadow-[14px_14px_0_#111827] sm:rounded-[28px] sm:shadow-[12px_12px_0_#111827]">
                  <div className="pointer-events-none absolute inset-0 rounded-[26px] border border-black/10" />
                  <div className="absolute left-8 top-0 h-1.5 w-20 rounded-b-full bg-[linear-gradient(90deg,var(--vv-ember),var(--vv-gold))]" />
                  <div className="flex flex-col gap-6 md:flex-row md:items-center">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-display text-xl font-semibold">{testimonials[index].name}</h3>
                          <span className="inline-flex items-center gap-1 rounded-full border border-[var(--vv-ember)]/30 bg-[var(--vv-sand)] px-2 py-1 text-[11px] font-semibold text-[var(--vv-ink)]">
                            <FaCheckCircle className="text-[var(--vv-ember)]" />
                            Verified
                          </span>
                        </div>
                        <p className="text-sm text-[var(--vv-ink-2)]/70">{testimonials[index].role}</p>
                        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-[11px] font-semibold text-[var(--vv-ink-2)]">
                          <div className="flex text-[var(--vv-gold)]">
                            {[...Array(testimonials[index].rating)].map((_, i) => (
                              <FaStar key={i} />
                            ))}
                          </div>
                          Rated by verified users
                        </div>
                      </div>
                    </div>
                    <div className="md:flex-1 md:pl-6">
                      <p className="text-base text-[var(--vv-ink-2)]/80">
                        “{testimonials[index].message}”
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={prevSlide}
                className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[var(--vv-ink)] hover:-translate-y-0.5"
              >
                <FaChevronLeft />
                Previous
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="flex items-center gap-2 rounded-full bg-[var(--vv-ink)] px-4 py-2 text-sm font-semibold text-white hover:-translate-y-0.5"
              >
                Next
                <FaChevronRight />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {sideCards.map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border-2 border-black/80 bg-white px-4 py-3 text-sm shadow-[6px_6px_0_#111827]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[var(--vv-ink)]">{item.name}</p>
                    <p className="text-xs text-[var(--vv-ink-2)]/70">{item.role}</p>
                  </div>
                  <span className="rounded-full border border-black/10 bg-[var(--vv-sand)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--vv-ink-2)]/70">Live</span>
                </div>
                <p className="mt-3 text-xs text-[var(--vv-ink-2)]/70">“{item.message}”</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;

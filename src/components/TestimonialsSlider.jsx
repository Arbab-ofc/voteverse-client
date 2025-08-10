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
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Neha Verma',
    role: 'Software Engineer',
    rating: 4,
    message: 'A revolutionary way to bring trust and transparency to elections.',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    name: 'Rohan Singh',
    role: 'Teacher',
    rating: 5,
    message: 'Impressed by the security and simplicity of the platform.',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    name: 'Sanya Kapoor',
    role: 'Designer',
    rating: 4,
    message: 'Clean UI and trustworthy system. Loved it!',
    image: 'https://randomuser.me/api/portraits/women/47.jpg',
  },
  {
    name: 'Vikram Malhotra',
    role: 'Entrepreneur',
    rating: 5,
    message: 'Finally a voting system I can trust!',
    image: 'https://randomuser.me/api/portraits/men/91.jpg',
  },
  {
    name: 'Priya Nair',
    role: 'Doctor',
    rating: 4,
    message: 'Very intuitive and secure. Great job!',
    image: 'https://randomuser.me/api/portraits/women/23.jpg',
  },
  {
    name: 'Kunal Joshi',
    role: 'Student',
    rating: 5,
    message: 'Voting made so simple and reliable. Highly recommend.',
    image: 'https://randomuser.me/api/portraits/men/12.jpg',
  },
];

const TestimonialsSlider = () => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  const nextSlide = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    timeoutRef.current = setInterval(nextSlide, 5000);
    return () => clearInterval(timeoutRef.current);
  }, [index]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div className="relative w-full overflow-hidden py-10 px-4" {...swipeHandlers}>
      <h2 className="text-3xl font-bold text-center mb-8">What People Are Saying</h2>
      <div className="flex items-center justify-center space-x-4">
        <button onClick={prevSlide} className="text-gray-700 hover:text-black">
          <FaChevronLeft size={24} />
        </button>

        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg p-6 text-center"
            >
              <img
                src={testimonials[index].image}
                alt={testimonials[index].name}
                className="w-16 h-16 rounded-full mx-auto mb-3"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                {testimonials[index].name}
                <span className="ml-2 text-blue-500 text-sm inline-flex items-center">
                  <FaCheckCircle className="mr-1" /> Verified Voter
                </span>
              </h3>
              <p className="text-sm text-gray-500 mb-2">{testimonials[index].role}</p>
              <div className="flex justify-center text-yellow-400 mb-2">
                {[...Array(testimonials[index].rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <motion.p
                key={testimonials[index].message}
                className="text-gray-700 italic"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                \"{testimonials[index].message}\"
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        <button onClick={nextSlide} className="text-gray-700 hover:text-black">
          <FaChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default TestimonialsSlider;

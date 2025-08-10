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

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white px-6 py-12 space-y-20">
      <section className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 pt-12">Who We Are</h2>
        <p className="text-lg text-gray-300">
          VoteVerse is a visionary platform committed to redefining the democratic experience
          through secure, transparent, and accessible digital voting solutions.
        </p>
      </section>

      <section className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
        <p className="text-lg text-gray-300">
          Our mission is to empower every individual with the ability to cast their vote safely and confidently
          from anywhere in the world. We aim to restore trust in elections by combining transparency with modern technology.
        </p>
      </section>

      <motion.section
        className="max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <h2 className="text-4xl font-bold text-center mb-8">Why VoteVerse?</h2>
        <ul className="grid md:grid-cols-2 gap-6 text-gray-200 text-lg">
          <li>🔐 End-to-end encrypted voting system</li>
          <li>📊 Real-time results with full transparency</li>
          <li>📱 Accessible from any device, anywhere</li>
          <li>👥 Designed with inclusivity and usability in mind</li>
        </ul>
      </motion.section>

      <motion.section
        className="max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <h2 className="text-4xl font-bold text-center mb-8">Our Core Values</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {coreValues.map((value, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, boxShadow: "0 0 20px #facc15" }}
              className="bg-gray-800 p-4 rounded-xl text-center text-lg font-semibold hover:text-yellow-300 transition"
            >
              {value}
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <h2 className="text-4xl font-bold text-center mb-8">Behind the Tech</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {techStack.map((tech, index) => (
            <motion.span
              key={index}
              whileHover={{ scale: 1.1, boxShadow: "0 0 20px #60a5fa" }}
              className="px-4 py-2 bg-gray-800 rounded-full text-sm font-medium hover:text-blue-400 transition"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.section>

      <section className="max-w-5xl mx-auto text-center space-y-8">
        <h2 className="text-4xl font-bold">Fun Facts</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-gray-200">
          <div className="bg-gray-800 p-6 rounded-xl">
            <p className="text-3xl font-bold text-yellow-400">2025</p>
            <p>Launch Year</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            <p className="text-3xl font-bold text-yellow-400">+10K</p>
            <p>Votes Cast</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            <p className="text-3xl font-bold text-yellow-400">99.9%</p>
            <p>Uptime</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            <p className="text-3xl font-bold text-yellow-400">50+</p>
            <p>Organizations Onboard</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto text-center space-y-6">
        <blockquote className="italic text-gray-300 text-lg">
          “We believe voting should be as secure as your bank and as easy as your favorite app.”
        </blockquote>
        <p className="text-yellow-300 font-semibold">— Arbab Arshad , VoteVerse</p>
      </section>

      <section className="max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-bold">Join the Community</h2>
        <div className="flex justify-center gap-6">
          <motion.a
            href="https://github.com"
            whileHover={{ scale: 1.2, color: "#facc15" }}
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl text-white hover:text-yellow-400 transition duration-300"
          >
            <FaGithub />
          </motion.a>
          <motion.a
            href="mailto:contact@voteverse.com"
            whileHover={{ scale: 1.2, color: "#facc15" }}
            className="text-3xl text-white hover:text-yellow-400 transition duration-300"
          >
            <FaEnvelope />
          </motion.a>
          <motion.a
            href="https://linkedin.com"
            whileHover={{ scale: 1.2, color: "#facc15" }}
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl text-white hover:text-yellow-400 transition duration-300"
          >
            <FaLinkedin />
          </motion.a>
        </div>
      </section>
    </div>
  );
};

export default About;

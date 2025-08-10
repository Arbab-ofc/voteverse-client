import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import TestimonialsSlider from '../components/TestimonialsSlider';
import { useNavigate } from 'react-router-dom';

const features = [
  'Secure & Transparent Voting',
  'Real-time Results',
  'User-Friendly Interface',
  'Multi-device Access',
];

const steps = [
  'Sign Up and Verify Email',
  'Log in to Your Account',
  'Access Your Ballot',
  'Cast Your Vote',
  'Get Confirmation',
];

const faqs = [
  {
    question: 'Is VoteVerse secure?',
    answer: 'Yes, we use top-level encryption and verification techniques to ensure voting integrity.',
  },
  {
    question: 'Can I vote from my phone?',
    answer: 'Absolutely! VoteVerse is responsive and works on all devices.',
  },
  {
    question: 'How do I verify my vote?',
    answer: 'After voting, you’ll receive a secure confirmation. You can verify in your profile.',
  },
];

const Home = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate('/register');
  };
  return (
    <div className="overflow-x-hidden">

      
      <section className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-24 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Welcome to VoteVerse
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl mb-6 max-w-2xl mx-auto"
        >
          Revolutionizing digital voting with security, transparency, and ease.
        </motion.p>
        <motion.a
          onClick={handleGetStarted}
          whileHover={{ scale: 1.05 }}
          className="inline-block bg-yellow-400 text-black font-semibold py-3 px-6 rounded-md shadow-md"
        >
          Get Started
        </motion.a>
      </section>

      
      <section className="py-20 px-6 text-center bg-white">
        <h2 className="text-3xl font-bold mb-10">What Makes VoteVerse Awesome</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-gray-100 p-6 rounded-xl shadow-sm"
            >
              <FaCheckCircle className="text-yellow-500 text-3xl mx-auto mb-4" />
              <p className="text-gray-800 font-medium">{feature}</p>
            </motion.div>
          ))}
        </div>
      </section>

      
      <section className="py-20 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-white shadow-md rounded-lg px-6 py-4 text-center w-60"
            >
              <div className="text-4xl font-bold text-yellow-500 mb-2">{i + 1}</div>
              <p className="text-gray-800">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>

      
      <section className="py-20 px-6 bg-gradient-to-r from-black via-gray-900 to-black text-white text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Empower Your Vote?</h2>
        <p className="text-lg mb-8">Join the digital democracy with VoteVerse today.</p>
        <a
          href="/register"
          className="inline-block bg-yellow-400 text-black font-semibold py-3 px-6 rounded-md shadow-md"
        >
          Create Account
        </a>
      </section>

      
      <TestimonialsSlider />

      
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold mb-10">Frequently Asked Questions</h2>
        <div className="max-w-4xl mx-auto space-y-6 text-left">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border-b pb-4"
            >
              <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
              <p className="text-gray-700">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;

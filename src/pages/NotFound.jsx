import React, { useEffect } from 'react';
import { FaSearch, FaSmile, FaCheckCircle, FaRocket } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotFound = () => {
  useEffect(() => {
    toast.info("Oops! The page you're looking for isn't here.");
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100 overflow-hidden flex flex-col items-center justify-center px-4 text-gray-700 pt-25">
      
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-indigo-200 opacity-20 animate-bubble"
            style={{
              width: `${20 + Math.random() * 60}px`,
              height: `${20 + Math.random() * 60}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 15}s`,
            }}
          />
        ))}
      </div>

      
      <div className="mb-6 flex flex-col items-center animate-bounce-slow">
        <FaSearch size={96} className="text-indigo-400 mb-2" />
        <h1 className="text-5xl font-extrabold tracking-wide select-none">
          404 - Not Found
        </h1>
      </div>

      
      <blockquote className="max-w-xl text-center text-lg italic text-indigo-700 mb-10 px-4">
        "Sometimes the best way to find yourself is to lose your way."
      </blockquote>

      
      <section className="max-w-4xl w-full bg-white bg-opacity-50 rounded-xl p-8 shadow-lg space-y-10 text-gray-800">
        <div>
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
            <FaRocket className="text-indigo-500" /> About This Website
          </h2>
          <p className="leading-relaxed">
            This website is designed to provide you with a seamless and intuitive experience in managing elections. Whether you're organizing a small community vote or a large-scale election, our platform offers the tools and insights you need to succeed.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
            <FaCheckCircle className="text-green-500" /> Why Choose Us?
          </h2>
          <ul className="list-disc list-inside space-y-2 leading-relaxed">
            <li>Easy to use with an intuitive interface.</li>
            <li>Secure and reliable voting system.</li>
            <li>Real-time results and analytics.</li>
            <li>Responsive design that works on any device.</li>
            <li>Dedicated support team to assist you anytime.</li>
          </ul>
        </div>
      </section>

      
      <footer className="mt-12 w-full max-w-4xl flex justify-center items-center gap-6 px-4">
        
        <div className="flex items-center gap-3 sm:flex md:hidden">
          <FaSmile size={28} className="text-indigo-600 mb-14" />
          <span className="font-semibold text-indigo-700 text-lg pb-14">Your Trusted Election Platform</span>
        </div>

        
        
      </footer>

      <ToastContainer
        position="top-center"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      
      <style>{`
        @keyframes bubble {
          0% {
            transform: translateY(100%) scale(0.5);
            opacity: 0;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-150%) scale(1);
            opacity: 0;
          }
        }
        .animate-bubble {
          animation-name: bubble;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;

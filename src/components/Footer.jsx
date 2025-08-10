import React from 'react';
import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import Typewriter from 'typewriter-effect';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-6 px-4 ">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        <div className="text-center md:text-left">
          <Typewriter
            options={{
              strings: [
                '© 2025 VoteVerse. All rights reserved.',
                'Designed & Created by Arbab ❤️'
              ],
              autoStart: true,
              loop: true,
              deleteSpeed: 50
            }}
          />
        </div>

        <div className="flex gap-6 text-2xl">
          <a
            href="https://github.com/Arbab-ofc"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors duration-300"
          >
            <FaGithub className="hover:text-purple-500" />
          </a>
          <a
            href="arbababby111@gmail.com"
            className="hover:text-gray-400 transition-colors duration-300"
          >
            <MdEmail className="hover:text-red-500" />
          </a>
          <a
            href="https://www.linkedin.com/in/arbab-arshad-0b2961326/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors duration-300"
          >
            <FaLinkedin className="hover:text-blue-500" />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

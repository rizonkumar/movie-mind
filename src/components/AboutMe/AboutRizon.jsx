import React from "react";
import { Link } from "react-router-dom";

const AboutRizon = () => {
  return (
    <div className="bg-gradient-to-br from-[#1F1E24] to-[#2C2B33] text-white min-h-screen p-4 sm:p-8">
      <Link
        to="/"
        className="text-xl sm:text-2xl text-[#6556CD] hover:text-white mb-6 inline-block transition-colors duration-300"
      >
        <i className="ri-arrow-left-line mr-2"></i>Back to Home
      </Link>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
          About Rizon
        </h1>

        <div className="space-y-8">
          <p className="text-lg sm:text-xl text-center bg-[#2A2935] p-4 rounded-lg shadow-md">
            A passionate and enthusiastic programmer with an appetite for
            learning and exploring new technologies.
          </p>

          <div className="bg-[#2A2935] p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <i className="ri-code-s-slash-line mr-2 text-[#6556CD]"></i>Skills
            </h2>
            <ul className="space-y-2">
              <li>
                <i className="ri-translate-2 mr-2 text-yellow-500"></i>
                <strong>Languages:</strong> C++, Java, JavaScript & Python
              </li>
              <li>
                <i className="ri-global-line mr-2 text-blue-500"></i>
                <strong>Web:</strong> Salesforce Commerce Cloud (SFCC),
                Javascript, React, Node.js, Next.js, Hono, & Tailwind CSS
              </li>
              <li>
                <i className="ri-database-2-line mr-2 text-green-500"></i>
                <strong>Database:</strong> MongoDB, Prisma ORM, PostgreSQL
              </li>
            </ul>
          </div>

          <div className="bg-[#2A2935] p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <i className="ri-trophy-line mr-2 text-[#6556CD]"></i>Achievements
            </h2>
            <ul className="space-y-2">
              <li>
                <i className="ri-medal-line mr-2 text-yellow-500"></i>Ranked 96
                Worldwide in LeetCode Contest (Weekly 294)
              </li>
              <li>
                <i className="ri-code-box-line mr-2 text-blue-500"></i>Solved
                600+ problems on LeetCode
              </li>
              <li>
                <i className="ri-line-chart-line mr-2 text-green-500"></i>1000+
                Problem Points on GeeksforGeeks with Ranking #1 in College
              </li>
              <li>
                <i className="ri-cloud-line mr-2 text-purple-500"></i>Certified
                B2C Commerce Developer
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-[#2A2935] p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <i className="ri-briefcase-4-line mr-2 text-[#6556CD]"></i>
                Current Work
              </h2>
              <p>
                <i className="ri-building-2-line mr-2 text-blue-500"></i>Working
                at Merkle, A Dentsu company since July 2022.
              </p>
            </div>

            <div className="bg-[#2A2935] p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <i className="ri-graduation-cap-line mr-2 text-[#6556CD]"></i>
                Education
              </h2>
              <p>
                <i className="ri-school-line mr-2 text-green-500"></i>B.Tech in
                Computer Science Engineering from SRM - Chennai
              </p>
            </div>
          </div>

          <div className="bg-[#2A2935] p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <i className="ri-heart-3-line mr-2 text-[#6556CD]"></i>Hobbies
            </h2>
            <ul className="flex flex-wrap gap-4">
              <li>
                <i className="ri-cricket-line mr-1 text-yellow-500"></i>Cricket
              </li>
              <li>
                <i className="ri-gamepad-line mr-1 text-blue-500"></i>PUBG
                Esports
              </li>
              <li>
                <i className="ri-smartphone-line mr-1 text-green-500"></i>Tech
                Gadgets
              </li>
            </ul>
          </div>

          <div className="bg-[#2A2935] p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <i className="ri-links-line mr-2 text-[#6556CD]"></i>Connect with
              Rizon
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="https://www.linkedin.com/in/rizonkumarrahi/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
              >
                <i className="ri-linkedin-box-fill text-4xl"></i>
              </a>
              <a
                href="https://x.com/RizonKumar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300 transition-colors duration-300"
              >
                <i className="ri-twitter-x-fill text-4xl"></i>
              </a>
              <a
                href="https://github.com/rizonkumar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300 transition-colors duration-300"
              >
                <i className="ri-github-fill text-4xl"></i>
              </a>
              <a
                href="https://www.facebook.com/your.rizonkumarrahi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-500 transition-colors duration-300"
              >
                <i className="ri-facebook-circle-fill text-4xl"></i>
              </a>
              <a
                href="https://www.instagram.com/rizon__kumar/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-500 transition-colors duration-300"
              >
                <i className="ri-instagram-fill text-4xl"></i>
              </a>
            </div>
          </div>

          <div className="bg-[#2A2935] p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <i className="ri-contacts-book-2-line mr-2 text-[#6556CD]"></i>
              Contact
            </h2>
            <p>
              <i className="ri-mail-line mr-2 text-yellow-500"></i>Email:
              rizon.kumar.rahi@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutRizon;

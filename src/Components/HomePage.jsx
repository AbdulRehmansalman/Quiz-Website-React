// src/Components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/mainpage.jpg';

const HomePage = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        opacity: 0.8,
      }}
    >
      <Link to="/quiz">
        <button className="absolute bottom-9 right-2 px-5 py-4 text-4xl text-bold bg-blue-800 text-white rounded-lg shadow-lg hover:bg-red-500 transition duration-300">
          Start the Quiz.........
        </button>
      </Link>
    </div>
  );
};

export default HomePage;

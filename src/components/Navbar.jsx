import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/search" className="text-xl font-bold">NASA Image Explorer</Link>
      </div>
    </nav>
  );
};

export default Navbar;
import React from 'react';
import UserList from './components/UserList';
import Leaderboard from './components/Leaderboard';
import ClaimHistory from './components/ClaimHistory';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-green-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8 drop-shadow-md">
          🏆 Leaderboard Portal
        </h1>
        <div className="space-y-8">
          <UserList />
          <Leaderboard />
          <ClaimHistory />
        </div>
      </div>
    </div>
  );
};

export default App;

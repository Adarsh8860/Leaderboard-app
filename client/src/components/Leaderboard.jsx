import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get('https://leaderboard-app-6bay.onrender.com/api/users');
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
    const interval = setInterval(fetchUsers, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white bg-opacity-50 rounded-2xl shadow-xl p-6 backdrop-blur">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">🏆 Live Leaderboard</h2>
      <table className="w-full table-auto text-center border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-blue-200 text-gray-800">
          <tr>
            <th className="p-3">🥇 Rank</th>
            <th className="p-3">👤 Name</th>
            <th className="p-3">⭐ Points</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="hover:bg-gray-100 transition">
              <td className="p-2 font-semibold">{u.rank}</td>
              <td className="p-2">{u.name}</td>
              <td className="p-2 text-blue-700 font-bold">{u.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;

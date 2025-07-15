import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClaimHistory = () => {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    const res = await axios.get('http://localhost:5000/api/users/history');
    setHistory(res.data);
  };

  useEffect(() => {
    fetchHistory();
    const interval = setInterval(fetchHistory, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white bg-opacity-50 rounded-2xl shadow-xl p-6 backdrop-blur">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">📜 Claim History</h2>
      <table className="w-full table-auto text-center border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-green-200 text-gray-800">
          <tr>
            <th className="p-3">👤 User</th>
            <th className="p-3">🎯 Points</th>
            <th className="p-3">⏰ Time</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h) => (
            <tr key={h._id} className="hover:bg-gray-100 transition">
              <td className="p-2">{h.userId.name}</td>
              <td className="p-2 text-green-700 font-bold">+{h.pointsClaimed}</td>
              <td className="p-2 text-sm text-gray-500">{new Date(h.claimedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClaimHistory;

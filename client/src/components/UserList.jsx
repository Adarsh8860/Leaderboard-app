import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState('');
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/api/users');
    setUsers(res.data);
  };

  const addUser = async () => {
    if (name.trim()) {
      await axios.post('http://localhost:5000/api/users/add', { name });
      setName('');
      fetchUsers();
    }
  };

  const claimPoints = async () => {
    if (!selected) return;
    const res = await axios.post('http://localhost:5000/api/users/claim', { userId: selected });
    setMsg(`🎉 ${res.data.user.name} got +${res.data.pointsClaimed} points!`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-white bg-opacity-50 rounded-2xl shadow-xl p-6 backdrop-blur">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">👥 Manage Users</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <select
          onChange={(e) => setSelected(e.target.value)}
          className="flex-1 p-2 rounded-lg border focus:outline-none focus:ring-2"
        >
          <option value="">🎯 Select User</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>{u.name}</option>
          ))}
        </select>
        <button
          onClick={claimPoints}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Claim Points
        </button>
      </div>

      {msg && <div className="text-green-700 font-medium mb-3">{msg}</div>}

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="➕ Add New User"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 p-2 rounded-lg border focus:outline-none focus:ring-2"
        />
        <button
          onClick={addUser}
          className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
        >
          Add User
        </button>
      </div>
    </div>
  );
};

export default UserList;

import { useState } from 'react';

export default function App() {
  const [userData, setUserData] = useState({ name: '', interests: '' });
  const [avatarMatch, setAvatarMatch] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const match = await response.json();
    setAvatarMatch(match);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Your Avatar</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Name:</label>
        <input
          type="text"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Interests:</label>
        <input
          type="text"
          value={userData.interests}
          onChange={(e) => setUserData({ ...userData, interests: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>
      <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">
        Create Avatar & Find Match
      </button>
      {avatarMatch && (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <h2 className="text-xl">Match Found!</h2>
          <p>Avatar: {avatarMatch.name}</p>
          <p>Shared Interest: {avatarMatch.interests}</p>
        </div>
      )}
    </div>
  );
}
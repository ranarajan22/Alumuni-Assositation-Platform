import React, { useEffect, useState } from "react";
import axios from "axios";

const MentorshipList = () => {
  const [mentorships, setMentorships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8083/api/mentorships").then((res) => {
      setMentorships(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading mentorships...</p>;

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg m-4">
      <h2 className="text-2xl font-bold mb-4 text-secondary">Mentorship Opportunities</h2>
      {mentorships.length > 0 ? (
        <ul>
          {mentorships.map((m) => (
            <li key={m._id} className="mb-4 border border-gray-300 rounded-lg p-4">
              <h3 className="text-xl font-semibold text-secondary">{m.title}</h3>
              <p className="text-gray-600">{m.description}</p>
              <p className="text-gray-600"><strong>Date:</strong> {m.date} <strong>Time:</strong> {m.time}</p>
            </li>
          ))}
        </ul>
      ) : <p>No mentorships available.</p>}
    </div>
  );
};

export default MentorshipList;

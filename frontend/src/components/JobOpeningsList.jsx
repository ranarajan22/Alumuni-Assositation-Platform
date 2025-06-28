import React, { useEffect, useState } from "react";
import axios from "axios";

const JobOpeningsList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:8083/api/job-openings");
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching job openings:", err);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
        Job Opportunities
      </h2>

      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white shadow-md rounded-lg p-6 border hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {job.title}
              </h3>
              <p className="text-gray-700 mb-3">{job.description}</p>
              <p className="text-sm text-gray-500 mb-4">Posted on: {new Date(job.postedAt).toLocaleDateString()}</p>
              <a
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                View Job
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-10">No job openings available at the moment.</p>
      )}
    </div>
  );
};

export default JobOpeningsList;

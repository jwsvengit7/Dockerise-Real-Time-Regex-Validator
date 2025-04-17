import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './App.css'; // Import normal CSS

const socket = io('ws://localhost:3000');

interface Jobs {
  input: string;
  status: string;
  createdAt: string;
  _id: string;
  updatedAt: string;
}

const App = () => {
  const [input, setInput] = useState<string>('');
  const [jobs, setJobs] = useState<Jobs[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchJobs();
    socket.on('job-status', (updatedJob) => {
      setJobs((prev: Jobs[]) =>
        prev.map((job: Jobs) => (job._id === updatedJob.jobId ? updatedJob : job))
      );
    });
    return () => {
      socket.off('job-status');
    };
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:3000/jobs/');
      setJobs(res.data.data);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
    }
  };

  const submitJob = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/jobs/create', { input });
      setJobs((prev: Jobs[]) => [res.data.data, ...prev]);
      setInput('');
    } catch (err) {
      console.error('Submission failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="app-box">
        <h1 className="title">Real-Time Regex Validator</h1>

        <form onSubmit={submitJob} className="form">
          <input
            type="text"
            className="text-input"
            placeholder="Enter text to validate..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        <div className="jobs">
          <h2 className="subtitle">Job History</h2>
          <div className="job-list">
            {jobs.map((job) => (
              <div key={job._id} className="job-card">
                <p><strong>ID:</strong> {job._id}</p>
                <p><strong>Input:</strong> {job.input}</p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span
                    className={
                      job.status === 'Valid'
                        ? 'status valid'
                        : job.status === 'Invalid'
                        ? 'status invalid'
                        : 'status pending'
                    }
                  >
                    {job.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

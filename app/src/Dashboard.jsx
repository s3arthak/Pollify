import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
    const [polls, setPolls] = useState([]);

    useEffect(() => {
        const fetchPolls = async () => {
            try {
                const response = await axios.get('https://pollify-h0t9.onrender.com/api/polls'); // Use GET request
                setPolls(response.data);
            } catch (error) {
                console.log("Error fetching polls:", error);
            }
        };
        fetchPolls();
    }, []);

    return (
        <div className="dashboard-container">
            {/* Centered "Create Poll" Button */}
            <div className="create-poll-container">
                <Link to="/create" className="create-poll-button">
                    Create a New Poll
                </Link>
            </div>

            <h2>All Polls</h2>
            {polls.length === 0 ? (
                <p>No polls created</p>
            ) : (
                <div className="polls-grid">
                    {polls.map((poll) => (
                        <div key={poll._id} className="poll-item">
                            <Link to={`/poll/${poll._id}`} className="poll-link">
                                {poll.question}
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

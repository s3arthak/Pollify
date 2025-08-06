import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';  
import { BarChart, CartesianGrid, ResponsiveContainer, XAxis, Tooltip, Legend, Bar } from 'recharts';

const Details = () => {
    const { id } = useParams();
    const { user } = useAuth(); 
    const [poll, setPoll] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPoll = async () => {
            try {
                 const response = await axios.get(`https://pollify-h0t9.onrender.com/api/polls/${id}`);
                // const response = await axios.get(`http://localhost:5000/api/polls/${id}`);
                setPoll(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching poll with id", error);
                setLoading(false);
            }
        };
        fetchPoll();
        const pollInterval = setInterval(fetchPoll, 3000);
        return () => {
            clearInterval(pollInterval);
        };
    }, [id]);

    const handleVote = async () => {
        if (selectedOption == null) {
            alert('Please select an option');
            return;
        }

        const userId = user ? user.id : null;
        if (!userId) {
            alert("User not logged in.");
            return;
        }

        try {
             await axios.post(`https://pollify-h0t9.onrender.com/api/polls/${id}/vote`, {
          //  await axios.post(`http://localhost:5000/api/polls/${id}/vote`, {
                optionIndex: selectedOption,
                userId,
            });
            setMessage('Vote recorded successfully');
        } catch (error) {
            console.error("Error voting:", error);
            setMessage(error.response?.data?.message || "Error voting.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!poll) return <p>Poll not found</p>;

    const totalVotes = poll.options.reduce((total, option) => total + option.votes, 0);

    return (
        <div className="poll-details-container">
            <h2 className="poll-title">{poll.question}</h2>

            
            {poll.expiresAt && (
                <p className="poll-expiry">Expires on: {new Date(poll.expiresAt).toLocaleString()}</p>
            )}

            <div className="options-container">
                {poll.options.map((option, index) => {
                    const percentage = totalVotes === 0 ? 0 : ((option.votes / totalVotes) * 100).toFixed(2);
                    return (
                        <div key={index} className="option-item">
                            <label>
                                <input
                                    type="radio"
                                    name="pollOption"
                                    value={index}
                                    checked={selectedOption === index}
                                    onChange={() => setSelectedOption(index)}
                                />
                                {option.text} - Votes: {option.votes} - {percentage}%
                            </label>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: `${percentage}%` }}></div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <button className="vote-button" onClick={handleVote}>
                Vote
            </button>

            {message && <p className='message'>{message}</p>}

            <ResponsiveContainer width='100%' height={300}>
                <BarChart data={poll.options.map(option => ({
                    name: option.text,
                    votes: option.votes
                }))}>
                    <CartesianGrid strokeDashArray='3 3' />
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="votes" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Details;

import React, { useState } from 'react';
import axios from 'axios';

const CreatePoll = () => {
    const [useAI, setUseAI] = useState(false);
    const [topic, setTopic] = useState('');
    const [optionCount, setOptionCount] = useState(4);
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [expiresAt, setExpiresAt] = useState('');

    
    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };
    const addOption = () => setOptions([...options, '']);
    const removeOption = (index) => setOptions(options.filter((_, i) => i !== index));

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (useAI) {
                if (!topic.trim()) {
                    alert("Please enter a topic for AI poll.");
                    return;
                }
                response = await axios.post('https://pollify-h0t9.onrender.com/api/polls/create-ai', {
                    topic,
                    optionCount,
                    expiresAt: expiresAt ? new Date(expiresAt) : null,
                });
            } else {
                if (!question || options.filter(opt => opt.trim() !== '').length < 2) {
                    alert('Please provide a question and at least two non-empty options.');
                    return;
                }
                response = await axios.post('https://pollify-h0t9.onrender.com/api/polls/create', {
                    question,
                    options,
                    expiresAt: expiresAt ? new Date(expiresAt) : null,
                });
            }

            alert('Poll created successfully!');
            setQuestion('');
            setOptions(['', '']);
            setTopic('');
            setOptionCount(4);
            setExpiresAt('');
        } catch (err) {
            console.error('Error creating poll:', err);
            alert('Failed to create poll.');
        }
    };

    return (
        <div className="create-poll-container">
            <h2>Create a New Poll</h2>

            {/* Toggle AI / Manual */}
            <div className="toggle-container">
                <label className="toggle-label">
                    <input
                        type="checkbox"
                        checked={useAI}
                        onChange={(e) => setUseAI(e.target.checked)}
                    />
                    <span> Generate poll with AI</span>
                </label>
            </div>

            <form className="poll-form" onSubmit={handleSubmit}>
                {useAI ? (
                    <>
                        <div className="form-group">
                            <label>Topic for AI Poll:</label>
                            <input
                                className="poll-input"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="e.g. Cricket World Cup, AI Technology"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Number of Options:</label>
                            <input
                                type="number"
                                min="2"
                                max="10"
                                value={optionCount}
                                onChange={(e) => setOptionCount(parseInt(e.target.value))}
                                className="poll-input"
                                required
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="form-group">
                            <label>Question:</label>
                            <input
                                className="poll-input"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Options:</label>
                            {options.map((option, index) => (
                                <div key={index} className="option-group">
                                    <input
                                        value={option}
                                        onChange={(e) => handleOptionChange(index, e.target.value)}
                                        required
                                        className="poll-input"
                                    />
                                    {options.length > 2 && (
                                        <button
                                            type="button"
                                            className="remove-button"
                                            onClick={() => removeOption(index)}
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addOption}
                                className="add-option-button"
                            >
                                Add option
                            </button>
                        </div>
                    </>
                )}

                <div className="form-group">
                    <label>Poll Expiry (optional):</label>
                    <input
                        type="datetime-local"
                        value={expiresAt}
                        onChange={(e) => setExpiresAt(e.target.value)}
                        className="poll-input"
                    />
                </div>

                <button type="submit" className="submit-button">
                    {useAI ? "Create Poll with AI" : "Create Poll Manually"}
                </button>
            </form>
        </div>
    );
};

export default CreatePoll;

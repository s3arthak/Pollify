import React, { useState } from 'react';
import axios from 'axios';

const CreatePoll = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [expiresAt, setExpiresAt] = useState('');

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOption = () => {
        setOptions([...options, '']);
    };

    const removeOption = (index) => {
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!question || options.filter(opt => opt.trim() !== '').length < 2) {
            alert('Please provide a question and at least two non-empty options.');
            return;
        }

        try {
         //   const response = await axios.post('http://localhost:5000/api/polls/create', {
            const response = await axios.post('https://pollify-h0t9.onrender.com/api/polls/create',{
                question,
                options,
                expiresAt: expiresAt ? new Date(expiresAt) : null,
            });

            setQuestion('');
            setOptions(['', '']);
            setExpiresAt('');
            alert('Poll created successfully!');
        } catch (err) {
            console.log('Error creating poll:', err);
            alert('Failed to create poll.');
        }
    };

    return (
        <div className='create-poll-container'>
            <h2>Create a new Poll</h2>
            <form className="poll-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Question:</label>
                    <input
                        className='poll-input'
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Options:</label>
                    {options.map((option, index) => (
                        <div key={index} className='option-group'>
                            <input
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                required
                                className='poll-input'
                            />
                            {options.length > 2 && (
                                <button
                                    type="button"
                                    className='remove-button'
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
                        className='add-option-button'
                    >
                        Add option
                    </button>
                </div>

                <div className="form-group">
                    <label>Poll Expiry (optional):</label>
                    <input
                        type="datetime-local"
                        value={expiresAt}
                        onChange={(e) => setExpiresAt(e.target.value)}
                        className='poll-input'
                    />
                </div>

                <button type="submit" className='submit-button'>
                    Create Poll
                </button>
            </form>
        </div>
    );
};

export default CreatePoll;

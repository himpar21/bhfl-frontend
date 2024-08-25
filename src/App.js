import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css'; // Custom CSS for styling

const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' }
];

function App() {
    const [input, setInput] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://vercel.com/himanshus-projects-3315d4c9/bhfl-backend/DUSxPywmg3Jot47cYcNxcZ7QHpxg', JSON.parse(input));
            setResponseData(response.data);
        } catch (error) {
            console.error('Error:', error);
            setResponseData(null);
        }
    };

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const handleSelection = (selected) => {
        setSelectedOptions(selected);
    };

    const renderResponse = () => {
        if (!responseData) return null;

        const renderFields = selectedOptions.map(option => (
            <div key={option.value}>
                <strong>{option.label}:</strong> {responseData[option.value].join(',')}
            </div>
        ));

        return <div>{renderFields}</div>;
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit} className="form-container">
                <label>API Input</label>
                <textarea 
                    className="input-text" 
                    value={input} 
                    onChange={handleChange} 
                    rows="1" 
                    cols="50" 
                    placeholder='{"data":["M","1","334","4","B"]}'
                />
                <button type="submit" className="submit-btn">Submit</button>
            </form>

            <Select
                isMulti
                options={options}
                onChange={handleSelection}
                className="multi-select"
            />

            {responseData && (
                <div className="filtered-response">
                    <h4>Filtered Response</h4>
                    {renderResponse()}
                </div>
            )}
        </div>
    );
}

export default App;

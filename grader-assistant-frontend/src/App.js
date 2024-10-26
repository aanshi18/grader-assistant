// App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError(null); // Clear any previous errors

    try {
      const res = await axios.post('https://jsonplaceholder.typicode.com/posts', formData);
      setResponse(res.data);
    } catch (err) {
      setError('Failed to submit. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px 50px', textAlign: 'left' }}>
      <h2>Answer the following.</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Question:</label>
          <p style={{fontSize: '20px', display:'inline'}}>    Define inheritence. </p>
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Answer:</label><br />
          <textarea
            name="answer"
            rows={10}
            cols={80}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: '15px' }}>Submit</button>
      </form>

      {response && (
        <div style={{ marginTop: '20px' }}>
          <h3>Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <strong>{error}</strong>
        </div>
      )}
    </div>
  );
}

export default App;

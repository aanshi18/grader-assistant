// App.js
import React, { useState } from 'react';
import axios from 'axios';

// Sample questions (you can also fetch this from an API if needed)
const questions = {
  "123": "What is Object-Oriented Programming (OOP)?",
  "3223": "What is a class and an object?",
  "764": "What is encapsulation in OOP?"
};

function App() {
  const [formData, setFormData] = useState({});
  const [responses, setResponses] = useState({});
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup state
  const [query, setQuery] = useState(''); // Query state
  const [currentQuestionId, setCurrentQuestionId] = useState(null); // Track the current question ID
  const [queryResponse, setQueryResponse] = useState('');
  const [loading, setLoading] = useState(false)
  var popuprequestedby = -1;

  // Handle input changes (for each textarea)
  const handleChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePopupSubmit = async (e) => {
    e.preventDefault();
    console.log('Query submitted:', query); // Handle query submission logic
    // Make API call for the query
    try {
      setError(null)
      const res = await axios.post('http://localhost:8000/ask_query', {
        question: questions[currentQuestionId],
        query: query,
      });
      setQueryResponse(res.data.Response); // Store the response from the API
    } catch (err) {
      setError('Failed to submit your query. Please try again.');
    }

    setIsPopupOpen(false); // Close popup after submission
    setQuery(''); // Reset query field

  };

  const openPopup = (id) => {
    setCurrentQuestionId(id); // Set the current question ID
    setIsPopupOpen(true);
  };;
  const closePopup = () => setIsPopupOpen(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    // Create an array to hold promises for each API call
    const promises = Object.entries(questions).map(async ([id, question]) => {
      const student_answer = formData[id] || '';

      if (student_answer) {
        try {
          const res = await axios.post('http://localhost:8000/evaluate_answer', {
            "question":question,
            "student_answer":student_answer,
          });
          return { id, answer: "<b>Score: </b>"+res.data.correctness_score +'\n' + "<b>Suggestion: </b>" + res.data.suggestion+'\n' + "<b>Reference video:</b> https://www.youtube.com/watch?v=SiBw7os-_zI Timestamp: "+  res.data.timestamp + "\n" + "<b>Ai Generated Probability: </b>"+ res.data.ai_generated_prob}; // Return the response for this question
        } catch (err) {
          return { id, error: 'Failed to get response. Please try again.' , err}; // Handle API error
        }
      } else {
        return { id, error: 'No answer provided.' }; // Handle empty answers
      }
    });

    // Wait for all promises to resolve
    const results = await Promise.all(promises);
    const updatedResponses = {};
    
    results.forEach((result) => {
      updatedResponses[result.id] = result.answer || result.error;
    });

    setResponses(updatedResponses);
  };
  // Helper function to safely render HTML
  const formatResponse = (response) => ({
    __html: response.replace(/\n/g, '<br />'), // Replace \n with <br /> for proper line breaks
  });
  

  return (
    <div style={{ maxWidth: '700px', margin: '50px 50px', textAlign: 'left' }}>
      <h2>Questionnaire</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(questions).map(([id, question]) => (
          <div key={id} style={{ marginBottom: '20px' }}> 
            <br></br>
            <br></br>
            <label>
              <strong>{question}</strong>
            </label>
            <textarea
            disabled={responses[id]}
              rows="4"
              style={{
                width: '100%',
                marginTop: '5px',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px',
              }}
              value={formData[id] || ''}
              onChange={(e) => handleChange(id, e.target.value)}
              required
            />
            {responses[id] && (
              <div style={{ width: '100%', marginTop: '10px', border: 'solid', borderColor: 'green', backgroundColor: 'rgba(51, 170, 51, .1)', borderRadius:'5px', padding: '5px 5px 5px 5px' }}>
                <strong>Response:</strong>
                <div dangerouslySetInnerHTML={formatResponse(responses[id])} />
                <button type='button' style={{
                    marginTop: '10px',
                    backgroundColor: '#6c757d',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    float: 'right',
                  }}
                  onClick={() => openPopup(id)}
>Ask a query</button>
              </div>
            )}
          </div>
        ))}
        <br></br>
        <br></br>
        <button type="submit" style={{
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 15px',
            cursor: 'pointer',
            width: '20%',
            marginTop: '15px',
            fontSize: '16px',
          }}>Submit</button>
      </form>

      {error && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <strong>{error}</strong>
        </div>
      )}

      {/* Right Side for Query Responses */}
      {queryResponse && (<div style={{ 
        flex: '1',
        padding: '20px',
        borderLeft: '1px solid #ddd',
        position: 'fixed', // Fixes the position
        top: '0', // Aligns to the top of the viewport
        right: '0', // Aligns to the right
        width: '50%', // Takes half of the screen width
        height: '100%', // Full height
        overflowY: 'auto', // Enables scrolling if content overflows
        backgroundColor: '#fff', // Optional: background color for better visibility
        paddingBottom: '80px'
       }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Query Response</h2>
        {queryResponse && (
          <div style={{ background: '#f8f9fa', padding: '10px', borderRadius: '5px' }}>
            <strong>Response:</strong>
            <div dangerouslySetInnerHTML={formatResponse(queryResponse)} />
            <br></br>
            <br></br>
          </div>
        )}
      </div>)
    }

      {/* Popup Modal */}
      {isPopupOpen && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '10px',
              width: '400px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h4 style={{ marginBottom: '15px' }}>Ask a Query</h4>
            <form onSubmit={handlePopupSubmit}>
              <textarea
                rows="4"
                style={{
                  width: '95%',
                  marginBottom: '10px',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '16px',
                }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
              />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  type="button"
                  style={{
                    backgroundColor: '#6c757d',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                  }}
                  onClick={closePopup}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#28a745',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                  }}
                >
                  Submit Query
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

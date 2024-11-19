import React, { useState } from 'react';
import './submitform.css'; // Assuming the CSS file is already linked

function QuestionSubmissionForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const questionData = {
      user_id: 0, // Replace with the actual user ID
      title,
      content,
      type,
      company_name: companyName,
      tags: tags.split(',').map((tag) => tag.trim()),
    };

    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(questionData),
      });

      if (response.ok) {
        // Handle successful submission
        alert('Question submitted successfully!');
        // Reset the form fields
        setTitle('');
        setContent('');
        setType('');
        setCompanyName('');
        setTags('');
      } else {
        // Handle server-side errors
        alert('Failed to submit the question.');
      }
    } catch (error) {
      // Handle network errors
      alert('An error occurred while submitting the question.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="submission-form">
      <h2>Submit a Question</h2>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="companyname">Company Name:</label>
        <input
          type="text"
          id="companyname"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="types">Type:</label>
        <input
          type="text"
          id="types"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="tags">Tags (comma-separated):</label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default QuestionSubmissionForm;

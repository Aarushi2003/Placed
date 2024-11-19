import "./style.css";
import profilePicture from './profilepic.jpg';
import AppDrawer from "./AppDrawer";
import SubmitForm from "./submitform";
import { useState } from 'react';


export default function App() {
  const a = "Amitabh Bal";
  const b = "Final Year";
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
    <AppDrawer>
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </AppDrawer>

      <section className="header">
        <div className="name-year">
          <div className="name">
            <h1>Name: {a}</h1>
          </div>
          <div className="year">
            <h2>Year: {b}</h2>
          </div>
        </div>
        <div className="profile-picture">
        <i><img src={profilePicture} alt="Profile" /></i>
        </div>
      </section>
      
      <section className="content">
        <div className="companies">
          <h2>Companies</h2>
          <div className="company-list">
            <p>Company 1</p>
            <p>Company 2</p>
          </div>
        </div>
        <div className="pubs">
          <h2>Questions Asked</h2>
          <div className="pub-list">
            <p>Publication 1</p>
            <p>Publication 2</p>
          </div>
        </div>
      </section>
      {/* Table Section */}
      <section className="links-table">
        <h2>My Links</h2>
        <table>
          <thead>
            <tr>
              <th>Resume</th>
              <th>GitHub</th>
              <th>Website</th>
              <th>LinkedIn</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a href="resume-link.pdf" target="_blank" rel="noopener noreferrer">View Resume</a>
              </td>
              <td>
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a>
              </td>
              <td>
                <a href="https://yourwebsite.com" target="_blank" rel="noopener noreferrer">Website</a>
              </td>
              <td>
                <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <button onClick={handleToggleForm}>
        {showForm ? 'Hide Submission Form' : 'Show Submission Form'}
      </button>

      {showForm && <SubmitForm />} {/* Conditionally render the form */}

    </>
  );
}

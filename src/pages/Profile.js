import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from '../components/Layout/Sidebar';
import Header from '../components/Layout/Header';
import {
  selectFilteredQuestions,
  removeQuestion,
  setSearchTerm,
} from '../features/questions/questionsSlice';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const filteredQuestions = useSelector(selectFilteredQuestions);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(removeQuestion(id));
  };

  const handleEdit = (id) => {
    console.log(`Edit question with ID: ${id}`);
  };

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="content">
        <Header title="Profile" />
        <div className="profile-content">
          <h2>Welcome, {user?.email}</h2>
          <p>This is Srilatha</p>

          <div
            className="dashboard-actions"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              width: '100%',
              marginBottom: '1rem',
            }}
          >
            <input
              type="text"
              placeholder="Search by question title..."
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              style={{
                flex: 1,
                minWidth: 0,
                padding: '0.6rem 1rem',
                fontSize: '14px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                outline: 'none',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#4a90e2')}
              onBlur={(e) => (e.target.style.borderColor = '#ccc')}
            />
            <button
              style={{
                backgroundColor: '#4a90e2',
                color: '#fff',
                padding: '0.6rem 1rem',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'background-color 0.2s ease',
              }}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = '#357ab8')
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = '#4a90e2')
              }
              onClick={() => console.log('Add button clicked')}
            >
              Add
            </button>
          </div>

          <div className="questions-table-container">
            <table className="questions-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Tags</th>
                  <th>Difficulty</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuestions.length > 0 ? (
                  filteredQuestions.map((q) => (
                    <tr key={q.id} className="question-row">
                      <td data-label="Title">{q.title}</td>
                      <td data-label="Tags">
                        <div className="tags-container">
                          {(Array.isArray(q.tags)
                            ? q.tags
                            : q.tags.split(',')
                          ).map((tag, index) => (
                            <span key={index} className="tag">
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td data-label="Difficulty">
                        <span
                          className={`difficulty difficulty-${q.difficulty.toLowerCase()}`}
                        >
                          {q.difficulty}
                        </span>
                      </td>
                      <td data-label="Actions" className="actions">
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(q.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(q.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      style={{ textAlign: 'center', padding: '1rem' }}
                    >
                      No matching questions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

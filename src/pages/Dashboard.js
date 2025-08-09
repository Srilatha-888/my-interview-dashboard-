import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  deleteQuestion, 
  setSearch, 
  editQuestion,
  addQuestion
} from '../features/questions/questionsSlice';
import Sidebar from '../components/Layout/Sidebar';
import Header from '../components/Layout/Header';
import '../App.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { list, search } = useSelector(state => state.questions);

  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    tags: '',
    difficulty: 'Easy'
  });
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    tags: '',
    difficulty: 'Easy'
  });

  const filtered = list.filter(q => 
    q.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    dispatch(deleteQuestion(id));
  };

  const handleEdit = (question) => {
    setEditingQuestion(question);
    setEditForm({
      title: question.title,
      tags: question.tags.join(', '),
      difficulty: question.difficulty
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editingQuestion) {
      dispatch(editQuestion({
        id: editingQuestion.id,
        title: editForm.title,
        tags: editForm.tags.split(',').map(tag => tag.trim()),
        difficulty: editForm.difficulty
      }));
      setEditingQuestion(null);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (newQuestion.title.trim()) {
      dispatch(addQuestion({
        id: Date.now().toString(),
        title: newQuestion.title,
        tags: newQuestion.tags.split(',').map(tag => tag.trim()),
        difficulty: newQuestion.difficulty
      }));
      setNewQuestion({
        title: '',
        tags: '',
        difficulty: 'Easy'
      });
      setShowAddModal(false);
    }
  };

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="content">
        <Header title="Interview Questions" />
        <div className="dashboard-actions">
          <input
            type="text"
            placeholder="Search question title..."
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            className="search-input"
          />
           <button 
            className="add-question-btn"
            onClick={() => setShowAddModal(true)}
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
              {filtered.map(q => (
                <tr key={q.id} className="question-row">
                  <td data-label="Title">{q.title}</td>
                  <td data-label="Tags">
                    <div className="tags-container">
                      {q.tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                      ))}
                    </div>
                  </td>
                  <td data-label="Difficulty">
                    <span className={`difficulty difficulty-${q.difficulty.toLowerCase()}`}>
                      {q.difficulty}
                    </span>
                  </td>
                  <td data-label="Actions" className="actions">
                    <button 
                      className="edit-btn"
                      onClick={() => handleEdit(q)}
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
              ))}
            </tbody>
          </table>
        </div>

        {showAddModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Add New Question</h2>
              <form onSubmit={handleAddQuestion}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={newQuestion.title}
                    onChange={(e) => setNewQuestion({...newQuestion, title: e.target.value})}
                    placeholder="Enter question title"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Tags (comma separated)</label>
                  <input
                    type="text"
                    value={newQuestion.tags}
                    onChange={(e) => setNewQuestion({...newQuestion, tags: e.target.value})}
                    placeholder="e.g., React, JavaScript, Redux"
                  />
                </div>
                <div className="form-group">
                  <label>Difficulty</label>
                  <select
                    value={newQuestion.difficulty}
                    onChange={(e) => setNewQuestion({...newQuestion, difficulty: e.target.value})}
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                <div className="modal-actions">
                  <button type="submit" className="save-button">Add Question</button>
                  <button 
                    type="button" 
                    className="cancel-button"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {editingQuestion && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Edit Question</h2>
              <form onSubmit={handleEditSubmit}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={editForm.title}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Tags (comma separated)</label>
                  <input
                    type="text"
                    name="tags"
                    value={editForm.tags}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Difficulty</label>
                  <select
                    name="difficulty"
                    value={editForm.difficulty}
                    onChange={handleEditChange}
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                <div className="modal-actions">
                  <button type="submit" className="save-button">Save</button>
                  <button 
                    type="button" 
                    className="cancel-button"
                    onClick={() => setEditingQuestion(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
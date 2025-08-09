import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [
    { 
        id: '1', 
        title: 'What is React?', 
        tags: ['React', 'Frontend'], 
        difficulty: 'Easy' 
      },
      { 
        id: '2', 
        title: 'Explain Redux', 
        tags: ['Redux', 'State Management'], 
        difficulty: 'Medium' 
      },
      {
        id: '3',
        title: 'What is Virtual DOM?',
        tags: ['React', 'Performance'],
        difficulty: 'Medium'
      },
      {
        id: '4',
        title: 'Difference between useState and useReducer',
        tags: ['React', 'Hooks'],
        difficulty: 'Medium'
      },
      {
        id: '5',
        title: 'What is Redux Middleware?',
        tags: ['Redux', 'Middleware'],
        difficulty: 'Hard'
      },
      {
        id: '6',
        title: 'Explain React Context API',
        tags: ['React', 'State Management'],
        difficulty: 'Medium'
      },
  ],
  search: ''
};

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    addQuestion: (state, action) => {
      state.list.push({
        id: Date.now().toString(),
        ...action.payload
      });
    },
    editQuestion: (state, action) => {
      const { id, ...updatedQuestion } = action.payload;
      const index = state.list.findIndex(q => q.id === id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...updatedQuestion };
      }
    },
    deleteQuestion: (state, action) => {
      state.list = state.list.filter(q => q.id !== action.payload);
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    }
    
  }
});

export const { addQuestion, editQuestion, deleteQuestion, setSearch } = questionsSlice.actions;
export default questionsSlice.reducer;
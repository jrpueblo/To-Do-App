// components/Task.tsx

'use client';

import React from 'react';
import DeleteIcon from './deleteButton';
import CompleteIcon from './completebutton';
import EditIcon from './editButton';

interface TaskProps {
  id: string;
  title: string;
  content: string;
  created: string;
}

const Task: React.FC<TaskProps> = ({ id, title, content, created }) => {
  const handleDelete = async (id: string) => {
    try {
      console.log(id);
      
    } catch (error) {
      console.error('Error deleting note:', error);
      return "";
    }
  };

  const handleEdit = async (id: string) => {
    try {
      console.log(id);
     
    } catch (error) {
      console.error('Error editing note:', error);
      return "";
    }
  };

  const handleComplete = async (id: string) => {
    try {
      console.log(id);
      
    } catch (error) {
      console.error('Error completing note:', error);
      return "";
    }
  };

  return (
    <div className="note-container">
      <div className="note-content">
        <h2>{title}</h2>
        <h5>{content}</h5>
        <p>{new Date(created).toLocaleString()}</p>
      </div>
      <div className="note-icons">
        <button onClick={() => handleDelete(id)} className="icon-button">
          <DeleteIcon />
        </button>
        <button onClick={() => handleEdit(id)} className="icon-button">
          <EditIcon />
        </button>
        <button onClick={() => handleComplete(id)} className="icon-button">
          <CompleteIcon />
        </button>
      </div>
    </div>
  );
};

export default Task;
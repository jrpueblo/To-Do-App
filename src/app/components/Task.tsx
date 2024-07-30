// components/Task.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import DeleteIcon from './deleteButton';
import CompleteIcon from './completebutton';
import EditIcon from './editButton';
import ConfirmPopup from './ConfirmPopup';

interface TaskProps {
  id: string;
  title: string;
  content: string;
  created: string;
}

const Task: React.FC<TaskProps> = ({ id, title, content, created }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [isEditPopupVisible, setEditPopupVisible] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);

  const router = useRouter();

  const handleDelete = async (id: string) => {

    try {
      console.log(id);
      setPopupVisible(false);

      const response = await fetch(`http://127.0.0.1:8090/api/collections/Tasks/records/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if(!response.ok){
        throw new Error(`Failed to delete task: ${response.status} ${response.statusText}`);
      } else{
        console.log(`Task with id ${id} deleted successfully`);
      }
      window.location.reload();
      
    } catch (error) {
      console.error('Error deleting note:', error);
      return "";
    }
  };

  const handleEdit = async (id: string, title: string, content: string) => {
    try {
      console.log(id);

      const response = await fetch(`http://127.0.0.1:8090/api/collections/Tasks/records/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      if(!response.ok){
        throw new Error(`Failed to edit task: ${response.status} ${response.statusText}`);
      } else{
        console.log(`Task with id ${id} edited successfully`);
      }

      setEditPopupVisible(false);
      window.location.reload();
     
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

  const showPopup = (id: string) => {
    setCurrentTaskId(id);
    setPopupVisible(true);
  };

  const showEditPopup = (id: string) => {
    setCurrentTaskId(id);
    setEditPopupVisible(true);
  };

  const confirmDelete = () => {
    if (currentTaskId) {
      handleDelete(currentTaskId);
    }
  };

  const cancelDelete = () => {
    setPopupVisible(false);
  };

  const confirmEdit = () => {
    if(currentTaskId) {
      handleEdit(currentTaskId, editTitle, editContent);
    }
  }

  const cancelEdit = () => {
    setEditPopupVisible(false);
  }

  return (
    <div className="note-container">
      <div className="note-content">
        <h2>{title}</h2>
        <h5>{content}</h5>
        <p>{new Date(created).toLocaleString()}</p>
      </div>
      <div className="note-icons">
        <button onClick={() => showPopup(id)} className="icon-button">
          <DeleteIcon />
        </button>
        <button onClick={() => showEditPopup(id)} className="icon-button">
          <EditIcon />
        </button>
        <button onClick={() => handleComplete(id)} className="icon-button">
          <CompleteIcon />
        </button>
      </div>

      {isPopupVisible && (
      <>  
        <div className="backdrop">
          <ConfirmPopup
            message="Are you sure you want to delete this note?"
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />
        </div>
      </>
      )}

      {isEditPopupVisible && (
        <>
          <div className="backdrop">
            <div className="edit-popup">
              <h3>Edit Task</h3>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Title"
              />
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                placeholder="Content"
              />
              <div className="edit-buttons">
                <button onClick={confirmEdit}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
    
  );
};

export default Task;
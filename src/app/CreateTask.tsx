'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';



export default function CreateTask() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const router = useRouter();

  // Function to handle the creation of notes
  const create = async() => {
   
    await fetch('http://127.0.0.1:8090/api/collections/Tasks/records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });

    setContent('');
    setTitle('');

    router.refresh();
  }
  
  // Function to handle the deletion of notes
  // Function to handle the editing of notes

  // Form to create a new task, calls the function defined above 
  return (
    <div className="TaskBox">
        <form onSubmit={create} className='TodoForm'>
        <h2 className="BoxTitle">Create a new Task</h2>
        <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="todo-input"
        />
        <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="todo-input"
        />
        <button type="submit" className="todo-btn">
            Create note
        </button>
        </form>
    </div>
  );
}
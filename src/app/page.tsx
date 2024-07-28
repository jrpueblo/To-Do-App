'use client';

import React from 'react';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';

interface Task {
  id: string;
  title: string;
  content: string;
  created: string;
}

async function getNotes(): Promise<Task[]> {
  try {
    const res = await fetch('http://127.0.0.1:8090/api/collections/Tasks/records', { cache: 'no-store' });

    if (!res.ok) {
      console.error(`Error fetching notes: ${res.status} ${res.statusText}`);
      return [];
    }

    const data = await res.json();
    return data?.items || [];
  } catch (error) {
    console.error('Error fetching notes:', error);
    return [];
  }
}

const HomePage: React.FC = () => {
  const [notes, setNotes] = React.useState<Task[]>([]);

  React.useEffect(() => {
    const fetchNotes = async () => {
      const fetchedNotes = await getNotes();
      setNotes(fetchedNotes);
    };

    fetchNotes();
  }, []);

  return (
    <div className="App">
      <CreateTask />
      <TaskList tasks={notes} />
    </div>
  );
};

export default HomePage;
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

async function getTasks(): Promise<Task[]> {
  try {
    const res = await fetch('http://127.0.0.1:8090/api/collections/Tasks/records', { cache: 'no-store' });

    if (!res.ok) {
      console.error(`Error fetching notes: ${res.status} ${res.statusText}`);
      return [];
    }
    
    const data = await res.json();
    const allTasks = data?.items || [];
    const activetasks = [];
    
    for(let i = 0; i < allTasks.length; i++){
      const status = allTasks[i].completed;
      if (status == false){
        activetasks.push(allTasks[i]);
      }
    }

    
    return activetasks;

  } catch (error) {
    console.error('Error fetching notes:', error);
    return [];
  }
}

async function getCompletedTasks(): Promise<Task[]> {
  try{
    const res = await fetch('http://127.0.0.1:8090/api/collections/Tasks/records', { cache: 'no-store' });

    if (!res.ok) {
      console.error(`Error fetching notes: ${res.status} ${res.statusText}`);
      return [];
    }

    const data = await res.json();
    const allTasks = data?.items || [];
    const completedTasks = [];
    
    for(let i = 0; i < allTasks.length; i++){
      const status = allTasks[i].completed;
      if (status == true){
        completedTasks.push(allTasks[i]);
      }
    }

    
    return completedTasks;
  } catch (error){
    console.error('Error fetching completed tasks:', error);
    return [];
  }
}

const HomePage: React.FC = () => {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = React.useState<Task[]>([]);

  React.useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    };

    const fetchCompleted = async () => {
      const fetchedCoompletedTasks = await getCompletedTasks();
      setCompletedTasks(fetchedCoompletedTasks);
    }

    fetchTasks();
    fetchCompleted();
  }, []);

  return (
    <div className="App">
      <CreateTask />
      <TaskList tasks={tasks} />
    </div>
  );
};

export default HomePage;
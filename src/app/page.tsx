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
    
    // filter out completed tasks
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
    
    // filter out active tasks
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

async function clearCompletedTasks() {
  try{
    // fetch completed tasks
    const completedTasks = await getCompletedTasks();

    // Loop through and delete each task
    for (const task of completedTasks) {
      const response = await fetch(`http://127.0.0.1:8090/api/collections/Tasks/records/${task.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if(!response.ok){
        console.error(`Failed to delete task with id ${task.id}: ${response.status} ${response.statusText}`);
      }else{
        console.log(`Task with id $task.id} has been deleted successfully`)
      }
    }

    // refresh
    window.location.reload();
  }catch (error){
    console.error('Error clearing completed tasks', error); 
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
      <h1 className="completedTitle">Completed tasks below</h1>
      <TaskList tasks={completedTasks} />
      <button onClick={clearCompletedTasks} className='clearCompletedTaskButton'>
        Click here to clear Completed Tasks
      </button>
    </div>
  );
};

export default HomePage;
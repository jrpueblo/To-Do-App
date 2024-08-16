import React from 'react';
import Task from './Task';

interface Task {
  id: string;
  title: string;
  content: string;
  created: string;
}

interface TaskListProps {
  tasks: Task[];
}


const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div>
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          content={task.content}
          created={task.created}
        />
      ))}
    </div>
  );
};

export default TaskList;
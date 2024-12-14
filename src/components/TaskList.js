import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, toggleTask } from '../redux/tasksSlice';
import './TaskList.css';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading) {
    return <p className="loading">Загрузка...</p>;
  }

  if (tasks.length === 0) {
    return <p>Список задач пуст.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className={task.completed ? 'completed' : ''}>
          <label>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => dispatch(toggleTask(task.id))}
            />
            {task.title}
          </label>
          <button onClick={() => dispatch(toggleTask(task.id))}>
            {task.completed ? 'Восстановить' : 'Завершить'}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;

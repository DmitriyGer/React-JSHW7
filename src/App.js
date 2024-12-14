import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from './redux/tasksSlice';
import TaskList from './components/TaskList';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.tasks.theme);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Список задач</h1>
        <button onClick={handleThemeToggle}>
          Переключить тему: {theme === 'light' ? 'Темная' : 'Светлая'}
        </button>
      </header>
      <TaskList />
    </div>
  );
};

export default App;

import './App.css';
// eslint-disable-next-line import/order
import React, { useEffect, useState } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import TodoList from './components/todoList/todoList';

const date = [
  {
    id: 3,
    complited: true,
    description: 'Completed task',
    createdTime: 1718024240034,
    created: 'created 0 seconds ago',
    editing: false,
    timer: null,
    play: false,
  },
];

function App() {
  const timer = React.useRef();

  const [todoDate, setTodoDate] = useState(date);
  const [compliteCount, setCompliteCount] = useState(2);
  const [activeBtn, setActiveBtn] = useState('All');

  function complitedCount() {
    let compCount = 0;
    todoDate.forEach((item) => {
      if (!item.complited) {
        compCount += 1;
      }
    });
    setCompliteCount(compCount);
  }

  const deleteElem = (id) => {
    const index = todoDate.findIndex((item) => item.id === id);
    setTodoDate([...todoDate.slice(0, index), ...todoDate.slice(index + 1)]);
    complitedCount();
  };

  const complitedTodo = (id) => {
    const index = todoDate.findIndex((item) => item.id === id);
    const complitedChange = { ...todoDate[index], complited: !todoDate[index].complited };
    setTodoDate([...todoDate.slice(0, index), complitedChange, ...todoDate.slice(index + 1)]);
    complitedCount();
  };

  const editingTodo = (id) => {
    const newData = todoDate.map((item) => {
      if (id === item.id) {
        return {
          ...item,
          editing: true,
        };
      }
      return {
        ...item,
        editing: false,
      };
    });
    setTodoDate(newData);
  };

  const saveEdit = (id, value) => {
    const index = todoDate.findIndex((item) => item.id === id);
    const editingChange = { ...todoDate[index], description: value, editing: !todoDate[index].editing };

    setTodoDate([...todoDate.slice(0, index), editingChange, ...todoDate.slice(index + 1)]);
  };

  const addTodo = (elem) => {
    if (elem.description) {
      setTodoDate([...todoDate, elem]);
      complitedCount();
    }
  };

  const playHandler = (id) => {
    const index = todoDate.findIndex((item) => item.id === id);
    const complitedChange = { ...todoDate[index], play: true };
    setTodoDate([...todoDate.slice(0, index), complitedChange, ...todoDate.slice(index + 1)]);
  };

  const pauseHandler = (id) => {
    const index = todoDate.findIndex((item) => item.id === id);
    const complitedChange = { ...todoDate[index], play: false };
    setTodoDate([...todoDate.slice(0, index), complitedChange, ...todoDate.slice(index + 1)]);
  };

  const delComplited = () => {
    setTodoDate(todoDate.filter((item) => !item.complited));
    complitedCount();
  };

  const setActive = (value) => {
    setActiveBtn(value);
  };

  const playTimeUpdate = (item) => {
    const hasDecrement = !item.timer || item.timer === 0 || item.complited || !item.play;
    if (!hasDecrement) {
      return {
        ...item,
        timer: item.timer - 1,
      };
    }
    if (item.timer === 0) {
      return {
        ...item,
        complited: true,
        timer: null,
      };
    }
    return { ...item };
  };

  const timerCB = (item) => {
    const newTime = formatDistanceToNow(item.createdTime, { addSuffix: true, includeSeconds: true });
    return {
      ...item,
      created: `created ${newTime}`,
    };
  };

  const timerFuncs = () => {
    const updateTime = todoDate.map((item) => {
      return playTimeUpdate(timerCB(item));
    });
    setTodoDate(updateTime);
    localStorage.setItem('todoDate', JSON.stringify(todoDate));
  };

  useEffect(() => {
    let todoDateJSON = localStorage.getItem('todoDate');
    todoDateJSON = JSON.parse(todoDateJSON);
    if (todoDateJSON) {
      setTodoDate(todoDateJSON);
    }
    timer.current = setInterval(timerFuncs, 1000);
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  useEffect(() => {
    clearInterval(timer.current);
    timer.current = setInterval(timerFuncs, 1000);
  }, [todoDate]);
  return (
    <div className="App">
      <section className="todoapp">
        <Header addTodo={addTodo} />
        <section className="main">
          <TodoList
            deletElem={deleteElem}
            editingTodo={editingTodo}
            complitedTodo={complitedTodo}
            saveEdit={saveEdit}
            items={todoDate}
            activeBtn={activeBtn}
            playHandler={playHandler}
            pauseHandler={pauseHandler}
          />
          <Footer
            compliteCount={compliteCount}
            activeBtn={activeBtn}
            setActive={setActive}
            delComplited={delComplited}
          />
        </section>
      </section>
    </div>
  );
}

export default App;

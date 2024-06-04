import './App.css';
// eslint-disable-next-line import/order
import { useEffect, useRef, useState } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import TodoList from './components/todoList/todoList';

const data = [
  {
    id: 3,
    complited: true,
    description: 'Completed task',
    createdTime: Date.now(),
    created: 'created 0 seconds ago',
    editing: false,
  },
  {
    id: 4,
    complited: false,
    description: 'Completed task',
    createdTime: Date.now(),
    created: 'created 0 seconds ago',
    editing: false,
  },
  {
    id: 1,
    complited: false,
    description: 'Completed task',
    createdTime: Date.now(),
    created: 'created 0 seconds ago',
    editing: false,
  },
];

function App() {
  const [todoDate, setTodoDate] = useState(data);
  const [compliteCount, setCompliteCount] = useState(2);
  const [activeBtn, setActiveBtn] = useState('All');

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

  const complitedCount = () => {
    let compCount = 0;
    todoDate.forEach((item) => {
      if (!item.complited) {
        compCount += 1;
      }
    });
    setCompliteCount(compCount);
  };

  const addTodo = (elem) => {
    setTodoDate([...todoDate, elem]);
    complitedCount();
  };

  const delComplited = () => {
    setTodoDate(todoDate.filter((item) => !item.complited));
    complitedCount();
  };

  const setActive = (value) => {
    setActiveBtn(value);
  };

  const complitedTodo = (id) => {
    const index = todoDate.findIndex((item) => item.id === id);
    const complitedChange = { ...todoDate[index], complited: !todoDate[index].complited };
    setTodoDate([...todoDate.slice(0, index), complitedChange, ...todoDate.slice(index + 1)]);
    complitedCount();
  };

  const deleteElem = (id) => {
    const index = todoDate.findIndex((item) => item.id === id);
    setTodoDate([...todoDate.slice(0, index), ...todoDate.slice(index + 1)]);
    complitedCount();
  };

  const timer = useRef();
  const cb = () => {
    const updateTime = todoDate.map((item) => {
      return {
        ...item,
        created: `created ${formatDistanceToNow(item.createdTime, { addSuffix: true, includeSeconds: true })}`,
      };
    });
    setTodoDate(updateTime);
  };
  useEffect(() => {
    clearInterval(timer.current);
    timer.current = setInterval(cb, 5000);
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

import './header.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { minutesToSeconds } from 'date-fns';

function Header({ addTodo }) {
  const [textValue, setTextValue] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const inputHandler = (e) => {
    setTextValue(e.currentTarget.value);
  };

  const minutesInputHandler = (e) => {
    const isNubmer = Number.isNaN(+e.currentTarget.value[e.currentTarget.value.length - 1]);
    if (!isNubmer) {
      setMinutes(e.currentTarget.value.replace(/\s+/g, ''));
    }
  };

  const secondsInputHandler = (e) => {
    const isNubmer = Number.isNaN(+e.currentTarget.value[e.currentTarget.value.length - 1]);
    if (!isNubmer) {
      setSeconds(e.currentTarget.value.replace(/\s+/g, ''));
    }
  };

  const createTodo = () => {
    const newTodo = {
      id: Date.now(),
      complited: false,
      description: textValue.replace(/\s+/g, ''),
      createdTime: Date.now(),
      created: 'created 0 seconds ago',
      editing: false,
      timer: minutesToSeconds(+minutes) + +seconds,
    };
    setTextValue('');
    setSeconds('');
    setMinutes('');
    return newTodo;
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form">
        <input
          onChange={inputHandler}
          value={textValue}
          className="new-todo"
          placeholder="What needs to be done?"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              return textValue ? addTodo(createTodo()) : false;
            }
            return undefined;
          }}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          name="minutes"
          onChange={minutesInputHandler}
          value={minutes}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              return textValue ? addTodo(createTodo()) : false;
            }
            return undefined;
          }}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          name="seconds"
          onChange={secondsInputHandler}
          value={seconds}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              return textValue ? addTodo(createTodo()) : false;
            }
            return undefined;
          }}
        />
      </form>
    </header>
  );
}

Header.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default Header;

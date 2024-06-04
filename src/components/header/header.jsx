import './header.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

function Header(props) {
  const { addTodo } = props;
  const [textValue, setTextValue] = useState('');

  const inputHandler = (e) => {
    setTextValue(e.currentTarget.value);
  };

  const createTodo = () => {
    const newTodo = {
      id: Date.now(),
      complited: false,
      description: textValue,
      createdTime: Date.now(),
      created: 'created 0 seconds ago',
      editing: false,
    };
    setTextValue('');
    return newTodo;
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        onChange={inputHandler}
        value={textValue}
        className="new-todo"
        placeholder="What needs to be done?"
        onBlur={() => {
          return textValue ? addTodo(createTodo()) : '';
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            return textValue ? addTodo(createTodo()) : '';
          }
          return '';
        }}
      />
    </header>
  );
}

Header.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default Header;

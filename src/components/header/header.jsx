import './header.css';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { minutesToSeconds } from 'date-fns';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textValue: '',
      minutes: '',
      seconds: '',
    };
  }

  inputHandler = (e) => {
    this.setState({ textValue: e.currentTarget.value });
  };

  minutesInputHandler = (e) => {
    const isNubmer = Number.isNaN(+e.currentTarget.value[e.currentTarget.value.length - 1]);
    if (!isNubmer) {
      this.setState({ minutes: e.currentTarget.value.replace(/\s+/g, '') });
    }
  };

  secondsInputHandler = (e) => {
    const isNubmer = Number.isNaN(+e.currentTarget.value[e.currentTarget.value.length - 1]);
    if (!isNubmer) {
      this.setState({ seconds: e.currentTarget.value.replace(/\s+/g, '') });
    }
  };

  createTodo = () => {
    const { textValue, minutes, seconds } = this.state;
    const newTodo = {
      id: Date.now(),
      complited: false,
      description: textValue.replace(/\s+/g, ''),
      createdTime: Date.now(),
      created: 'created 0 seconds ago',
      editing: false,
      timer: minutesToSeconds(+minutes) + +seconds,
    };
    this.setState({ textValue: '', minutes: '', seconds: '' });
    return newTodo;
  };

  render() {
    const { textValue, minutes, seconds } = this.state;
    const { addTodo } = this.props;
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form">
          <input
            onChange={this.inputHandler}
            value={textValue}
            className="new-todo"
            placeholder="What needs to be done?"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                return textValue ? addTodo(this.createTodo()) : false;
              }
              return undefined;
            }}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            name="minutes"
            onChange={this.minutesInputHandler}
            value={minutes}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                return textValue ? addTodo(this.createTodo()) : false;
              }
              return undefined;
            }}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            name="seconds"
            onChange={this.secondsInputHandler}
            value={seconds}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                return textValue ? addTodo(this.createTodo()) : false;
              }
              return undefined;
            }}
          />
        </form>
      </header>
    );
  }
}

Header.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default Header;

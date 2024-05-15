import './header.css';
import { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textValue: '',
    };
  }

  inputHandler = (e) => {
    this.setState({ textValue: e.currentTarget.value });
  };

  createTodo = () => {
    const { textValue } = this.state;
    const newTodo = {
      id: Date.now(),
      complited: false,
      description: textValue,
      createdTime: Date.now(),
      created: 'created 0 seconds ago',
      editing: false,
    };
    this.setState({ textValue: '' });
    return newTodo;
  };

  render() {
    const { textValue } = this.state;
    const { addTodo } = this.props;
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          onChange={this.inputHandler}
          value={textValue}
          className="new-todo"
          placeholder="What needs to be done?"
          onBlur={() => {
            return textValue ? addTodo(this.createTodo()) : false;
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              return textValue ? addTodo(this.createTodo()) : false;
            }
            return undefined;
          }}
        />
      </header>
    );
  }
}

Header.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default Header;

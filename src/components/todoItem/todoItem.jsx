import { Component } from 'react';
import PropTyeps from 'prop-types';

import propTypesItem from '../../types/types';
import './todoItem.css';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textValue: props.item.description,
    };
  }

  inputHandler = (e) => {
    this.setState({ textValue: e.currentTarget.value });
  };

  editHandler = (id) => {
    const { textValue } = this.state;
    const { saveEdit } = this.props;

    if (textValue !== '') {
      saveEdit(id, textValue);
    }
  };

  render() {
    const { textValue } = this.state;
    const { item, deletElem, complitedTodo, editingTodo } = this.props;
    if (item.editing) {
      return (
        <input
          /* eslint-disable-next-line jsx-a11y/no-autofocus */
          autoFocus
          type="text"
          className="edit"
          onChange={this.inputHandler}
          onBlur={() => this.editHandler(item.id, item.description)}
          value={textValue}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              return this.editHandler(item.id);
            }
            return undefined;
          }}
        />
      );
    }
    return (
      <div className="view">
        <input checked={item.complited} onChange={() => complitedTodo(item.id)} className="toggle" type="checkbox" />
        <label>
          <span className="description">{item.description}</span>
          <span className="created">{item.created}</span>
        </label>
        <button type="button" onClick={() => editingTodo(item.id)} className="icon icon-edit"></button>
        <button type="button" onClick={() => deletElem(item.id)} className="icon icon-destroy"></button>
      </div>
    );
  }
}

TodoItem.propTypes = {
  item: PropTyeps.shape(propTypesItem()).isRequired,
  deletElem: PropTyeps.func.isRequired,
  complitedTodo: PropTyeps.func.isRequired,
  editingTodo: PropTyeps.func.isRequired,
};

export default TodoItem;

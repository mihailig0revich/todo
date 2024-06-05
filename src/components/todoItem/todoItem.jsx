import { Component } from 'react';
import PropTyeps from 'prop-types';

// eslint-disable-next-line import/order
import propTypesItem from '../../types/types';

import './todoItem.css';
// eslint-disable-next-line import/order
import * as dateFns from 'date-fns';

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
    const { item, deletElem, complitedTodo, editingTodo, pauseHandler, playHandler } = this.props;
    const customDate = dateFns.format(item.timer * 1000, 'mm:ss');
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
      <>
        <div className="view">
          <input checked={item.complited} onChange={() => complitedTodo(item.id)} className="toggle" type="checkbox" />
          <label>
            <span className="title">{item.description}</span>
            {item.timer !== null && (
              <span className="description">
                {item.play ? (
                  <button type="button" onClick={() => pauseHandler(item.id)} className="icon icon-play" />
                ) : (
                  <button type="button" onClick={() => playHandler(item.id)} className="icon icon-pause" />
                )}
                {customDate}
              </span>
            )}
            <span className="description">{item.created}</span>
          </label>
          <button type="button" onClick={() => editingTodo(item.id)} className="icon icon-edit"></button>
          <button type="button" onClick={() => deletElem(item.id)} className="icon icon-destroy"></button>
        </div>
        <input type="text" className="edit" />
      </>
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

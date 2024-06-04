import { useState } from 'react';
import PropTyeps from 'prop-types';

import propTypesItem from '../../types/types';
import './todoItem.css';

function TodoItem(props) {
  const { item, deletElem, complitedTodo, editingTodo, saveEdit } = props;
  const [textValue, setTextValue] = useState('');

  const inputHandler = (e) => {
    setTextValue(e.currentTarget.value);
  };

  const editHandler = (id) => {
    if (textValue !== '') {
      saveEdit(id, textValue);
    }
  };

  if (item.editing) {
    return (
      <input
        /* eslint-disable-next-line jsx-a11y/no-autofocus */
        autoFocus
        type="text"
        className="edit"
        onChange={inputHandler}
        onBlur={() => editHandler(item.id, item.description)}
        value={textValue}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            return editHandler(item.id);
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

TodoItem.propTypes = {
  item: PropTyeps.shape(propTypesItem()).isRequired,
  deletElem: PropTyeps.func.isRequired,
  complitedTodo: PropTyeps.func.isRequired,
  editingTodo: PropTyeps.func.isRequired,
};

export default TodoItem;

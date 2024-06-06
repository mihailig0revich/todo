import PropTypes, { oneOf } from 'prop-types';

import TodoItem from '../todoItem/todoItem';
import propTypesItem from '../../types/types';
import './todoList.css';

function TodoList({ deletElem, complitedTodo, editingTodo, saveEdit, items, activeBtn, playHandler, pauseHandler }) {
  const dataList = items.map((item) => {
    if (activeBtn === 'Active' && item.complited) return undefined;
    if (activeBtn === 'Completed' && !item.complited) return undefined;
    const elemStyle = item.complited ? 'completed' : '';
    return (
      <li key={item.id} className={item.editing ? 'editing' : elemStyle}>
        <TodoItem
          item={item}
          complitedTodo={complitedTodo}
          saveEdit={saveEdit}
          editingTodo={editingTodo}
          deletElem={deletElem}
          playHandler={playHandler}
          pauseHandler={pauseHandler}
        />
      </li>
    );
  });

  return <ul className="todo-list">{dataList}</ul>;
}

TodoList.propTypes = {
  deletElem: PropTypes.func.isRequired,
  complitedTodo: PropTypes.func.isRequired,
  editingTodo: PropTypes.func.isRequired,
  saveEdit: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape(propTypesItem())).isRequired,
  activeBtn: oneOf(['All', 'Active', 'Completed']).isRequired,
};

export default TodoList;

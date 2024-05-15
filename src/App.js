import './App.css';
// eslint-disable-next-line import/order
import { Component } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import TodoList from './components/todoList/todoList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todoDate: [
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
      ],
      compliteCount: 2,
      activeBtn: 'All',
    };
  }

  deleteElem = (id) => {
    this.setState((state) => {
      const index = state.todoDate.findIndex((item) => item.id === id);

      return { ...state, todoDate: [...state.todoDate.slice(0, index), ...state.todoDate.slice(index + 1)] };
    });
    this.complitedCount();
  };

  complitedTodo = (id) => {
    this.setState((state) => {
      const index = state.todoDate.findIndex((item) => item.id === id);
      const complitedChange = { ...state.todoDate[index], complited: !state.todoDate[index].complited };

      return {
        ...state,
        todoDate: [...state.todoDate.slice(0, index), complitedChange, ...state.todoDate.slice(index + 1)],
      };
    });
    this.complitedCount();
  };

  editingTodo = (id) => {
    this.setState(({ todoDate }) => {
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

      return { todoDate: newData };
    });
  };

  saveEdit = (id, value) => {
    this.setState(({ todoDate }) => {
      const index = todoDate.findIndex((item) => item.id === id);
      const editingChange = { ...todoDate[index], description: value, editing: !todoDate[index].editing };

      return { todoDate: [...todoDate.slice(0, index), editingChange, ...todoDate.slice(index + 1)] };
    });
  };

  addTodo = (elem) => {
    this.setState((state) => {
      return { todoDate: [...state.todoDate, elem] };
    });
    this.complitedCount();
  };

  delComplited = () => {
    this.setState((state) => {
      return { todoDate: state.todoDate.filter((item) => !item.complited) };
    });
    this.complitedCount();
  };

  complitedCount = () => {
    this.setState((state) => {
      let compCount = 0;
      state.todoDate.forEach((item) => {
        if (!item.complited) {
          compCount += 1;
        }
      });

      return { ...state, compliteCount: compCount };
    });
  };

  timeUpdate = () => {
    const cb = () => {
      this.setState((state) => {
        const { todoDate } = this.state;
        const updateTime = todoDate.map((item) => {
          return {
            ...item,
            created: `created ${formatDistanceToNow(item.createdTime, { addSuffix: true, includeSeconds: true })}`,
          };
        });
        return { ...state, todoDate: updateTime };
      });
    };
    setInterval(cb, 5000);
  };

  setActive = (value) => {
    this.setState((state) => {
      return { ...state, activeBtn: value };
    });
  };

  render() {
    const { todoDate, compliteCount, activeBtn } = this.state;
    this.timeUpdate();
    return (
      <div className="App">
        <section className="todoapp">
          <Header addTodo={this.addTodo} />
          <section className="main">
            <TodoList
              deletElem={this.deleteElem}
              editingTodo={this.editingTodo}
              complitedTodo={this.complitedTodo}
              saveEdit={this.saveEdit}
              items={todoDate}
              activeBtn={activeBtn}
            />
            <Footer
              compliteCount={compliteCount}
              activeBtn={activeBtn}
              setActive={this.setActive}
              delComplited={this.delComplited}
            />
          </section>
        </section>
      </div>
    );
  }
}

export default App;

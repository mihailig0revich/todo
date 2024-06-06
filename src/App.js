import './App.css';
// eslint-disable-next-line import/order
import React, { Component } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import TodoList from './components/todoList/todoList';

class App extends Component {
  timer = React.createRef();

  playTimer = React.createRef();

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
          timer: null,
          play: false,
        },
        {
          id: 4,
          complited: false,
          description: 'Completed task',
          createdTime: Date.now(),
          created: 'created 0 seconds ago',
          editing: false,
          timer: 13,
          play: false,
        },
        {
          id: 1,
          complited: false,
          description: 'Completed task',
          createdTime: Date.now(),
          created: 'created 0 seconds ago',
          editing: false,
          timer: null,
          play: false,
        },
      ],
      compliteCount: 2,
      activeBtn: 'All',
    };
  }

  componentDidMount() {
    let todoDate = localStorage.getItem('todoDate');
    todoDate = JSON.parse(todoDate);
    if (todoDate) {
      this.setState({ todoDate });
    }
    this.timer.current = setInterval(this.timeUpdate, 5000);
    this.playTimer.current = setInterval(this.playTimeUpdate, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    const { todoDate } = this.state;
    if (todoDate.length !== prevState.todoDate.length) {
      clearInterval(this.timer.current);
      this.timer.current = setInterval(this.timeUpdate, 5000);
      clearInterval(this.playTimer.current);
      this.playTimer.current = setInterval(this.playTimeUpdate, 1000);
    }
  }

  async componentWillUnmount() {
    clearInterval(this.timer.current);
    clearInterval(this.playTimer.current);
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
    if (elem.description) {
      this.setState((state) => {
        return { todoDate: [...state.todoDate, elem] };
      });
      this.complitedCount();
    }
  };

  playHandler = (id) => {
    this.setState((state) => {
      const index = state.todoDate.findIndex((item) => item.id === id);
      const complitedChange = { ...state.todoDate[index], play: true };

      return {
        ...state,
        todoDate: [...state.todoDate.slice(0, index), complitedChange, ...state.todoDate.slice(index + 1)],
      };
    });
  };

  pauseHandler = (id) => {
    this.setState((state) => {
      const index = state.todoDate.findIndex((item) => item.id === id);
      const complitedChange = { ...state.todoDate[index], play: false };

      return {
        ...state,
        todoDate: [...state.todoDate.slice(0, index), complitedChange, ...state.todoDate.slice(index + 1)],
      };
    });
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

  playTimeUpdate = () => {
    this.setState((state) => {
      const { todoDate } = this.state;
      const updateTime = todoDate.map((item) => {
        const hasDecrement = !item.timer || item.timer === 0 || item.complited || item.play;
        if (!hasDecrement) {
          return {
            ...item,
            timer: item.timer - 1,
          };
        }
        if (item.timer === 0) {
          return {
            ...item,
            complited: true,
            timer: null,
          };
        }
        return { ...item };
      });
      localStorage.setItem('todoDate', JSON.stringify(updateTime));
      return { ...state, todoDate: updateTime };
    });
  };

  setActive = (value) => {
    this.setState((state) => {
      return { ...state, activeBtn: value };
    });
  };

  render() {
    const { todoDate, compliteCount, activeBtn } = this.state;
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
              playHandler={this.playHandler}
              pauseHandler={this.pauseHandler}
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

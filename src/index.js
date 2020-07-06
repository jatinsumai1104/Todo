import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

class TodoAdd extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addTodo(this.state.value);
    this.setState({ value: '' });
  }


  render() {
    return (
      <div className="todolist not-done" >
        <h1>Todos</h1>

        {/* Add Todo Form */}
        <form onSubmit={this.handleSubmit}>
          <input type="text" className="form-control add-todo" placeholder="Add todo" value={this.state.value} onChange={this.handleChange} />
        </form>


      </div>
    );
  }
}

class ListTodo extends React.Component {

  constructor(props) {
    super(props);

    this.handleOneTodoChange = this.handleOneTodoChange.bind(this);
  }

  handleOneTodoChange(event) {
    if (event.target.checked) {
      this.props.complete_one_todo(event.target.value);
    }

  }
  render() {
    let temp = [];

    this.props.todo_list.forEach(element => {
      temp.push(
        <li className="ui-state-default" key={element}>
          <div className="checkbox">
            <label><input type="checkbox" value={element} onChange={this.handleOneTodoChange} />{element}</label>
          </div>
        </li >
      );
    });

    return (
      <>
        <div className="text-center">
          < button id="checkAll" className="btn btn-danger btn-center" onClick={this.props.done_all_todo}> Mark All As Done</button >
        </div>
        <hr />
        <ul id="sortable" className="list-unstyled">
          {temp}
        </ul>
        <div className="todo-footer">
          <strong><span className="count-todos">{this.props.todo_list.length}</span></strong> Items Left
    </div>
      </>
    );
  }

}

class TodoAlreadyDone extends React.Component {


  render() {

    let temp = [];
    this.props.already_done_todo_list.forEach((element, index) => {
      temp.push(
        <li key={index}>{element}</li>
      );
    });

    return (
      // List of Todo Completed
      <div className="todolist">
        <h1>Already Done</h1>
        <div className="text-center">
          < button id="checkAll" className="btn btn-danger btn-center" onClick={this.props.delete_all_done_todo}> Delete All Done</button >
        </div>
        <ul id="done-items" className="list-unstyled">
          {temp}
        </ul>
      </div>
    );
  }
}

class Todo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      todo: [],
      already_done: [],
    };
  }

  addTodo = (todo) => {
    const todoArray = this.state.todo.slice();
    todoArray.push(todo);
    this.setState({ todo: todoArray });
  }

  completeOneTodo = (todo) => {
    let todos = this.state.todo.slice();
    let already_done = this.state.already_done.slice();
    let index = todos.indexOf(todo);
    if (index > -1) {
      todos.splice(index, 1);
      already_done.push(todo);
    }
    this.setState({
      todo: todos,
      already_done: already_done
    });
  }
  delete_all_done_todo = () => {
    this.setState({
      already_done: [],
    });
  }

  doneAllTodo = () => {
    let todo = this.state.todo.slice();
    let already_done = this.state.already_done.slice();

    this.setState({
      todo: [],
      already_done: already_done.concat(todo),
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <TodoAdd addTodo={this.addTodo} />
            <ListTodo todo_list={this.state.todo} done_all_todo={this.doneAllTodo} complete_one_todo={this.completeOneTodo} />
          </div>
          <div className="col-md-6">
            <TodoAlreadyDone already_done_todo_list={this.state.already_done} delete_all_done_todo={this.delete_all_done_todo} />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Todo />,
  document.getElementById('root')
)
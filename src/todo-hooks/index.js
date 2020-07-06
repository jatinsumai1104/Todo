import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

const TodoAdd = props => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addTodo(value);
    setValue('');
  }
  return (
    <div className="todolist not-done" >
      <h1>Todos</h1>

      {/* Todo Form */}
      <form onSubmit={handleSubmit}>
        <input type="text" className="form-control add-todo" placeholder="Add todo" value={value} onChange={handleChange} />
      </form>
    </div>
  );

}

const ListTodo = props => {

  const handleOneTodoChange = (event) => {
    if (event.target.checked) {
      props.complete_one_todo(event.target.value);
    }
  }

  let temp = [];

  props.todo_list.forEach(element => {
    temp.push(
      <li className="ui-state-default" key={element}>
        <div className="checkbox">
          <label><input type="checkbox" value={element} onChange={handleOneTodoChange} />{element}</label>
        </div>
      </li >
    );
  });

  return (
    <>
      <div className="text-center">
        < button id="checkAll" className="btn btn-danger btn-center" onClick={props.done_all_todo}> Mark All As Done</button >
      </div>
      <hr />
      <ul id="sortable" className="list-unstyled">
        {temp}
      </ul>
      <div className="todo-footer">
        <strong><span className="count-todos">{props.todo_list.length}</span></strong> Items Left
    </div>
    </>
  );
}


const TodoAlreadyDone = props => {
  let temp = [];
  props.already_done_todo_list.forEach((element, index) => {
    temp.push(
      <li key={index}>{element}</li>
    );
  });

  return (
    // List of Todo Completed
    <div className="todolist">
      <h1>Already Done</h1>
      <div className="text-center">
        < button id="checkAll" className="btn btn-danger btn-center" onClick={props.delete_all_done_todo}> Delete All Done</button >
      </div>
      <ul id="done-items" className="list-unstyled">
        {temp}
      </ul>
    </div>
  );
}

const Todo = props => {

  // constructor(props) {
  //   super(props);
  //   state = {
  //     todo: [],
  //     already_done: [],
  //   };
  // }

  const [todo, setTodo] = useState([]);
  const [already_done, setAlreadyDone] = useState([]);



  const addTodo = (todoText) => {
    const todoArray = todo.slice();
    todoArray.push(todoText);
    setTodo(todoArray);
  }

  const completeOneTodo = (todoText) => {
    let todos = todo.slice();
    let already_done_copy = already_done.slice();
    let index = todos.indexOf(todoText);
    if (index > -1) {
      todos.splice(index, 1);
      already_done_copy.push(todoText);
    }
    setTodo(todos);
    setAlreadyDone(already_done_copy);
  }

  const delete_all_done_todo = () => {
    setAlreadyDone([]);
  }

  const doneAllTodo = () => {
    setAlreadyDone(already_done.concat(todo));
    setTodo([]);
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <TodoAdd addTodo={addTodo} />
          <ListTodo todo_list={todo} done_all_todo={doneAllTodo} complete_one_todo={completeOneTodo} />
        </div>
        <div className="col-md-6">
          <TodoAlreadyDone already_done_todo_list={already_done} delete_all_done_todo={delete_all_done_todo} />
        </div>
      </div>
    </div>
  );
}


export default Todo;
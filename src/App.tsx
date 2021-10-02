/* eslint-disable max-len */
/* eslint-disable spaced-comment */
/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import TODOcomponent from './Components/TODOcomponent';

const initialTodo = [{
  id: 1,
  title: 'Buy milk',
  visible: true,
  completed: false,
}];

let lastId = 1;

type Todo = typeof initialTodo[0];

const App = () => {
  const [inputValue, setInputValue] = useState('');

  const ToastMessage = (message: string) => {
    toast(`${message} has been Deleted!`);
  };

  // eslint-disable-next-line no-unused-vars
  const [todo, setTodo] = useState(initialTodo);

  const [inputAllowed, allowInput] = useState(true);

  const stopTodo = () => {
    allowInput(!inputAllowed);
  };

  const completeTask = (index: number) => {
    const clonedArray: Todo[] = [...todo];
    clonedArray[index].completed = true;
    setTodo(clonedArray);
  };

  const addTodo = () => {
    if (!inputValue || !inputAllowed) return;
    lastId += 1;
    const clonedArray: Todo[] = [
      ...todo,
      {
        id: lastId,
        title: inputValue,
        visible: true,
        completed: false,
      },
    ];
    setTodo(clonedArray);
  };

  const deleteTodo = (id: number) => {
    let todoMessage = '';
    for (let i = 0; i < todo.length; i += 1) {
      if (todo[i].id === id) {
        todo[i].visible = false;
        todoMessage = todo[i].title;
        break;
      }
    }
    const clonedArray: Todo[] = [...todo];
    ToastMessage(todoMessage);
    setTodo(clonedArray);   
  };
  
  const inputElement = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    if (!inputElement.current) return;
    inputElement.current.focus();
  };

  useEffect(() => {
    focusInput();   
  }, [deleteTodo]);

  return (
    <div className="container">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addTodo();
        }}
        className="inputWrapper"
      >       
        <input
          className="input"
          type="text"
          placeholder="Buy milk"
          value={inputValue}
          ref={inputElement}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
        <button
          type="submit"
          className={inputAllowed ? 'button' : 'inactiveInput'}
          ///onClick={addTodo}
        >
          Submit
        </button>
        <button
          type="button"
          className={inputAllowed ? 'button' : 'inactiveInput'}
          onClick={stopTodo}
        >
          {inputAllowed ? 'STOP Submit' : 'START Submit'}
        </button>
        <ToastContainer />
      </form>
      <div className="itemWrapper">

        {todo.map(({ visible, id, title }, index) => (
          visible && (
            <TODOcomponent
              id={id}             
              title={title}
              onClickComplete={() => completeTask(index)}
              onClickDelete={() => deleteTodo(id)}
              disabled={!inputAllowed}
            />         
          )
        ))}
      </div>
    </div>
  );
};
export default App;

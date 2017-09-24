import React from 'react'
import {TodoItem} from './TodoItem'
import PropTypes from 'prop-types'


export const TodoList = (props) => (
  <div>
    <h2>Todo list here</h2>
    <div className="Todo-list">
      <ul>
        {props.todos.map(todo => <TodoItem handleToggle={props.handleToggle} key={todo.id} {...todo} removeList={props.removeList}/>)}
      </ul>
    </div>
  </div>
)

TodoList.propTypes = {
  todos: PropTypes.array.isRequired
}

import React from 'react';
import PropTypes from 'prop-types'

export const TodoForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <input type="text" className="Todo-input" onChange={props.handleInputChange} value={props.currentTodo}/>
  </form>
)

TodoForm.propTypes = {
  handleSubmit: PropTypes.func,
  handleInputChange: PropTypes.func
}

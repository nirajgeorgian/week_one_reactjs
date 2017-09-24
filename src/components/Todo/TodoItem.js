import React from 'react'
import {partial} from '../../lib/util'
import PropTypes from 'prop-types'

export const TodoItem = (props) => {
  const handletoggle = partial(props.handleToggle, props.id)
  const removeList = partial(props.removeList, props.id)
  return (
    <li>
      <a href='#' onClick={removeList}>remove</a>
      <input type="checkbox" onChange={handletoggle} checked={props.isComplete}/>{props.text}
    </li>
  )
}

TodoItem.propsTypes = {
  isComplete: PropTypes.bool,
  text: PropTypes.string
}

export const addTodo = (list, todo) => {
  return [...list, todo]
}

export const findById = (id, list) => {
  return list.find(item => item.id === id)
}

export const toggleTodo = (todo) => {
  return {
    ...todo, isComplete: !todo.isComplete
  }
}

export const updateTodo = (list, update) => {
  const updatedIndex = list.findIndex(item => item.id === update.id)
  return [
    ...list.slice(0, updatedIndex),
    update,
    ...list.slice(updatedIndex+1)
  ]
}

export const removeTodo = (id, todo) => {
  const todoIndex = todo.findIndex((list) => list.id === id)
  return [
    ...todo.slice(0, todoIndex),
    ...todo.slice(todoIndex + 1)
  ]
}

export const filterTodos = (list, route) => {
  switch(route) {
    case '/active':
      return list.filter((todo) => !todo.isComplete)
    case '/complete':
      return list.filter((todo) => todo.isComplete)
    default:
      return list
  }
}

export const generateId = () => Math.floor(Math.random() * 10000)

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import logo from './logo.svg';
import './App.css';
import { TodoForm, TodoList, Footer } from './components/Todo'
import {addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo, filterTodos} from './lib/todoHelper'
import {loadData, postData, DeleteData, UpdateData} from './lib/todoService'
import {pipe, partial} from './lib/util'

class App extends Component {
  state = {
    todos: [],
    currentTodo : ''
  }

  static contextTypes = {
    route: PropTypes.string
  }

  componentDidMount() {
    loadData()
      .then(todos => this.setState({todos}))
  }

  handleToggle = (id) => {
    const getToggledTodo = pipe(findById, toggleTodo)
    const updated = getToggledTodo(id, this.state.todos)
    const getUpdatedTodos = partial(updateTodo, this.state.todos)
    const updatedTodos = getUpdatedTodos(updated)
    this.setState({
      todos: updatedTodos
    })
    UpdateData(updated)
      
  }

  removeList = (id, event) => {
    event.preventDefault()
    const updatedList = removeTodo(id, this.state.todos)
    this.setState({
      todos: updatedList
    })
    DeleteData(id)
  }

  handleEmptySubmit = (event) => {
    event.preventDefault();
    this.setState({
      errorMessage: "Please provide a value"
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const newId = generateId();
    const newData = {id: newId, text: this.state.currentTodo, isComplete: false}
    const updatedData = addTodo(this.state.todos, newData)
    this.setState({
      todos: updatedData,
      currentTodo: '',
      errorMessage: ''
    })
    postData(newData)
      .then(() => this.showTempMessage("text added"))
    // this.state.currentTodo = ''
  }
  handleInputChange = (event) => {
    this.setState({
      currentTodo: event.target.value
    })
  }

  showTempMessage = (msg) => {
    this.setState({
      message: msg
    })
    setTimeout(() => {
      this.setState({message: ''})
    }, 2000)
  }

  render() {
    const currentSubmit = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit
    const filteredList = filterTodos(this.state.todos, this.context.route)

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Reactjs | Todo</h2>
          {this.state.errorMessage && <small> {this.state.errorMessage} </small>}
          {this.state.message && <small>{this.state.message}</small>}
        </div>
        <TodoForm handleInputChange={this.handleInputChange}
          currentTodo={this.state.currentTodo}
          handleSubmit={currentSubmit}
        />
        <TodoList handleToggle={this.handleToggle} todos={filteredList} removeList={this.removeList}/>
        <Footer />
      </div>
    );
  }
}

export default App;

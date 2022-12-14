// renderTodos
// generateTodoDOM
// generateSummaryDOM


import { getFilters } from './filters'
import { getTodos, toggleTodo, removeTodo } from './todos.js'


// Render application Todos
const renderTodos = () => {
  const todoDiv = document.querySelector( '#todos' )
  const filters = getFilters()
  let filteredTodos = getTodos().filter( ( todo ) => {
      const searchTextMatch = todo.text.toLowerCase().includes( filters.searchText.toLowerCase() )
      const hideCompletedMatch = !filters.hideCompleted || !todo.completed
      return searchTextMatch && hideCompletedMatch
  } )

  const incompleteTodos = filteredTodos.filter( ( todo ) => !todo.completed )

  todoDiv.innerHTML = ''

  const summary = generateSummaryDOM( incompleteTodos ) 
  todoDiv.appendChild( summary )
  
  if ( filteredTodos.length > 0 ) {
      filteredTodos.forEach( ( todo ) => {
          const todoEl = generateTodoDOM( todo )
          todoDiv.appendChild( todoEl )
      } )
  } else {
      const emptyMessage = document.createElement( 'p' )
      emptyMessage.textContent = '"No to-dos to show"'
      todoDiv.appendChild( emptyMessage )
      emptyMessage.classList.add( 'empty-message' )
  }
}


// Generate the DOM stucture for a todo
const generateTodoDOM = ( todo ) => {
  const todoEl = document.createElement( 'label' )
  const containerEl = document.createElement( 'div' )
  const todotext = document.createElement( 'span' )
  const checkbox = document.createElement( 'input' )
  const removeButton = document.createElement( 'button' )

  // Set up todo checkbox
  checkbox.setAttribute( 'type', 'checkbox' )
  checkbox.checked = todo.completed
  containerEl.appendChild( checkbox )
  checkbox.addEventListener( 'change', () => {
      toggleTodo( todo.id )
      renderTodos()
  } )

  // Set up todo text
  todotext.textContent = todo.text 
  containerEl.appendChild( todotext )

  // Set up container
  todoEl.classList.add( 'list-item' )
  containerEl.classList.add( 'list-item__container' )    
  todoEl.appendChild( containerEl )

  // Set up the remove button
  removeButton.textContent = 'Remove'
  removeButton.classList.add( 'button', 'button--text' )
  todoEl.appendChild( removeButton )
  removeButton.addEventListener( 'click', () => {
      removeTodo( todo.id )
      renderTodos()
  } )

  return todoEl
}


// Set up a summary for incomplete todo
const generateSummaryDOM = ( incompleteTodos ) => {
  const summary = document.createElement( 'h2' )
  const plural = incompleteTodos.length === 1 ? '' : 's'
  
  summary.textContent = `You have ${incompleteTodos.length} todo${plural} left !`
  summary.classList.add( 'list-title' )

  return summary
}

export { renderTodos, generateTodoDOM, generateSummaryDOM }
// Render initial todos
// Set up search text handler
// Set up checkbox handler
// Set up form submission handler
// Add a watcher for local storage


import { setFilters } from './filters'
import { createTodo, loadTodos } from './todos.js'
import { renderTodos } from './views.js'


renderTodos()


// Set up search text handler
document.querySelector( '#search-text' ).addEventListener( 'input', ( event ) => {
  setFilters({
    searchText: event.target.value
  })
  renderTodos()
} )


// Set up checkbox handler
document.querySelector( '#hide-completed' ).addEventListener( 'change', ( event ) => {
  setFilters({
    hideCompleted: event.target.checked
  })
  renderTodos()
} )


// Set up form submission handler
document.querySelector( '#new-todo' ).addEventListener( 'submit', ( event ) => {
  event.preventDefault()
  const text = event.target.elements.addTodo.value

  if ( text.length > 0 ) {
      createTodo( text )
      renderTodos ()
      event.target.elements.addTodo.value = ''
  }
} )


// Add a watcher for local storage
window.addEventListener( 'storage', ( event ) => {
  if( event.key === 'todos' ) {
    loadTodos()
    renderTodos()
  }
} )
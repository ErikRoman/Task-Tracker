// Set up index.html to load the bundle
// Make sure to load uuid via an npm module when necessary

// --

// Add necessary imports

// Render initial todos

// Set up search text handler

// Set up checkbox handler

// Set up form submission handler

// Add a watcher for local storage


import { setFilters } from './filters'
import { createTodo, loadTodos } from './todos.js'
import { renderTodos } from './views.js'


renderTodos()


document.querySelector( '#search-text' ).addEventListener( 'input', ( event ) => {
  setFilters({
    searchText: event.target.value
  })
  renderTodos()
} )


document.querySelector( '#hide-completed' ).addEventListener( 'change', ( event ) => {
  setFilters({
    hideCompleted: event.target.checked
  })
  renderTodos()
} )


// Add a new item via form
document.querySelector( '#new-todo' ).addEventListener( 'submit', ( event ) => {
  event.preventDefault()
  const text = event.target.elements.addTodo.value.trim()

  if ( text.length > 0 ) {
      createTodo( text )
      renderTodos ()
      event.target.elements.addTodo.value = ''
  }
} )


window.addEventListener( 'storage', ( event ) => {
  if( event.key === 'todos' ) {
    loadTodos()
    renderTodos()
  }
} )
import { createEffect, createSignal, For } from 'solid-js';
import TodoItem from './todoitem';
import { todos as tds } from '../../assets/data/todos';
import type {Todo} from '../../types';
import { createStore } from 'solid-js/store';
import { set } from 'astro:schema';




export default function TodosList() {
    
    function addTodo(title: string) {
        // using spread syntax
        // const newId = todoStore.count + 1;
        // const newTodo: Todo = {
            //     id: newId,
            //     item: title,
            //     completed: false,
            // };
            // setTodos("todos", (currentTodos) => [...currentTodos, newTodo]);
            // setTodos("count", newId);
            
            // using path syntax
            // The path syntax adds the new element by assigning it to the index equal
            //  to todoStore.todos.length, directly modifying the existing array.
            setTodos("todos", todoStore.todos.length, {
                //id: todoStore.todos.length, // bad
                id: Math.floor(Math.random() * 1000),
                item: title+todoStore.todos.length, // unique item name
                completed: false,
            })
            setTodos("count", todoStore.todos.length);
    }
    
    function setCompleted(id: number, completed: boolean) {
        console.log('Toggled todo with id:', id, 'to', completed);
        
        // setTodos("todos", todoStore.todos[id].id === id 
        //     ? {...todoStore.todos[id], completed} 
        //     : todoStore.todos[id] );

          setTodos(
            'todos',
            (task: Todo) => task.id === id,
            'completed',
            (completed) => !completed,
          )

        
        // setTodos("todos", [id], "completed", completed)
        // console.log ("after: ", todoStore.todos[id-1].item, todoStore.todos[id-1].completed);
        
        // using path syntax
        // setTodos("todos", [id], "completed", completed)
        // console.log ("after: ", todoStore.todos[id].item, todoStore.todos[id].completed);
    }
    
    function deleteTodo(id: number) {
      console.log('Deleted todo with id:', id);
    
    //  just testing adding a todo
    //   addTodo("New Task");

    //   setYourStore(yourStore.filter((someData) => someData.id !== removedData.id))

      setTodos("todos", todoStore.todos.filter(el => el.id !== id) );
      setTodos("count", todoStore.count - 1);
    }

// TODO: stores stuff looks at indices not ids --- CHECK THIS

//--------------------------------------------------------------------------
    //  const [todoStore, setTodos] = createStore( { todos: tds, count: 3 } );
  const [todoStore, setTodos] = createStore({ 
    todos: [...tds],
    count: 3 
  });


  createEffect(() => {
    console.log("Todos changed: ", todoStore.todos);
    console.log("Count is: ", todoStore.count);

    console.log('at(-1)', todoStore.todos.at(-1))
  });  

  return (
    <div class="bg-white dark:bg-gray-900 py-10 px-5">
      <h1 class="font-bold text-3xl text-center m-4">My To-Do List (Solid)</h1>
      <div class="max-w-xl mx-auto bg-gray-100 shadow-md rounded-lg p-5">
        {/* Todo items will go here */}



        <For each={todoStore.todos} fallback={<div>Loading...</div>}>
          {(todo) => <TodoItem  
                        key={todo.id} 
                        todo={todo}
                        onToggle={setCompleted}
                        onDelete={deleteTodo}
                      />
          }
        </For> 
      </div>
      <button onClick={ () => addTodo("New Task") } 
            class="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600">
            Add Todo
      </button>
    </div>
  );
}
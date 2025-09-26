import { For } from 'solid-js';
import TodoItem from './todoitem';
import { todos } from '../../assets/data/todos';

function setCompleted(id: number, completed: boolean) {
    console.log('Toggled todo with id:', id);
}

function deleteTodo(id: number) {
    console.log('Deleted todo with id:', id);
}


export default function TodosList() {
  return (
    <div class="bg-white dark:bg-gray-900 py-10 px-5">
      <h1 class="font-bold text-3xl text-center m-4">My To-Do List (Solid)</h1>
      <div class="max-w-xl mx-auto bg-gray-100 shadow-md rounded-lg p-5">
        {/* Todo items will go here */}
        {todos.map((todo) => (
            <TodoItem   
                key={todo.id} 
                todo={todo} 
                onToggle={setCompleted} 
                onDelete={deleteTodo}
            />
        ))}
        <For each={todos} fallback={<div>Loading...</div>}>
          {(todo) => <TodoItem  
                        key={todo.id} 
                        todo={todo}
                        onToggle={setCompleted}
                        onDelete={deleteTodo}
                      />
          }
        </For> 
      </div>
    </div>
  );
}
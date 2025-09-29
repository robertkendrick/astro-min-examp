// import {solid}   from 'solid-js';
import type {Todo} from  '../../types'


interface TodoItemProps {
  key: number;
  todo: Todo;
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
} 


//export function TodoItem(props: TodoItemProps ) {
export default function TodoItem(props: TodoItemProps ) {
  return (
    <div class="flex gap-3 p-4 m-4 border rounded-lg">
        <label class="flex gap-4">
          <input  type="checkbox" checked={props.todo.completed} 
            onChange={ (e) => props.onToggle(props.todo.id, e.currentTarget.checked) } 
            class="scale-200" 
          />
          <span class={props.todo.completed ? 'line-through text-gray-500' : ''}>{props.todo.item}</span>
        </label>
        <button onClick={ () => props.onDelete(props.todo.id)} 
            class="bg-gray-200 text-red-500 hover:text-red-700">
            Delete
        </button>
    </div>
  );
}
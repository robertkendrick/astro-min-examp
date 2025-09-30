import { For } from 'solid-js';
import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import '../../styles/global.css';
import { set } from 'astro:schema';

// This is implemented with Solidjs Stores

type Task = {
    id: number
    text: string
    completed: boolean
}

// const tds: Task[] = [
//     { id: 'a1', text: 'Learn Solid.js', completed: false },
//     { id: 'b2', text: 'Build a to-do app', completed: true },
//     { id: 'c3', text: 'Integrate LogRocket', completed: false },
// ]
const tds: Task[] = [
    { id: 1, text: 'Learn Solid.js', completed: false },
    { id: 2, text: 'Build a to-do app', completed: true },
    { id: 3, text: 'Integrate LogRocket', completed: false },
]


export default function LogRocketTodos() {
    // const [taskList, setTaskList] = createSignal([] as Task[])
    const [taskList, setTaskList] = createStore({ tasks: [] as Task[] })

    // setTaskList(...tds)
    setTaskList("tasks", tds)
    console.log('Initial tasks:', taskList.tasks)

    const toggleStatus = (taskId: number) => {
    setTaskList(
        'tasks',
        (task: Task) => task.id === taskId,   //A function to get the particular task we want to update
        'completed',                     //The property we want to update             
        (completed) => !completed,        //A function that takes the current value of the property and returns the new value   
    )
    }

    // const deleteTask = (id: string) => {
    //     const updatedTasks = taskList.filter((task) => task.id !== id)
    //     setTaskList(updatedTasks)
    // }
    const deleteTask = (taskId: number) => {
        // setTaskList(
        //     'tasks',
        //     (task: Task) => task.id === taskId,  //A function to get the particular task we want to delete
        //     undefined!                           // In TypeScript, you can delete a value by using a non-null assertion, like undefined!.
        // )

        setTaskList("tasks", taskList.tasks.filter(el => el.id !== taskId))
    }
    
    const addTask = (e: Event) => {
        e.preventDefault()
        console.log('************* adding task *************')
        const form = e.target as HTMLFormElement
        const input = form.taskInput as HTMLInputElement
        console.log(input.value)
        const newTask: Task = { 
//            id: Math.random().toString(36).substring(2), 
            id: Math.random(),
            text: input.value, 
            completed: false,
        }
        // setTaskList([...taskList(), newTask])
        setTaskList("tasks", (currentTasks) => [...currentTasks, newTask]);
        form.reset()
        input.focus()
    }
    
    return (
        <div class="container border mt-5 text-center">
            <h1 class="text-4xl mb-4">Whattodo!</h1>
            <form method="post" accept-charset="utf-8" class="mb-5" onSubmit={(e) => addTask(e)}>
                <input type="text" class="border p-1 w-md" placeholder="Add task here..." id="taskInput" required />
                <button class="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600" type="submit">
                Add task
                </button>
            </form>
            <div>
                <h4 class="text-3xl mb-4">Your Tasks...</h4>
                <div class="max-w-xl mx-auto bg-gray-100 shadow-md rounded-lg p-5">
                <For each={taskList.tasks}>
                {(task: Task) => (
                    <div class="flex mb-3 text-center items-center">
                    <button class="border px-4 py-2 bg-slate-200 rounded-md text-red-500 w-auto" 
                        onclick={() => deleteTask(task.id)}>
                        delete
                    </button>
                    <div class={`bg-slate-200 w-md p-2 mx-2 ${task?.completed && `line-through`}`}>
                        {task?.text}
                    </div>
                    <input
                        type="checkbox"
                        checked={task?.completed}
                        role="button"
                        class="h-auto px-3 scale-150"
                        onClick={() => {
                        toggleStatus(task.id)
                        }}
                    />
                    </div>
                )}
                </For>
                </div>
            </div>
            </div>
        )
}
  
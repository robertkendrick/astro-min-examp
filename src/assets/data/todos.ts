interface Todos {
  id: number;
  item: string;
  completed: boolean;
}

export const todos = [
    {
        id: Math.floor(Math.random() * 1000),
        item: 'Learn Astro',
        completed: false,
    },
    {   id: Math.floor(Math.random() * 1000), 
        item: 'Build a project', 
        completed: true
    },
    {  id: Math.floor(Math.random() * 1000), 
        item: 'Deploy to production', 
        completed: false
    }
]

interface Todos {
  id: number;
  item: string;
  completed: boolean;
}

export const todos = [
    {
        id: 0,
        item: 'Learn Astro',
        completed: false,
    },
    {   id: 1, 
        item: 'Build a project', 
        completed: true
    },
    {  id: 2, 
        item: 'Deploy to production', 
        completed: false
    }
]

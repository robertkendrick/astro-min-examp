interface Todos {
  id: number;
  item: string;
  completed: boolean;
}

export const todos = [
    {
        id: 1,
        item: 'Learn Astro',
        completed: false,
    },
    {   id: 2, 
        item: 'Build a project', 
        completed: true
    },
    {  id: 3, 
        item: 'Deploy to production', 
        completed: false
    }
]

import { createAtom, useAtom } from "../index";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const todosAtom = createAtom<Todo[]>("todos", []);

export function Todos() {
  const [todos, setTodos] = useAtom(todosAtom);

  const addTodo = () => {
    setTodos([
      ...todos,
      {
        id: todos.length,
        text: `Todo ${todos.length}`,
        completed: false,
      },
    ]);
  };

  return (
    <div>
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => {
                setTodos(
                  todos.map((t) =>
                    t.id === todo.id ? { ...t, completed: !t.completed } : t
                  )
                );
              }}
            />
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

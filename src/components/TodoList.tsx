import useTodos from "../hooks/useTodos";

const TodoList = () => {

  const { data: todos, error,isLoading } = useTodos()

  if(isLoading) return <p>Loading...</p>
  if (error) return <p className="text-red-400 font-bold">{error.message}</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        📝 Todo List
      </h2>

      <ul className="space-y-3">
        {todos?.map((todo) => (
          <li
            key={todo.id}
            className={`p-4 rounded-lg shadow flex items-center justify-between ${
              todo.completed ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <span className="text-gray-700">{todo.title}</span>
            <span
              className={`text-sm font-semibold ${
                todo.completed ? "text-green-600" : "text-red-600"
              }`}
            >
              {todo.completed ? "✅ Done" : "❌ Pending"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

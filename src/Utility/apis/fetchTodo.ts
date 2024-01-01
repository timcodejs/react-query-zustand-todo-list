const fetchTodoList = async () => {
  return await fetch('/todos')
    .then((res: any) => res.json())
    .then((data) => data);
};

const fetchTodoPost = async (json: any) => {
  return await fetch('/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(json),
  })
    .then((res: any) => res.json())
    .then((data) => data);
};

const fetchTodoDelete = async (json: any) => {
  return await fetch(`/todos/${json?.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: json?.id }),
  })
    .then((res: any) => res.json())
    .then((data) => data);
};

const fetchTodoUpdate = async (json: any) => {
  return await fetch(`/todos/${json?.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(json),
  })
    .then((res: any) => res.json())
    .then((data) => data);
};

export { fetchTodoList, fetchTodoPost, fetchTodoDelete, fetchTodoUpdate };

const fetchTodoList = () =>
  fetch('/todos')
    .then((res: any) => res.json())
    .then((data) => data);

const fetchTodoPost = (json: any) =>
  fetch('/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(json),
  })
    .then((res: any) => res.json())
    .then((data) => data);

const fetchTodoDelete = (id: number) =>
  fetch(`/todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id }),
  })
    .then((res: any) => res.json())
    .then((data) => data);

const fetchTodoUpdate = (json: any) =>
  fetch(`/todos/${json?.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(json),
  })
    .then((res: any) => res.json())
    .then((data) => data);

export { fetchTodoList, fetchTodoPost, fetchTodoDelete, fetchTodoUpdate };

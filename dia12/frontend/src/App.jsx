import { useEffect, useState } from 'react'


function App() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:3000/tasks',
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer your_token_here'
        }
      })
      .then(response => response.json())
      .then(data => {
        setTasks(data)
      })
      .catch(error => {
        console.error('Error fetching tasks:', error)
      })
  }, []);

  function handleAddTask(event) {
    event.preventDefault();
    const name  = event.target[0].value;
    const descripion = event.target[1].value; 

    fetch('http://127.0.0.1:3000/tasks
    };
  return (
    <>
      <h1>Task List</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.name} - {task.description}</li>
        ))}
      </ul>

      <h2>Add Task</h2>
      <form onSubmit={handleAddTask}>
        <input type="text" placeholder="Task Name" required />
        <input type="text" placeholder="Task Description" required />
        <button type="submit">Add Task</button>
      </form> 

    </>
  )
}

export default App

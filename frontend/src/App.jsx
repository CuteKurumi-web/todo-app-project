import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  const fetchTodos = async () => {
    const res = await axios.get('/api/todos') // 주소 수정됨
    setTodos(res.data)
  }

  useEffect(() => { fetchTodos() }, [])

  const addTodo = async () => {
    if (!input) return
    await axios.post('/api/todos', { title: input }) // 주소 수정됨
    setInput('')
    fetchTodos()
  }

  const toggleTodo = async (id, completed) => {
    await axios.put(`/api/todos/${id}`, { completed: !completed }) // 주소 수정됨
    fetchTodos()
  }

  const deleteTodo = async (id) => {
    await axios.delete(`/api/todos/${id}`) // 주소 수정됨
    fetchTodos()
  }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h1>✅ My Todo App</h1>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTodo}>추가</button>
      {todos.map(t => (
        <div key={t._id} style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <span style={{ textDecoration: t.completed ? 'line-through' : 'none' }} onClick={() => toggleTodo(t._id, t.completed)}>
            {t.title}
          </span>
          <button onClick={() => deleteTodo(t._id)}>삭제</button>
        </div>
      ))}
    </div>
  )
}

export default App
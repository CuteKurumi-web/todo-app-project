import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  // 1. 목록 가져오기 (Read)
  const fetchTodos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/todos')
      setTodos(res.data)
    } catch (err) {
      console.error("데이터 로딩 실패", err)
    }
  }

  useEffect(() => { fetchTodos() }, [])

  // 2. 추가하기 (Create)
  const addTodo = async () => {
    if (!input) return
    try {
      await axios.post('http://localhost:5000/api/todos', { title: input })
      setInput('')
      fetchTodos()
    } catch (err) {
      console.error("추가 실패", err)
    }
  }

  // 3. 완료 체크박스 토글 (Update)
  const toggleTodo = async (id, completed) => {
    try {
      await axios.put(`http://localhost:5000/api/todos/${id}`, { completed: !completed })
      fetchTodos()
    } catch (err) {
      console.error("수정 실패", err)
    }
  }

  // 4. 삭제하기 (Delete)
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`)
      fetchTodos()
    } catch (err) {
      console.error("삭제 실패", err)
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>✅ Todo List</h1>
      
      <div style={{ display: 'flex', gap: '5px', marginBottom: '20px' }}>
        <input 
          style={{ flex: 1, padding: '10px' }}
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="할 일을 입력하세요"
        />
        <button onClick={addTodo} style={{ padding: '10px', cursor: 'pointer' }}>추가</button>
      </div>

      <div style={{ textAlign: 'left' }}>
        {todos.map(t => (
          <div key={t._id} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            padding: '10px', 
            borderBottom: '1px solid #eee',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input 
                type="checkbox" 
                checked={t.completed} 
                onChange={() => toggleTodo(t._id, t.completed)}
              />
              <span style={{ textDecoration: t.completed ? 'line-through' : 'none', color: t.completed ? '#ccc' : '#000' }}>
                {t.title}
              </span>
            </div>
            <button onClick={() => deleteTodo(t._id)} style={{ border: 'none', background: 'none', color: 'red', cursor: 'pointer' }}>
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
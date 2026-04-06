const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 로컬 몽고DB 연결 (인터넷 차단 걱정 없음!)
const MONGO_URI = "mongodb://127.0.0.1:27017/todoDB";

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB 연결 성공 (Local)'))
  .catch(err => console.log('❌ 연결 실패:', err));

// Todo 스키마 (제목 + 완료 여부)
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false }
});
const Todo = mongoose.model('Todo', todoSchema);

// API 1: 목록 가져오기
app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// API 2: 추가하기
app.post('/api/todos', async (req, res) => {
  const newTodo = new Todo({ title: req.body.title });
  await newTodo.save();
  res.json(newTodo);
});

// API 3: 완료 체크 수정하기
app.put('/api/todos/:id', async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(
    req.params.id, 
    { completed: req.body.completed }, 
    { new: true }
  );
  res.json(todo);
});

// API 4: 삭제하기
app.delete('/api/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: '삭제 완료' });
});

app.listen(5000, () => console.log('🚀 백엔드 실행: http://localhost:5000'));
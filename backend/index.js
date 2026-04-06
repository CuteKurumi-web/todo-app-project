const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 환경변수(Vercel) 주소를 먼저 쓰고, 없으면 로컬 주소 사용
const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/todoDB";

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ DB 연결 성공!'))
  .catch(err => console.log('❌ DB 연결 에러:', err));

const Todo = mongoose.model('Todo', new mongoose.Schema({
  title: String,
  completed: { type: Boolean, default: false }
}));

app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/api/todos', async (req, res) => {
  const newTodo = new Todo({ title: req.body.title });
  await newTodo.save();
  res.json(newTodo);
});

app.put('/api/todos/:id', async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, { completed: req.body.completed }, { new: true });
  res.json(todo);
});

app.delete('/api/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: '삭제 완료' });
});

// Vercel 배포를 위한 설정
if (process.env.NODE_ENV !== 'production') {
  app.listen(5000, () => console.log('🚀 서버 실행 중'));
}

module.exports = app;
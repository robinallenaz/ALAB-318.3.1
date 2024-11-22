const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Data storage
const users = [];
const posts = [];
const comments = [];

// Helper function to find by ID
const findById = (arr, id) => arr.find(item => item.id === parseInt(id));

// Root routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

app.get('/api', (req, res) => {
  res.json({ message: 'API is running' });
});

// User routes
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    ...req.body
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.get('/api/users/:id', (req, res) => {
  const user = findById(users, req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

app.patch('/api/users/:id', (req, res) => {
  const user = findById(users, req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  Object.assign(user, req.body);
  res.json(user);
});

app.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex(user => user.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'User not found' });
  users.splice(index, 1);
  res.status(204).send();
});

// Post routes
app.get('/api/posts', (req, res) => {
  const { userId } = req.query;
  if (userId) {
    const userPosts = posts.filter(post => post.userId === parseInt(userId));
    return res.json(userPosts);
  }
  res.json(posts);
});

app.post('/api/posts', (req, res) => {
  const newPost = {
    id: posts.length + 1,
    ...req.body
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.get('/api/posts/:id', (req, res) => {
  const post = findById(posts, req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
});

app.patch('/api/posts/:id', (req, res) => {
  const post = findById(posts, req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  Object.assign(post, req.body);
  res.json(post);
});

app.delete('/api/posts/:id', (req, res) => {
  const index = posts.findIndex(post => post.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Post not found' });
  posts.splice(index, 1);
  res.status(204).send();
});

// User posts routes
app.get('/api/users/:id/posts', (req, res) => {
  const userPosts = posts.filter(post => post.userId === parseInt(req.params.id));
  res.json(userPosts);
});

// Comment routes
app.get('/comments', (req, res) => {
  const { userId, postId } = req.query;
  let filteredComments = [...comments];
  
  if (userId) {
    filteredComments = filteredComments.filter(comment => comment.userId === parseInt(userId));
  }
  if (postId) {
    filteredComments = filteredComments.filter(comment => comment.postId === parseInt(postId));
  }
  
  res.json(filteredComments);
});

app.post('/comments', (req, res) => {
  const newComment = {
    id: comments.length + 1,
    ...req.body
  };
  comments.push(newComment);
  res.status(201).json(newComment);
});

app.get('/comments/:id', (req, res) => {
  const comment = findById(comments, req.params.id);
  if (!comment) return res.status(404).json({ message: 'Comment not found' });
  res.json(comment);
});

app.patch('/comments/:id', (req, res) => {
  const comment = findById(comments, req.params.id);
  if (!comment) return res.status(404).json({ message: 'Comment not found' });
  if (req.body.body) comment.body = req.body.body;
  res.json(comment);
});

app.delete('/comments/:id', (req, res) => {
  const index = comments.findIndex(comment => comment.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Comment not found' });
  comments.splice(index, 1);
  res.status(204).send();
});

// Post comments routes
app.get('/posts/:id/comments', (req, res) => {
  const { userId } = req.query;
  let postComments = comments.filter(comment => comment.postId === parseInt(req.params.id));
  
  if (userId) {
    postComments = postComments.filter(comment => comment.userId === parseInt(userId));
  }
  
  res.json(postComments);
});

// User comments routes
app.get('/users/:id/comments', (req, res) => {
  const { postId } = req.query;
  let userComments = comments.filter(comment => comment.userId === parseInt(req.params.id));
  
  if (postId) {
    userComments = userComments.filter(comment => comment.postId === parseInt(postId));
  }
  
  res.json(userComments);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

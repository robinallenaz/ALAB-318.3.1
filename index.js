import './public/output.css';

const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const initializePassport = require('./passport-config');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// Dummy user data
const users = [];

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Initialize Passport
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
);

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500,
    },
  });
});

// Authentication Routes
app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      email: req.body.email,
      password: hashedPassword
    });
    res.redirect('/login');
  } catch {
    res.redirect('/register');
  }
});

// Root routes
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="/output.css" rel="stylesheet">
      <title>Welcome</title>
    </head>
    <body class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="text-center">
        <h1 class="text-3xl font-bold animate-fade-in">Welcome to the App</h1>
        <form action="/login" method="post" class="mt-6 animate-slide-up">
          <input type="email" name="email" placeholder="Email" class="block mb-2 p-2 border border-gray-300 rounded">
          <input type="password" name="password" placeholder="Password" class="block mb-4 p-2 border border-gray-300 rounded">
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Login</button>
        </form>
      </div>
    </body>
    </html>
  `);
});

// Catch-all route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: 'Endpoint not found',
      status: 404,
    },
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
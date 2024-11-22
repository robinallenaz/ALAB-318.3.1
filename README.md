# RESTful API Lab

This is a RESTful API that manages users, posts, and comments.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm run dev
```

The server will start on http://localhost:3000

## Available Routes

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/users/:id` - Get a specific user
- `PATCH /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user
- `GET /api/users/:id/posts` - Get all posts by a user

### Posts
- `GET /api/posts` - Get all posts (can filter by userId query parameter)
- `POST /api/posts` - Create a new post
- `GET /api/posts/:id` - Get a specific post
- `PATCH /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post

### Comments
- `GET /comments` - Get all comments (can filter by userId or postId query parameters)
- `POST /comments` - Create a new comment
- `GET /comments/:id` - Get a specific comment
- `PATCH /comments/:id` - Update a comment
- `DELETE /comments/:id` - Delete a comment
- `GET /posts/:id/comments` - Get all comments on a post (can filter by userId)
- `GET /users/:id/comments` - Get all comments by a user (can filter by postId)

# Blog API

This is a **Node.js** RESTful API project using **Sequelize** as the ORM, focused on creating and managing users, posts, and categories for a blog.
The project was developed as part of an academic challenge, with the goal of applying concepts such as **database modeling**, **table relationships**, **full CRUD operations**, **authentication validation**, and development best practices using Express.js and Sequelize.

---

### Technologies Used

- Node.js  
- Express.js  
- Sequelize  
- MySQL  
- JSON Web Token (JWT)  
- Docker  
- ESLint + Airbnb Style Guide  

---

### Project Structure

- `src/models/`: Sequelize models using functional syntax  
- `src/migrations/`: Migrations to generate database tables  
- `src/controllers/`: Endpoint logic  
- `src/services/`: Business logic  
- `src/middlewares/`: Reusable middlewares including authentication  
- `src/routes/`: API routes and endpoints  

---

### Implemented Validations

- Presence and format validation for email, password, and user name  
- JWT token verification for protected endpoints  
- Permission restrictions: only the post author can edit or delete their own posts  
- Standardized error messages according to project specifications  

---

### Tips and Learnings

- Using **middlewares** to centralize JWT authentication  
- Creating **Sequelize associations** (`1:N`, `N:N`) with `belongsTo`, `hasMany`, and `belongsToMany`  
- Implementing search queries using `Sequelize.Op.like`  
- Using **transactions** to ensure integrity in many-to-many relationships  

---

### How to run the project

#### Prerequisites
- Node.js >= 16.0.0
- Docker and Docker Compose
- MySQL (or use Docker MySQL service)

#### Installation and Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/maisacmoraes/nodejs-api-blog.git
   cd nodejs-api-blog
   ```

2. **Using Docker (Recommended)**
   ```bash
   docker-compose up -d --build
   docker exec -it blogs_api bash
   npm install
   npm run dev
   ```

3. **Local Development Setup**
   ```bash
   npm install
   npm run predev  # Creates database and runs migrations
   npm run dev     # Starts development server
   ```

#### Environment Variables
Create a `.env` file in the root directory:
```env
NODE_ENV=development
API_PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_NAME=blogs_api
DB_USER=root
DB_PASSWORD=password
JWT_SECRET=your_jwt_secret_here
```

#### Available Scripts
- `npm run dev` - Start development server with nodemon
- `npm test` - Run all tests
- `npm run test-coverage` - Run tests with coverage report
- `npm run lint` - Run ESLint
- `npm run seed` - Seed database with sample data

---

### API Endpoints

#### Authentication
- `POST /login` - User login
  ```json
  {
    "email": "user@example.com",
    "password": "123456"
  }
  ```

#### Users
- `GET /user` - Get all users (requires authentication)
- `GET /user/:id` - Get user by ID (requires authentication)
- `POST /user` - Create new user
  ```json
  {
    "displayName": "John Doe",
    "email": "john@example.com",
    "password": "123456",
    "image": "http://example.com/image.jpg"
  }
  ```
- `DELETE /user/me` - Delete current user (requires authentication)

#### Categories
- `GET /categories` - Get all categories (requires authentication)
- `POST /categories` - Create new category (requires authentication)
  ```json
  {
    "name": "Technology"
  }
  ```

#### Posts
- `GET /post` - Get all posts (requires authentication)
- `GET /post/:id` - Get post by ID (requires authentication)
- `GET /post/search?q=searchTerm` - Search posts (requires authentication)
- `POST /post` - Create new post (requires authentication)
  ```json
  {
    "title": "My Post Title",
    "content": "Post content here...",
    "categoryIds": [1, 2]
  }
  ```
- `PUT /post/:id` - Update post (requires authentication and ownership)
- `DELETE /post/:id` - Delete post (requires authentication and ownership)

#### Response Format
All responses follow a consistent JSON format:
```json
{
  "id": 1,
  "title": "Post Title",
  "content": "Post content",
  "userId": 1,
  "published": "2023-01-01T00:00:00.000Z",
  "updated": "2023-01-01T00:00:00.000Z",
  "user": {
    "id": 1,
    "displayName": "John Doe",
    "email": "john@example.com",
    "image": "http://example.com/image.jpg"
  },
  "categories": [
    {
      "id": 1,
      "name": "Technology"
    }
  ]
}
```

---

### Troubleshooting

#### Common Issues

**Database Connection Error**
- Ensure MySQL is running (if using local setup)
- Check database credentials in environment variables
- Run `npm run predev` to create database and run migrations

**Port Already in Use**
- Change the `API_PORT` in your environment variables
- Kill existing processes: `npm run kill:test`

**JWT Token Issues**
- Ensure `JWT_SECRET` is set in environment variables
- Check token format in Authorization header: `Bearer <token>`

**Docker Issues**
- Ensure Docker and Docker Compose are installed
- Run `docker-compose down` then `docker-compose up -d --build`

#### Development Tips
- Use `npm run dev` for hot reloading during development
- Run `npm run lint` before committing changes
- Use `npm run test-coverage` to check test coverage
- Check logs in Docker: `docker logs blogs_api`

---

#### 📝 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

Feel free to use, modify, and distribute this project with proper attribution

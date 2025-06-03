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

   ```
   git clone https://github.com/your-username/blog-api.git
   cd blog-api
   docker-compose up -d --build
   docker exec -it blogs_api bash
   npm install
   npm run dev
   ```
---

#### 📝 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

Feel free to use, modify, and distribute this project with proper attribution

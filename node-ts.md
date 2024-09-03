Setting up Node.js with TypeScript for a production-level setup involves several key steps, from initializing your project to configuring TypeScript and setting up build and deployment processes. Here's a step-by-step guide:

### 1. **Initialize the Project**
   Start by creating a new directory for your project and initializing it with npm.

   ```bash
   mkdir my-node-ts-app
   cd my-node-ts-app
   npm init -y
   ```

### 2. **Install Dependencies**
   You'll need to install TypeScript and other essential packages:

   ```bash
   npm install typescript ts-node @types/node --save-dev
   ```

   - `typescript`: TypeScript compiler.
   - `ts-node`: Allows you to run TypeScript directly without pre-compiling it.
   - `@types/node`: Provides TypeScript type definitions for Node.js.

### 3. **Create a `tsconfig.json` File**
   Initialize TypeScript configuration by creating a `tsconfig.json` file:

   ```bash
   npx tsc --init
   ```

   Customize the `tsconfig.json` file for production. Here’s a basic setup:

   ```json
   {
     "compilerOptions": {
       "target": "ES2020",
       "module": "commonjs",
       "strict": true,
       "esModuleInterop": true,
       "outDir": "./dist",
       "rootDir": "./src",
       "sourceMap": true,
       "noImplicitAny": true,
       "moduleResolution": "node",
       "resolveJsonModule": true,
       "skipLibCheck": true
     },
     "include": ["src/**/*.ts"],
     "exclude": ["node_modules", "**/*.spec.ts"]
   }
   ```

   - `outDir`: Specifies the output directory for compiled JavaScript files.
   - `rootDir`: Specifies the root directory for TypeScript files.

### 4. **Set Up Your Project Structure**
   Create a basic structure for your project:

   ```
   my-node-ts-app/
   ├── src/
   │   ├── index.ts
   ├── dist/
   ├── node_modules/
   ├── tsconfig.json
   ├── package.json
   ```

   - `src/index.ts`: Your main entry file.

### 5. **Add Scripts to `package.json`**
   Add build and start scripts to your `package.json`:

   ```json
   "scripts": {
     "build": "tsc",
     "start": "node dist/index.js",
     "dev": "ts-node src/index.ts",
     "clean": "rm -rf dist"
   }
   ```

   - `build`: Compiles TypeScript files to JavaScript.
   - `start`: Runs the compiled JavaScript code.
   - `dev`: Runs the TypeScript code directly (useful for development).
   - `clean`: Cleans up the `dist` directory.

### 6. **Write TypeScript Code**
   In `src/index.ts`, add some basic TypeScript code:

   ```typescript
   const message: string = 'Hello, TypeScript!';
   console.log(message);
   ```

### 7. **Build and Run**
   To build your project, run:

   ```bash
   npm run build
   ```

   Then, start your application with:

   ```bash
   npm start
   ```

### 8. **Set Up Linting and Formatting**
   To maintain code quality, set up ESLint and Prettier:

   ```bash
   npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
   npm install prettier eslint-config-prettier eslint-plugin-prettier --save-dev
   ```

   Create an `.eslintrc.json` file:

   ```json
   {
     "parser": "@typescript-eslint/parser",
     "parserOptions": {
       "ecmaVersion": 2020,
       "sourceType": "module"
     },
     "plugins": ["@typescript-eslint"],
     "extends": [
       "eslint:recommended",
       "plugin:@typescript-eslint/recommended",
       "prettier"
     ],
     "rules": {
       "prettier/prettier": "error"
     }
   }
   ```

   Create a `.prettierrc` file:

   ```json
   {
     "singleQuote": true,
     "trailingComma": "all"
   }
   ```

   Add linting and formatting scripts to `package.json`:

   ```json
   "scripts": {
     "lint": "eslint 'src/**/*.{js,ts}'",
     "format": "prettier --write 'src/**/*.{js,ts}'"
   }
   ```

   Run linting with:

   ```bash
   npm run lint
   ```

   Format code with:

   ```bash
   npm run format
   ```

### 9. **Set Up Testing (Optional)**
   For testing, you can set up Jest with TypeScript support:

   ```bash
   npm install jest ts-jest @types/jest --save-dev
   ```

   Create a `jest.config.js` file:

   ```javascript
   module.exports = {
     preset: 'ts-jest',
     testEnvironment: 'node',
   };
   ```

   Add a test script to `package.json`:

   ```json
   "scripts": {
     "test": "jest"
   }
   ```

### 10. **Prepare for Deployment**
   - **Environment Variables:** Use a package like `dotenv` to manage environment variables.
   - **Process Management:** Use `PM2` or a similar tool for managing your Node.js processes in production.
   - **Build Automation:** Consider using CI/CD pipelines to automate testing, building, and deployment.

   Example for a `.env` file:

   ```
   NODE_ENV=production
   PORT=3000
   ```

   To load environment variables, install `dotenv`:

   ```bash
   npm install dotenv
   ```

   Load it in your `src/index.ts`:

   ```typescript
   import dotenv from 'dotenv';

   dotenv.config();

   const port = process.env.PORT || 3000;
   console.log(`Server is running on port ${port}`);
   ```

This setup provides a solid foundation for building and deploying a TypeScript-based Node.js application in production.


# Updated 

To create a proper folder structure for the "forgot password" feature in your Node.js project with TypeScript and Express, you can organize your project as follows:

### 1. **Project Folder Structure**

Here's a suggested folder structure for your project:

```
my-node-ts-app/
├── src/
│   ├── controllers/
│   │   ├── authController.ts
│   ├── services/
│   │   ├── authService.ts
│   ├── models/
│   │   ├── userModel.ts
│   ├── routes/
│   │   ├── authRoutes.ts
│   ├── middlewares/
│   │   ├── authMiddleware.ts
│   ├── utils/
│   │   ├── email.ts
│   ├── config/
│   │   ├── db.ts
│   │   ├── env.ts
│   ├── app.ts
│   ├── index.ts
├── dist/
├── node_modules/
├── tsconfig.json
├── package.json
├── .env
```

### 2. **Detailed Breakdown**

#### `src/controllers/authController.ts`

This file handles the request and response logic for the forgot password feature.

```typescript
import { Request, Response } from 'express';
import { forgotPassword, resetPassword } from '../services/authService';

export const handleForgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    await forgotPassword(email);
    res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const handleResetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;
  try {
    await resetPassword(token, newPassword);
    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

#### `src/services/authService.ts`

This file contains the business logic for the forgot password and reset password processes.

```typescript
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { sendPasswordResetEmail } from '../utils/email';
import { getUserByEmail, updateUserPassword, saveResetToken } from '../models/userModel';

export const forgotPassword = async (email: string) => {
  const user = await getUserByEmail(email);
  if (!user) throw new Error('User not found');

  const resetToken = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  await saveResetToken(email, resetToken);

  const resetURL = `http://your-frontend-url.com/reset-password?token=${resetToken}`;
  await sendPasswordResetEmail(email, resetURL);
};

export const resetPassword = async (token: string, newPassword: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
  const user = await getUserByEmail(decoded.email);
  if (!user || user.resetToken !== token) throw new Error('Invalid or expired token');

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await updateUserPassword(user.email, hashedPassword);
};
```

#### `src/models/userModel.ts`

This file interacts with the database to manage user data. For simplicity, a mock database is used here.

```typescript
type User = { email: string; password: string; resetToken?: string };

const users: { [key: string]: User } = {
  'user@example.com': { email: 'user@example.com', password: 'hashed_password' },
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return users[email] || null;
};

export const saveResetToken = async (email: string, resetToken: string): Promise<void> => {
  if (users[email]) {
    users[email].resetToken = resetToken;
  }
};

export const updateUserPassword = async (email: string, password: string): Promise<void> => {
  if (users[email]) {
    users[email].password = password;
    delete users[email].resetToken;
  }
};
```

#### `src/routes/authRoutes.ts`

This file defines the routes for authentication, including the forgot password and reset password routes.

```typescript
import { Router } from 'express';
import { handleForgotPassword, handleResetPassword } from '../controllers/authController';

const router = Router();

router.post('/forgot-password', handleForgotPassword);
router.post('/reset-password', handleResetPassword);

export default router;
```

#### `src/middlewares/authMiddleware.ts`

Middleware for any additional authentication checks, if needed. For instance, you might add middleware to protect certain routes.

```typescript
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
```

#### `src/utils/email.ts`

Utility functions for sending emails.

```typescript
import nodemailer from 'nodemailer';

export const sendPasswordResetEmail = async (email: string, resetURL: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Support" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Password Reset',
    html: `<p>You requested a password reset</p><p>Click this <a href="${resetURL}">link</a> to reset your password</p>`,
  });
};
```

#### `src/config/env.ts`

Configuration for environment variables.

```typescript
import dotenv from 'dotenv';

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET!;
export const EMAIL_HOST = process.env.EMAIL_HOST!;
export const EMAIL_PORT = process.env.EMAIL_PORT!;
export const EMAIL_USER = process.env.EMAIL_USER!;
export const EMAIL_PASS = process.env.EMAIL_PASS!;
```

### 3. **Integrate Everything in `app.ts`**

Finally, update your `src/app.ts` to use the routes:

```typescript
import express, { Application } from 'express';
import authRoutes from './routes/authRoutes';

const app: Application = express();

app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello, Express with TypeScript!');
});

app.use((err: Error, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

export default app;
```

### 4. **Build and Run the Application**

Build your application:

```bash
npm run build
```

Start the server:

```bash
npm start
```

This folder structure and code organization should provide a clean, maintainable approach to implementing a "forgot password" feature in a Node.js project using TypeScript and Express.

# Setup pm2

Production process manager for Node.js apps with a built-in load balancer
PM2 is a tool in the Node.js Process Manager category of a tech stack

To set up PM2 for your Node.js project with TypeScript and Express, you can follow these steps to manage your development environment efficiently. This setup will help you with automatic restarts, logging, and environment management.

### 1. **Install PM2 Globally**

First, make sure PM2 is installed globally:

```bash
npm install -g pm2
```

### 2. **Create an Ecosystem File**

Create a file named `ecosystem.config.js` in your project's root directory. This file will help you define the PM2 configuration for your project.

#### `ecosystem.config.js`

```javascript
module.exports = {
  apps: [
    {
      name: 'my-app',
      script: 'src/index.ts',
      interpreter: 'ts-node', // Use ts-node to run TypeScript files
      watch: true, // Enable watch mode to restart on file changes
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 80
      }
    }
  ]
};
```

### 3. **Update `package.json` Scripts**

Add scripts to your `package.json` to easily start and manage PM2:

#### `package.json`

```json
{
  "scripts": {
    "start:dev": "pm2 start ecosystem.config.js --env development",
    "start:prod": "pm2 start ecosystem.config.js --env production",
    "stop": "pm2 stop ecosystem.config.js",
    "restart": "pm2 restart ecosystem.config.js",
    "delete": "pm2 delete ecosystem.config.js",
    "logs": "pm2 logs my-app"
  }
}
```

### 4. **Start Your Application**

To start your application in development mode with PM2, run:

```bash
npm run start:dev
```

This command uses the `ecosystem.config.js` file to start your application, enabling watch mode and setting the environment to development.

### 5. **Monitor and Manage Your Application**

- **Check the status of your application:**

  ```bash
  pm2 status
  ```

- **View logs:**

  ```bash
  npm run logs
  ```

- **Stop the application:**

  ```bash
  npm run stop
  ```

- **Restart the application:**

  ```bash
  npm run restart
  ```

- **Delete the application from PM2:**

  ```bash
  npm run delete
  ```

### 6. **Production Setup**

When you’re ready for production, you can start your application with the production environment settings:

```bash
npm run start:prod
```

### Conclusion

This setup will allow you to manage your TypeScript and Express application using PM2 effectively. PM2 will handle automatic restarts during development and help with process management in both development and production environments.
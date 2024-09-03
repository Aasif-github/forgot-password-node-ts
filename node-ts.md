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
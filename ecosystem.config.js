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
  
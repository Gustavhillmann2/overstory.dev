module.exports = {
  apps: [
    {
      name: "overstory.dev",
      script: "src/app.js",      // Sti til din hovedfil
      instances: "max",          // Kør på alle kerner
      exec_mode: "cluster",      // Påkrævet for load balancing
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",   // Sikrer at 'trust proxy' aktiveres i app.js
        SESSION_SECRET: 'dev-secret-change-me'
      },
      // VIGTIGT: Fortæller PM2 præcis hvor din .env er placeret
      env_file: "src/.env" 
    }
  ]
};
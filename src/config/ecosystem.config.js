module.exports = {
  apps: [
    {
      name: "overstory.dev",
      script: "src/app.js",      // RETTET: Tilføjet src/ foran app.js
      instances: "max",
      exec_mode: "cluster",
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
      }
    }
  ]
};
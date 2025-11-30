module.exports = {
  apps: [
    {
      name: "overstory.dev", // Overstory.dev
      script: "app.js",      // Hovedfil
      instances: "max",      // Brug alle CPU-kerner
      exec_mode: "cluster",  // Cluster mode (load balancing)
      autorestart: true,     // Genstart automatisk hvis appen crasher
      watch: false           // Auto-restart ved filændringer
    }
  ]
};
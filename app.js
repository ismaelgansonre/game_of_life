const express = require('express');
const app = express();
const port = 4200;

// Middleware pour servir les fichiers statiques
app.use(express.static('src'));

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});

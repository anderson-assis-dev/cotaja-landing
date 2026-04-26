const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 53001;

app.use(compression());
app.use(express.static(path.join(__dirname, 'build'), { maxAge: '30d' }));

// SPA fallback — qualquer rota não encontrada serve o index.html do React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`CotaJá Landing rodando em http://localhost:${PORT}`);
});

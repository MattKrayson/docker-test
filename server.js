const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const now = new Date();
  res.send(`
    <html>
      <body>
        <h1>Hello, user!</h1>
        <p>The current date and time is: ${now.toString()}</p>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
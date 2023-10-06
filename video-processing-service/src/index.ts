const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.listen(PORT, (err: Error) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log(`Server started and listening at http://localhost:${PORT}`);
  }
});

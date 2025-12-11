import express from 'express';
import path from "path"

import { ENV } from './env.js';

const app = express();

const __dirname = path.resolve()

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Server is running' });
})

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "api is up and running" });
});

//making ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(ENV.PORT, () => {
  console.log('Server is running on port',ENV.PORT);
});
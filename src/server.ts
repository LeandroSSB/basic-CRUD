import "reflect-metadata";
import app from "./app";
import { connectDatabase } from "./database";

const PORT = 3000;

connectDatabase()
  .then(() => {
    console.log("Database connected!");

    app.listen(PORT, () => {
      console.log(`Connected at localhost:${PORT}`);
    });
  })
  .catch((err) => console.log("Connection to database failed!", err.message));

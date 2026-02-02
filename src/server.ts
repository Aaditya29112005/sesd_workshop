import "dotenv/config";
import App from "./app";
import { AuthRoutes } from "./routes/auth.routes";
import { BookRoutes } from "./routes/book.routes";

const app = new App([
    new AuthRoutes(),
    new BookRoutes()
]);

app.startServer();

import express from "express";
import { Routes } from "./utils/route.Interface";
import { connect } from "mongoose";
import { ErrorMiddleware } from "./middlewares/error.middleware";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { setupSwagger } from "./utils/swagger";

class App {
  public app: express.Application;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 8080;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
    this.connectDatabase();
  }

  public startServer() {
    this.app.listen(this.port, () => {
      console.log(`=================================`);
      console.log(`🚀 Server listening on port ${this.port}`);
      console.log(`=================================`);
    });
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/api", route.router);
    });
    setupSwagger(this.app);
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Advanced Middleware
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per windowMs
        message: "Too many requests from this IP, please try again after 15 minutes",
      })
    );
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }

  private async connectDatabase() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is missing in environment variables");
    }
    try {
      await connect(uri);
      console.log("✅ Database connected successfully");
    } catch (err) {
      console.error("❌ Database connection error:", err);
      process.exit(1);
    }
  }
}

export default App;

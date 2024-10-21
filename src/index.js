import initExpress from "./config/express.js";
import { publicRoutes } from "./routes/public.js";

const app = initExpress();

publicRoutes(app);

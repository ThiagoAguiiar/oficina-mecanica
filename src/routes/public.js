import adminController from "../controllers/adminController.js";
import homeController from "../controllers/homeController.js";
import authController from "../controllers/authController.js";

export const publicRoutes = (app) => {
  app.get("/", (req, res) => {
    homeController(req, res);
  });

  app.get("/admin", (req, res) => {
    adminController(req, res).index();
  });

  app.get("/admin/logout", (req, res) => {
    adminController(req, res).logout();
  });

  app.get("/login", async (req, res) => {
    await authController(req, res).index();
  });

  app.post("/login", (req, res) => {
    authController(req, res).login();
  });
};

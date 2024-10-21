import { useFile } from "../utils/saveFile.js";

const authMiddleware = (req, res, next) => {
  const authToken = req.cookies["auth-token"];
  const file = useFile("token");
  const tokenFile = file.getData("token");

  const isProtectedRoute = req.path.startsWith("/admin");

  if (isProtectedRoute) {
    if (!authToken) {
      return res.redirect("/login");
    }

    if (authToken !== tokenFile) {
      return res.redirect("/login");
    }
  }

  if (req.path === "/login" && authToken === tokenFile) {
    return res.redirect("/admin");
  }

  next();
};

export default authMiddleware;

import { decodeToken } from "../utils/jwt.js";
import { useFile } from "../utils/saveFile.js";

const adminController = (req, res) => {
  const index = async () => {
    const cookies = req.cookies["auth-token"];

    const data = await decodeToken(cookies);

    return res.render("admin/index.ejs", { name: data.nome });
  };

  const logout = () => {
    res.clearCookie("auth-token");

    const file = useFile("token");
    file.removeFile();

    return res.redirect("/login");
  };

  return { index, logout };
};

export default adminController;

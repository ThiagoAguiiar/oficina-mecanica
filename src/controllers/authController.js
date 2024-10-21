import { compare } from "bcrypt";
import { getUsuarioByEmail } from "../models/usuario.js";
import { useFile } from "../utils/saveFile.js";
import { createToken } from "../utils/jwt.js";

const authController = (req, res) => {
  const index = () => {
    return res.render("auth/login.ejs", {
      fields: { email: "", password: "" },
    });
  };

  const login = async () => {
    let error = "Email e/ou senha inválidos";

    let fields = {
      email: "",
      password: "",
    };

    try {
      const { email, password } = req.body;

      if (email.trim().length > 0 && password.trim().length > 0) {
        const u = await getUsuarioByEmail(email);

        fields.email = email;
        fields.password = password;

        if (u != null) {
          const senhaValida = await compare(password, u.senha);

          if (senhaValida) {
            const token = createToken({ email: u.email, nome: u.nome }, "1h");
            await res.cookie("auth-token", token);

            const file = useFile("token");
            file.saveFile({ token: token });

            return res.redirect("/admin");
          } else {
            error = "Email e/ou senha inválidos";
          }
        }
      }
    } catch (err) {
      fields.email = email;
      fields.password = password;

      error = "Erro ao realizar o login";
    }

    return res.render("auth/login.ejs", {
      error,
      fields,
    });
  };

  return { index, login };
};

export default authController;

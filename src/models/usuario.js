import { supabase } from "../config/supabase.js";

const Usuario = (id, criado_em, nome, email, senha, atualizado_em) => {
  return {
    id,
    criadoEm: criado_em,
    nome,
    email,
    senha,
    atualizadoEm: atualizado_em,
  };
};

export const getUsuarioByEmail = async (email) => {
  try {
    const { data, error } = await supabase
      .from("usuario")
      .select()
      .eq("email", email)
      .single();

    if (error) return null;

    if (data) {
      return Usuario(
        data.id,
        data.criado_em,
        data.nome,
        data.email,
        data.senha,
        data.atualizado_em
      );
    }

    return null;
  } catch (error) {
    return Promise.reject(error);
  }
};

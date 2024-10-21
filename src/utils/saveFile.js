import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const useFile = (fileName) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const dataDir = path.join(__dirname, "../../src/.data");
  const filePath = path.join(dataDir, fileName + ".json");

  const saveFile = (data) => {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const jsonData = JSON.stringify(data, null, 2);

    try {
      fs.writeFileSync(filePath, jsonData);
      console.log(`Arquivo ${fileName}.json salvo com sucesso.`);
    } catch (err) {
      console.error("Erro ao salvar o arquivo:", err);
    }
  };

  const getData = (key) => {
    if (!fs.existsSync(filePath)) {
      return null;
    }

    try {
      const data = fs.readFileSync(filePath, "utf8");
      return JSON.parse(data)[key];
    } catch (err) {
      console.error("Erro ao buscar item");
      return null;
    }
  };

  const removeFile = () => {
    try {
      fs.unlinkSync(filePath);
      console.log(`Arquivo ${fileName}.json removido com sucesso.`);
    } catch (err) {
      console.error("Erro ao remover o arquivo:", err);
    }
  };

  return { saveFile, getData, removeFile };
};

const fs = require("fs");
const path = require("path");
const sequelize = require("../BaseDatos/ConexionBaseDatos");
const Sequelize = require("sequelize");

const modelsPath = path.join(__dirname, "../Modelos");

const GenerarModelos = async (req, res) => {
  try {
    let modelosTS = {};

    fs.readdirSync(modelsPath).forEach((file) => {
      if (file.endsWith(".js")) {
        const modelPath = path.join(modelsPath, file);
        const modelDef = require(modelPath);
        let model;

        // Si es una función, invócala para obtener el modelo
        if (typeof modelDef === "function") {
          model = modelDef(sequelize, Sequelize.DataTypes);
        } else {
          model = modelDef;
        }
        const modelName = file.replace(".js", "");

        // Verificar que el modelo tenga rawAttributes
        if (!model || !model.rawAttributes) {
          console.warn(`El modelo ${modelName} no tiene rawAttributes. Se omite.`);
          return; // Continúa con el siguiente archivo
        }

        let tsInterface = `export interface ${modelName} {\n`;
        Object.keys(model.rawAttributes).forEach((key) => {
          const typeName = model.rawAttributes[key].type.constructor.name.toLowerCase();
          let tsType = "any";

          if (typeName.includes("string")) tsType = "string";
          if (typeName.includes("integer") || typeName.includes("float") || typeName.includes("decimal")) tsType = "number";
          if (typeName.includes("boolean")) tsType = "boolean";
          if (typeName.includes("date")) tsType = "Date";

          tsInterface += `  ${key}: ${tsType};\n`;
        });
        tsInterface += "}\n";

        modelosTS[modelName] = tsInterface;
      }
    });

    res.status(200).json(modelosTS);
  } catch (error) {
    console.error("Error al generar modelos:", error);
    res.status(500).json({ message: "Error al generar modelos", error: error.message });
  }
};

module.exports = { GenerarModelos };

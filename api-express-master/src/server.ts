import express from "express";
import sequelize from "./config/database";
import { errorHandler } from "./middlewares/errors.middleware";
import usuarioRoutes from "./routes/usuarios.route";
import vagasRoutes from "./routes/vagas.route";

const app = express();
app.use(express.json());

// Sincronizar o banco de dados
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Unable to synchronize the database:", err);
  });

// Usar as rotas importadas
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/vagas", vagasRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import express, { Response, Request, NextFunction } from "express";
import sequelize from "./config/database";
import usuarioRoutes from "./routes/usuarios.route";
import vagasRoutes from "./routes/vagas.route";
import { CustomError } from "./interfaces/customError";

const app = express();
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Unable to synchronize the database:", err);
  });


app.use("/api/usuarios", usuarioRoutes);
app.use("/api/vagas", vagasRoutes);

app.use((error: CustomError, request: Request , response: Response, next: NextFunction) => {
  console.log(error)
  const status = error.status || 500
  const message = error.message || "Um erro ocorreu."
  const data = error.data
  response.status(status).json({message, data})
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

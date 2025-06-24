import express,{ Application } from "express";
import swaggerUI from 'swagger-ui-express';
import appRouter from "./routers/router";
import { initDb } from "./db/conection";
import specs from "./config/swagger/swagger";
import { ErrorHandler } from "./middleware/errorHandlers";
import cors from "cors";

const app:Application = express()
const PORT = 8080;
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs",swaggerUI.serve, swaggerUI.setup(specs))
app.use("/api", appRouter);  

app.use(ErrorHandler)

app.listen(PORT, async () => {
  try {
    await initDb();  
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error)
  }
});

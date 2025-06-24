import { Sequelize } from "sequelize";

const sequelize = new Sequelize("XAcademy", "root", "root", {
  dialect: "mysql",
  host: "localhost",
  port: 3306
});

export const initDb = async (): Promise<void> => {
  try {
    console.log('Iniciando la base de datos...');
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    console.log('Base de datos iniciada correctamente');
  } catch (error) {
    console.error('Fallo al iniciar la base de datos:', error);
  }
};

export default sequelize;;

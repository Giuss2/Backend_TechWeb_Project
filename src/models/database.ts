import { sequelize } from './indexModels.js';

export async function initializeDatabase() {
  try {
    console.log("Before sync...");
    console.log("Models available:", Object.keys(sequelize.models));
    await sequelize.sync({ force: true });
    console.log("Database synced successfully!");
  } catch (err) {
    console.error("Error syncing database:", err);
    throw err; // rilancia l'errore per capire dove va
  }
}

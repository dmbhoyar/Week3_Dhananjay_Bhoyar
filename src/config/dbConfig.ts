import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize('testdatabase', 'postgres', process.env.DB_PASSWORD as string, {
    host: 'localhost',
    dialect: 'postgres',
});

sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

sequelize.sync()
    .then(() => {
        console.log('Models synchronized with the database.');
    })
    .catch((err) => {
        console.error('Unable to synchronize models with the database:', err);
    });

export default sequelize;

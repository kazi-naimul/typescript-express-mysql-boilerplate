import 'dotenv/config';

export default {
    logging: (message) => {
        if (message.startsWith('Executing (default):')) {
            // ignore regular query logs
            return;
        }
        // log anything else (e.g. errors)
        console.error(message);
    },
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
        bigNumberStrings: true,
    },
    pool: {
        max: 50,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};

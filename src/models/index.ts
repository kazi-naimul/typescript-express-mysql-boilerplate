/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Sequelize, DataTypes } from 'sequelize';
import dbConfig from '@configs/database.js';

const filename = fileURLToPath(import.meta.url);
const basename = path.basename(filename);
const dirname = path.dirname(filename);
const db: any = {};

let sequelize;
if (dbConfig.database && dbConfig.username) {
    sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
}

const files = fs
    .readdirSync(dirname)
    .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js');

for (const file of files) {
    const modelPath = path.join(dirname, file);
    // Using dynamic import with await
    const modelModule = await import(modelPath);
    const model = modelModule.default(sequelize, DataTypes);
    
    db[model.name] = model;
}

// // // After all models are imported, run the associations (if defined)
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

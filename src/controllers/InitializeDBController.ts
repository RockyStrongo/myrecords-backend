import { Request, Response, NextFunction } from 'express';
const Sequelize = require('sequelize');
import fs from 'fs';
import Artist from '../model/Artist';
import Record from '../model/Record';

async function initializeDB() {
    const rootCert = fs.readFileSync('/etc/ssl/certs/ca-certificates.crt');

    const sequelize = new Sequelize(process.env.DB_ROOT_NAME, process.env.DB_ROOT_USERNAME, process.env.DB_ROOT_PASSWD, {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                ca: rootCert, // Use the root certificate
            }
        }
    });

    await sequelize.query(
        `DROP DATABASE IF EXISTS ${process.env.DB_NAME};`
    );

    await sequelize.query(
        `CREATE DATABASE ${process.env.DB_NAME};
        `
    );

    await sequelize.query(
        `DROP USER IF EXISTS ${process.env.DB_USERNAME};`
    );

    await sequelize.query(
        `CREATE USER ${process.env.DB_USERNAME} WITH PASSWORD '${process.env.DB_PASSWD}';`
    );

    await sequelize.query(
        `GRANT ALL PRIVILEGES ON DATABASE ${process.env.DB_NAME} TO ${process.env.DB_USERNAME};`
    );


    // Fermeture de la connexion admin
    await sequelize.close();

    //ouverture connexion utilisateur de l'app
    const appSequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWD, {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                ca: rootCert, // Use the root certificate
            }
        }
    });

    //creation du schema
    await appSequelize.createSchema("records")

    appSequelize.close()

    //creation des tables
    await Artist.sync();
    await Record.sync();

    console.log("db initialization done")

}

const InitializeDBController = {
    async initializeDBAsEndpoint(req: Request, res: Response, next: NextFunction) {
        try {

            await initializeDB();

            return res.status(200).json("done");

        } catch (error) {
            console.log(error)
            return res.status(500).json("error");

        }
    },

}

export default InitializeDBController;
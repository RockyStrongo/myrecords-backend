const Sequelize = require('sequelize');
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

function getConnexion() {
    // Read the certificate file (use the correct path for your certificate file)
    // might need to be changed in prod, see locations of certificates according to OS here https://neon.tech/docs/connect/connect-securely#location-of-system-root-certificates
    const rootCert = fs.readFileSync('/etc/ssl/certs/ca-certificates.crt');
    return new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWD, {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                ca: rootCert,
            },
            useUTC: false,
        },
        timezone: 'Europe/Paris'
    });
}

export default getConnexion;
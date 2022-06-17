import dotenv from 'dotenv';
import Joi from 'joi';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envValidation = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('development', 'production', 'local').required(),
        PORT: Joi.number().default(3000),
        APP_IDENTIFIER: Joi.string().default('af_local'),
        DB_HOST: Joi.string().default('localhost'),
        DB_USER: Joi.string().required(),
        DB_PASS: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        ACCOUNT_SERVER_API_BASE_URL: Joi.string().required(),
        LOG_FOLDER: Joi.string().required(),
        LOG_FILE: Joi.string().required(),
        LOG_LEVEL: Joi.string().required(),
        MAILGUN_API_KEY: Joi.string().required(),
        MAILGUN_DOMAIN: Joi.string().required(),
        SYSTEM_EMAIL: Joi.string().email().required(),
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_CLIENT_SECRET: Joi.string().required(),
        GOOGLE_REDIRECT: Joi.string().required(),
        GOOGLE_API_KEY: Joi.string().required(),
        APPLICATION_DOMAIN: Joi.string().required(),
        S3_BUCKET: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        S3_REGION: Joi.string().required(),
        FAKE_GEOGRID_SCAN: Joi.boolean().required(),
    })
    .unknown();

const { value: envVar, error } = envValidation
    .prefs({ errors: { label: 'key' } })
    .validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
    nodeEnv: envVar.NODE_ENV,
    appIdentifier: envVar.APP_IDENTIFIER,
    port: envVar.PORT,
    dbHost: envVar.DB_HOST,
    dbUser: envVar.DB_USER,
    dbPass: envVar.DB_PASS,
    dbName: envVar.DB_NAME,
    accountServerApiBaseUrl: envVar.ACCOUNT_SERVER_API_BASE_URL,
    logConfig: {
        logFolder: envVar.LOG_FOLDER,
        logFile: envVar.LOG_FILE,
        logLevel: envVar.LOG_LEVEL,
    },
    mailgun: {
        apiKey: envVar.MAILGUN_API_KEY,
        domain: envVar.MAILGUN_DOMAIN,
    },
    systemEmail: envVar.SYSTEM_EMAIL,
    googleApp: {
        clientId: envVar.GOOGLE_CLIENT_ID,
        clientSecret: envVar.GOOGLE_CLIENT_SECRET,
        redirect: envVar.GOOGLE_REDIRECT,
        apiKey: envVar.GOOGLE_API_KEY,
    },
    fakeLeadAllocationDays: envVar.FAKE_LEAD_ALLOCATION_DAYS,
    incomingBaseUrl: envVar.INCOMING_BASE_URL,
    fakePurchase: envVar.FAKE_PURCHASE,
    fakeGhlPost: envVar.FAKE_GHL_POST,
    applicationDomain: envVar.APPLICATION_DOMAIN,
    s3: {
        bucket: envVar.S3_BUCKET,
        accessKey: envVar.AWS_ACCESS_KEY_ID,
        secretKey: envVar.AWS_SECRET_ACCESS_KEY,
        region: envVar.S3_REGION,
    },
    fakeGeogridScan: envVar.FAKE_GEOGRID_SCAN,
};

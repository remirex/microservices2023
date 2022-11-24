import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';

const envFound = dotenv.config({ path: path.join(__dirname, '../../.env') });
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const envVarSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'staging', 'test', 'local').required(),
    SERVER_PORT: Joi.number().default(3000),
    SERVER_HOSTNAME: Joi.string().default('localhost'),
    MONGO_USERNAME: process.env.NODE_ENV === 'local' ? Joi.string().allow('') : Joi.string().required(),
    MONGO_PASSWORD: process.env.NODE_ENV === 'local' ? Joi.string().allow('') : Joi.string().required(),
    MONGO_PORT: process.env.NODE_ENV === 'local' ? Joi.string().allow('') : Joi.string().required(),
    MONGO_HOST: process.env.NODE_ENV === 'local' ? Joi.string().allow('') : Joi.string().required(),
    MONGO_DATABASE: process.env.NODE_ENV === 'local' ? Joi.string().allow('') : Joi.string().required(),
    LOCAL_MONGO_DATABASE: process.env.NODE_ENV !== 'local' ? Joi.string().allow('') : Joi.string().required(),
    LOCAL_MONGO_HOST: process.env.NODE_ENV !== 'local' ? Joi.string().allow('') : Joi.string().required(),
    LOCAL_MONGO_PORT: process.env.NODE_ENV !== 'local' ? Joi.string().allow('') : Joi.string().required(),
    LOG_LEVEL: Joi.string().default('silly'),
  })
  .unknown();

const { value: envVars, error } = envVarSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  server: {
    port: envVars.SERVER_PORT,
    hostname: envVars.SERVER_HOSTNAME,
  },
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT,
    username: envVars.MONGO_USERNAME,
    password: envVars.MONGO_PASSWORD,
    database: envVars.MONGO_DATABASE,
    options: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      socketTimeoutMS: 30000,
      keepAlive: true,
      maxPoolSize: 50,
      autoIndex: false,
      retryWrites: false,
    },
    url:
      envVars.NODE_ENV === 'local'
        ? `mongodb://${envVars.LOCAL_MONGO_HOST}:${envVars.LOCAL_MONGO_PORT}/${envVars.LOCAL_MONGO_DATABASE}`
        : `mongodb://${envVars.MONGO_USERNAME}:${envVars.MONGO_PASSWORD}@${envVars.MONGO_HOST}:${envVars.MONGO_PORT}/${envVars.MONGO_DATABASE}`,
  },
  log: {
    level: envVars.LOG_LEVEL,
  },
};

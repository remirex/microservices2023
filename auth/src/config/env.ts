import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config({ path: path.join(__dirname, '../../.env') });
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const envVarSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'staging', 'test', 'local').required(),
    PORT: Joi.number().default(3000),
    LOG_LEVEL: Joi.string().default('silly'),
  })
  .unknown();

const { value: envVars, error } = envVarSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  log: {
    level: envVars.LOG_LEVEL,
  },
};

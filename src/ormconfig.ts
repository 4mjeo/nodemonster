import { ConnectionOptions } from 'typeorm';
import { config } from './config';
import { User } from './entity/user';

export const createOptions: ConnectionOptions = {
	type: 'mysql',
	host: config.dbHost,
	port: config.dbPort,
	username: config.dbUser,
	password: config.dbPassword,
	database: config.dbName,
	synchronize: config.dbSynchronize,
	logging: config.dbLogging,
	timezone: config.dbTimezone,
	entities: [User],
	dateStrings: true,
	charset: 'utf8mb4',
};
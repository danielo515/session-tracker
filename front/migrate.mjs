import path from 'path';
import { jsDocPlugin } from 'ts-migrate-plugins';
import { migrate, MigrateConfig } from 'ts-migrate-server';

// get input files folder
const inputDir = path.resolve(process.cwd(), 'src');

// create new migration config and add ts-ignore plugin with empty options
const config = new MigrateConfig().addPlugin(jsDocPlugin, {});

// run migration
const exitCode = await migrate({ rootDir: inputDir, config, tsConfigDir: process.cwd() });

process.exit(exitCode);

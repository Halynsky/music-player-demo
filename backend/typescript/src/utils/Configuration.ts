import * as log4js from 'log4js';
import * as log4jsExtend from 'log4js-extend';
import { provide } from "inversify-binding-decorators";
import TYPES from "./Types";

@provide(TYPES.Configuration)
export default class Configuration {

    constructor() {
        // if (process.env.NODE_ENV === 'development')
            this.configureLogger();
    }

    private configureLogger() {
        log4js.configure(
            {
                appenders: {
                    file: {
                        type: 'file',
                        filename: 'logs/warcars.log',
                        maxLogSize: 10 * 1024 * 1024, // = 10Mb
                        numBackups: 5, // keep five backup files
                        compress: true, // compress the backups
                        encoding: 'utf-8',
                        mode: 0o0640,
                        flags: 'w+'
                    },
                    out: {
                        type: 'stdout',
                        layout: {
                            type: process.env.NODE_ENV === 'local' ? 'colored' : 'pattern',
                            pattern: '[%p] - %m',
                        }
                    }
                },
                categories: {
                    default: { appenders: ['out'], level: process.env.LOG_LEVEL || 'info' },
                    warcars: { appenders: ['out'], level: process.env.LOG_LEVEL || 'info' }
                }
            }
        );

        log4jsExtend(log4js, {
            path: __dirname,
            format: "(@name @file:@line:@column)"
        });

    }

}

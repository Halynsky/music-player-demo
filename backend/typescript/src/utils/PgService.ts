import * as pgPromise from 'pg-promise'
import { IDatabase, IMain, TConfig } from 'pg-promise'
import TYPES from "../utils/Types";
import { provide } from "inversify-binding-decorators";

@provide(TYPES.PgService)
export default class PgService {

    private readonly APPLICATION_NAME = "Adelagio game server";
    private readonly DEFAULT_MAX_POOL_SIZE = 15;
    private readonly DEFAULT_MIN_POOL_SIZE = 10;
    private readonly DEFAULT_CONNECTION_IDLE_TIMEOUT = 5000;

    private readonly TIMESTAMP_OID = 1114;
    private readonly TIMESTAMPTZ_OID = 1184;

    private readonly pgPromiseOptions: pgPromise.IOptions<any> = {
        receive: (data) => {
            this.camelizeColumnNames(data);
        },
        capSQL: true,
    };

    private readonly connection: TConfig = {
        connectionString: process.env.DATABASE_URL,
        max: process.env.DATABASE_CONNECTION_POOL_SIZE ? parseInt(process.env.DATABASE_CONNECTION_POOL_SIZE) : this.DEFAULT_MAX_POOL_SIZE,
        min: this.DEFAULT_MIN_POOL_SIZE,
        idleTimeoutMillis: this.DEFAULT_CONNECTION_IDLE_TIMEOUT,
        application_name: this.APPLICATION_NAME
    };

    public db: IDatabase<any>;
    public pgp: IMain;

    constructor() {
        if (process.env.SHOW_SQL && JSON.parse(process.env.SHOW_SQL)) this.pgPromiseOptions.query = (e) => {
            console.log('QUERY: ', e.query);
            if (e.params) {
                console.log('PARAMS:', e.params);
            }
        };

        this.pgp = pgPromise(this.pgPromiseOptions);

        // timestamp type mapping overriding
        this.pgp.pg.types.setTypeParser(this.TIMESTAMP_OID,  stringValue => stringValue.replace(" ", "T") + "Z");
        this.pgp.pg.types.setTypeParser(this.TIMESTAMPTZ_OID,  stringValue => stringValue.replace(" ", "T") + "Z");
    }

    /**
     * @deprecated Was used for debugging
     */
    showPool() {
        console.log("EVENTS IN POOL", this.db.$pool._eventsCount);
        setTimeout(() => {
            this.showPool()
        }, 5000)
    }

    public camelizeColumnNames = (data) => {
        const template = data[0];
        for (let prop in template) {
            const camel = pgPromise.utils.camelize(prop);
            if (!(camel in template)) {
                for (let i = 0; i < data.length; i++) {
                    let d = data[i];
                    d[camel] = d[prop];
                    delete d[prop];
                }
            }
        }
    }

}

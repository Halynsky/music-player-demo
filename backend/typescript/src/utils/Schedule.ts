import * as schedule from 'node-schedule'
import { logger } from "./Util";
import PgService from "../services/PgService";
import { provide } from "inversify-binding-decorators";
import TYPES from "../utils/Types";
import { inject } from "inversify";

@provide(TYPES.Scheduler)
export default class Scheduler {

    private MESSENGER_CLEAN_UP_CRON = '0 4 * * *';
    private TOURNAMENTS_CLEAN_UP_CRON = '0 5 * * *';
    private BATTLES_CLEAN_UP_CRON = '0 6 * * *';

    private OLD_DAYS = 14;

    constructor(private pgService: PgService) {
    }

    scheduleJobs() {
        schedule.scheduleJob(this.MESSENGER_CLEAN_UP_CRON, this.cleanUpMessages);
        schedule.scheduleJob(this.BATTLES_CLEAN_UP_CRON, this.cleanUpOldBattles);
        schedule.scheduleJob(this.TOURNAMENTS_CLEAN_UP_CRON, this.cleanUpOldTournaments);
    }

    private cleanUpMessages = () => {
        logger.info("Job started => Cleaning up old messages...");
        this.pgService.db.none("DELETE FROM messages WHERE created < now() - interval '$1 days'", this.OLD_DAYS)
    };

    private cleanUpOldBattles = () => {
        logger.info("Job started => Cleaning up old battles...");
        this.pgService.db.none("DELETE FROM battles WHERE created < now() - interval '$1 days'", this.OLD_DAYS)
    };


    private cleanUpOldTournaments = () => {
        logger.info("Job started => Cleaning up old tournaments...");
        this.pgService.db.none("DELETE FROM tournaments WHERE started_date < now() - interval '$1 days'", this.OLD_DAYS)
    };

}

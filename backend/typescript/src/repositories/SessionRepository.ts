import TYPES from "../utils/Types";
import { provide } from "inversify-binding-decorators";
import { IResult } from "pg-promise/typescript/pg-subset";
import PgService from "../utils/PgService";

@provide(TYPES.SessionRepository)
export default class SessionRepository {

    constructor(private pgService: PgService) {
    }

    getAll() {
        return this.pgService.db.any('SELECT * FROM session ORDER BY sid');
    }

    delete(sid: string) {
        return this.pgService.db.result('DELETE FROM session WHERE sid = $1', sid, (r: IResult) => +r.rowCount);
    }

    deleteOtherSessions(userId: string, sid: string) {
        return this.pgService.db.result("DELETE FROM session WHERE json_extract_path_text(sess, 'passport', 'user') = ${userId} AND sid <> ${sid}", {userId: userId, sid: sid}, (r: IResult) => +r.rowCount);
    }
}

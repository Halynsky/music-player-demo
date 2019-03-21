import TYPES from "../utils/Types";
import { provide } from "inversify-binding-decorators";
import PgService from "../utils/PgService";

@provide(TYPES.UserRepository)
export default class UserRepository {

    constructor(private pgService: PgService) {}

  findById(id: string) {
    return this.pgService.db.oneOrNone('SELECT * FROM users WHERE id = $1', id);
  }

  findByEmail(email: string) {
    return this.pgService.db.oneOrNone('SELECT * FROM users WHERE email = $1', email);
  }


}

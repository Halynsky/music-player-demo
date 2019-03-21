import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import UserRepository from "../repositories/UserRepository";
import TYPES from "../utils/Types";

@provide(TYPES.UserService)
export default class UserService {

    @inject(TYPES.UserRepository) private userRepository: UserRepository;

    constructor() {}

    register() {

    }



}



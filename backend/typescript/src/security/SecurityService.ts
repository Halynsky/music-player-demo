import * as passport from 'passport';
import * as passportLocal from 'passport-local'
import { logger } from "../utils/Util";
import * as bcrypt from "bcrypt";
import * as passportCustom from 'passport-custom';
import { inject } from "inversify";
import TYPES from "../utils/Types";
import { provide } from "inversify-binding-decorators";
import UserService from "../services/UserService";
import NotFoundError from "../errors/NotFoundError";
import UserRepository from "../repositories/UserRepository";
import Credentials from "../models/in/Credentials";

@provide(TYPES.SecurityService)
export default class SecurityService {

    @inject(TYPES.UserRepository) private userRepository: UserRepository;
    @inject(TYPES.UserService) private userService: UserService;

    private readonly ADMIN = {id: '0', name: 'admin', role: "ADMIN"};

    constructor() {

        passport.use('local', new passportLocal.Strategy(
            (username, password, done) => {
                this.userRepository.findByEmail(username).then((user) => {
                        if (!user) return done(null, false);
                        bcrypt.compare(password, user.password, function (err, res) {
                            if (err) return done(err);
                            if (res) return done(null, user);
                            else return done(null, false);
                        });
                    },
                    error => {
                        return done(error)
                    })
            }
        ));

        passport.use('admin', new passportLocal.Strategy(
            (username, password, done) => {

                if (username == process.env.ADMIN_NAME && password == process.env.ADMIN_PASSWORD) {
                    return done(null, this.ADMIN);
                } else {
                    return done(null, false);
                }
            }
        ));

      passport.use('custom', new passportCustom.Strategy(
        (req, done) => {
          let credentials: Credentials = req.body as Credentials;
          this.userRepository.findByEmail(credentials.username).then(user => {
              // bcrypt.compare(credentials.password, user.password, function (err, res) {
              //   if (err) return done(err);
              //   if (res) return done(null, user);
              //   else return done(null, false);
              // });

              if (user.password == credentials.password) {
                  return done(null, user);
              } else {
                  return done(null, false);
              }

            },
            error => {
              logger.error(error);
              return done(null, false)
            });
        }
      ));

        passport.serializeUser((user: any, done) => {
            done(null, user.id);
        });

        passport.deserializeUser((id: string, done) => {
            // hack for admin
            if (id == this.ADMIN.id) return done(null, this.ADMIN);

            this.userRepository.findById(id).then((user) => {
                    if (user) {
                        return done(null, user);
                    } else {
                        return done(new NotFoundError())
                    }
                },
                error => {
                    return done(error)
                });
        });

    }


}



const TYPES = {
    // Repositories
    SessionRepository: Symbol.for('SessionRepository'),
    UserRepository: Symbol.for('UserRepository'),
    // Services
    UserService: Symbol.for('UserService'),
    // Other
    ConfigService: Symbol.for('ConfigService'),
    PgService: Symbol.for('PgService'),
    SecurityService: Symbol.for('SecurityService'),
    Configuration: Symbol.for("Configuration"),
    SocialValidator: Symbol.for('SocialValidator'),
    AuthMiddleware: Symbol.for('AuthMiddleware'),
    Scheduler: Symbol.for('Scheduler'),
    ErrorHandler: Symbol.for('ErrorHandler'),
    SocketController: Symbol.for('SocketController'),
};

export default TYPES;

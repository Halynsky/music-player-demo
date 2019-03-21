import "reflect-metadata";
import * as bodyParser from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as express from 'express';
import * as morgan from 'morgan';
import * as expressWs from 'express-ws';
import { logger } from "./utils/Util";
import * as passport from 'passport';
import * as session from 'express-session';
import {
    SESSION_OPTIONS,
    SWAGGER_ASSETS_PATH,
    SWAGGER_PATH,
    SWAGGER_ROOT_FOLDER,
    SWAGGER_UI_DIST_FOLDER
} from "./utils/Properties";
import * as swagger from "swagger-express-ts";
import { CustomStrategy } from 'passport-custom';
import { ErrorHandler } from "./utils/ErrorHandler";
import Configuration from "./utils/Configuration";
import { container } from "./utils/ContainerConfig";

// bind dependencies
container.bind<express.RequestHandler>('Morgan').toConstantValue(morgan('combined'));

// get dependencies
const errorHandler = container.get<ErrorHandler>(ErrorHandler);
const configuration = container.get<Configuration>(Configuration);

(async () => {

    let inversifyExpressServer = new InversifyExpressServer(container);

    inversifyExpressServer.setConfig(async (app: expressWs.Application) => {

        const sessionParser = session(SESSION_OPTIONS);
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
                app.use(sessionParser);
        app.use(passport.initialize());
        app.use(passport.session());
        if (process.env.NODE_ENV === 'local') app.use(morgan('combined'));
        expressWs(app);
        expressWs(app, null, {
            wsOptions: {
                verifyClient: (info: any, next) => {
                    sessionParser(info.req, info.req, () => {
                        if (info.req.session.passport) next(true);
                        else next(false);
                    });
                }
            }
        });

        app.use( SWAGGER_PATH , express.static( SWAGGER_ROOT_FOLDER ) );
        app.use( SWAGGER_ASSETS_PATH , express.static( SWAGGER_UI_DIST_FOLDER ) );
        app.use( swagger.express(
            {
                definition : {
                    info : {
                        title : "Adelagio Api" ,
                        version : "0.1"
                    },
                    responses: {
                        200: {description: "OK"},
                        204: {description: "No Content"},
                        400: {description: "Bad request"},
                        401: {description: "Unauthorized"},
                        500: {description: "Internal Server Error"}
                    },
                    schemes: [ process.env.NODE_ENV != "local" ? "https" : "http"],
                    basePath: "/api"
                },
            }
        ) );

        // app.use(errorHandler.jsonifyCommonError);

    });

    inversifyExpressServer.setErrorConfig((app: any) => {
        app.use(errorHandler.handleInternalError);
    });

    let server = inversifyExpressServer.build();

    // run server
    server.listen(process.env.PORT, () => {
        logger.info(`Server is started in ${process.env.NODE_ENV} mode`);
        logger.info(`Server listening on port ${process.env.PORT} !`);
        logger.info(`Swagger documentation is served at => ${SWAGGER_PATH}`);
    });

})();


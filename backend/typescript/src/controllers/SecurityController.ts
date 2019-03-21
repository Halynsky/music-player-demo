import { controller, httpDelete, httpPost, request, } from "inversify-express-utils";
import { Request } from 'express';
import { ApiOperationDelete, ApiOperationPost, ApiPath, SwaggerDefinitionConstant } from "swagger-express-ts";
import PasswordLoginMiddleware from "../security/PasswordLoginMiddleware";


@ApiPath({
    path: "/security",
    name: "SecurityController"
})
@controller("/api/security")
export default class SecurityController {

    constructor() {
    }

    @ApiOperationDelete({
        path: "/logout",
        summary: "Unauthorize User from the game server",
        parameters: {},
        responses: {}
    })
    @httpDelete("/logout")
    private async logout(@request()req: Request) {
        req.logout();
    }

    @ApiOperationPost({
        path: "/authorize",
        summary: "Authorize User in to the game server with GameCenter/GooglePlay/Editor token or PhoneId ",
        parameters: {
            body: {description: "Credentials used for authorization", required: true, model: "Credentials"}
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.OBJECT, model: "Profile" }
        },
    })
    @httpPost("/authorize", PasswordLoginMiddleware)
    private async authorize() {
    }

}

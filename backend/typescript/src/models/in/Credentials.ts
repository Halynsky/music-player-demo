import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@ApiModel({
    description: "Credentials used for authorization",
    name: "Credentials"
})
export default class Credentials {
    @ApiModelProperty({description: "User name", required: true})
    username: string;
    @ApiModelProperty({description: "User password", required: true})
    password: string;
}

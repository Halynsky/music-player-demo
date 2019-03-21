import { Container } from "inversify";
import getDecorators from "inversify-inject-decorators";

// create Ioc Container
export const container = new Container({ defaultScope: "Singleton", autoBindInjectable: true });
export const { lazyInject } = getDecorators(container, false);

import '../models';
import '../controllers';
import { buildProviderModule } from "inversify-binding-decorators";

container.load(buildProviderModule());


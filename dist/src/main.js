"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const EnvKey_1 = require("./constants/EnvKey");
const index_1 = require("./interceptors/index");
const http_exception_filter_1 = require("./filters/http-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalInterceptors(new index_1.TransformInterceptor());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    const configService = app.get(config_1.ConfigService);
    app.setGlobalPrefix('api');
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('No Name Project')
        .setDescription('The API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(configService.get(EnvKey_1.PORT));
}
bootstrap();
//# sourceMappingURL=main.js.map
import { Logger } from './common/helpers/logger';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConnectionModule } from '@src/common/connections/connections.module';
import { ServiceModule } from '@src/modules/services.module';
import { CustomConfigModule } from './common/configs/config.module';

@Module({
  imports: [CustomConfigModule, ConnectionModule, ServiceModule],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}

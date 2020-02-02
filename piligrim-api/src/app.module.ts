import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { SiteParserModule } from './site-parser/site-parser.module';

@Module({
  imports: [ApiModule, SiteParserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

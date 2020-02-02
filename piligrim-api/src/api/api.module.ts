import { Module } from '@nestjs/common';
import { ApiController } from './api/api.controller';
import { SiteParserModule } from 'src/site-parser/site-parser.module';

@Module({
  controllers: [ApiController],
  imports: [SiteParserModule],
})
export class ApiModule {}

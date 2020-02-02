import { Module } from '@nestjs/common';
import { ParserService } from './parser/parser.service';

@Module({
  providers: [ParserService],
  exports: [ParserService],
})
export class SiteParserModule {}

import { Controller, Get, Param } from '@nestjs/common';
import { ParserService } from '../../site-parser/parser/parser.service';

@Controller('api')
export class ApiController {
  constructor(private readonly parser: ParserService) {}

  @Get('/films/:id')
  getFilm(@Param('id') id) {
    return this.parser.getFilm(id);
  }

  @Get('/films')
  getFilms() {
    return this.parser.getDashboard();
  }
}

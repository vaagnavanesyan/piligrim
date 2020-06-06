import {ParserService} from '../src/site-parser';

export class ApiService {
  private static readonly baseUrl = 'https://piligrim-app.herokuapp.com/api';

  public static async getDashboard(page: number = 1) {
    const parser = new ParserService();
    return parser.getDashboard();
    // return fetch(
    //   `${ApiService.baseUrl}/dashboard?page=${page}`,
    // ).then(response => response.json());
  }

  public static getAbsoluteUrl(part: string) {
    return `https://piligrim.fund${part}`;
  }
}

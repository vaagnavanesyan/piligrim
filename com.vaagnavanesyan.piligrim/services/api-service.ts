export class ApiService {
  private readonly baseUrl = 'https://piligrim-app.herokuapp.com/api';

  public async getDashboard(page: number = 1) {
    return fetch(`${this.baseUrl}/dashboard?page=${page}`).then(response =>
      response.json(),
    );
  }
}

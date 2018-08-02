import { environment } from '../../environments/environment';

export class Configuration {
  static BASE_URL = environment.production ? '../server' : '/Runtime';
}

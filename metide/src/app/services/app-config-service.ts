import { Injectable } from '@angular/core';
import {AppConfig} from '../models/app-config';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  static settings: AppConfig;

  constructor(
    private readonly http: HttpClient,
  ) { }

  load() {
    const jsonFile = `assets/config/config.json`;
    return new Promise<void>((resolve, reject) => {
      this.http.get(jsonFile).toPromise().then((response: AppConfig) => {
        AppConfigService.settings = <AppConfig>response;
        resolve();
      }).catch((response: any) => {
        reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
      });
    });
  }

}
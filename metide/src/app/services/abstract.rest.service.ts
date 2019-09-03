import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from './app-config-service';
import { map } from 'rxjs/operators';


export abstract class AbstractRestService<T>{
    
    protected headers = new HttpHeaders();

    constructor(
        protected httpClient: HttpClient,protected _endpoint: string) {
        this.headers = this.headers.set('Content-Type', 'application/json');
        this.headers = this.headers.set('Accept', 'application/json');
    }


    /**
     * Carica una lista di risorse da un url,
     * il tipo ritornato è quello specificato dal parametro generico T.
     */
    protected listFromUrl (url : string) : any{
        let results : any;
        let authorizationData = 'Basic ' + btoa(AppConfigService.settings.userName + ':' + AppConfigService.settings.password);
        
        this.headers.set('Authorization',authorizationData);
        this.headers.set('Access-Control-Allow-Origin','*');
        this.headers.set('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE, OPTIONS');
        this.headers.set('Access-Control-Allow-Headers','Origin, Content-Type, X-Auth-Token');

        

        this.httpClient.get(`${url}`, {
            headers : this.headers
          })
          .subscribe(data => {
            results = data;
            console.log(data);
          })
        return results;

        
    }


    protected deserialize(item: any): T {
        return item as T;
    }
}
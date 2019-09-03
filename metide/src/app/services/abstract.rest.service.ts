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
    protected listFromUrl (url : string) : Observable<T[]>{
        let authorizationData = 'Basic ' + btoa(AppConfigService.settings.userName + ':' + AppConfigService.settings.password);
        this.headers = this.headers.set('Authorization', authorizationData);
        const retVal = this.httpClient.get<T[]>(`${url}`).pipe(map((data: any) => data));
        return retVal;
    }

}
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from './app-config-service';

export abstract class AbstractRestService<T>{
    
    protected headers = new HttpHeaders();

    constructor(
        protected httpClient: HttpClient,protected _endpoint: string) {
        this.headers = this.headers.set('Content-Type', 'application/json');
        this.headers = this.headers.set('Accept', 'application/json');
    }


    protected listFromUrl (url : string) : T[]{
        return null;
    }

}
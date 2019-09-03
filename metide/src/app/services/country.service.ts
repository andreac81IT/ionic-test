import { AbstractRestService } from './abstract.rest.service';
import { Country } from '../models/country.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class CountryService extends AbstractRestService<Country>{

   
    constructor(protected httpClient: HttpClient) {
        super(httpClient,"/country");
    }

    listFromUrl () : Observable<Country[]>{
        const url = "https://us-central1-job-interview-cfe5a.cloudfunctions.net/countries";
        return super.listFromUrl(url);
    }
}
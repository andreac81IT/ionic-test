import { AbstractRestService } from './abstract.rest.service';
import { Country } from '../models/country.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class CountryService extends AbstractRestService<Country>{

    constructor(protected httpClient: HttpClient) {
        super(httpClient,"/country");
    }

    


}
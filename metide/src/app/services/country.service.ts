import { AbstractRestService } from './abstract.rest.service';
import { Country } from '../models/country.model';

export class CountryService extends AbstractRestService<Country>{

    constructor(url : string){
        super(url);
    }

}
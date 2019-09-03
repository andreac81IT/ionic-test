import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import {CountryService} from '../../services/country.service';
import { Country } from '../../models/country.model';
import { getDistance } from 'geolib';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent implements OnInit {

  countries : Country[];

  constructor(private countryService : CountryService) { }

  ngOnInit() {
    this.countries = this.retrieveListOfCountries();

  }

  retrieveListOfCountries() : Country[]{
     return this.countryService.retrieveCountryOrderByMetideGeoLocation();
  }


  convertCountries(countries: Country[]) {
    console.log(countries);
    return countries.map(country => { return country });
  }


}

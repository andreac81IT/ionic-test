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

  constructor(private countryService : CountryService) { }

  ngOnInit() {
    const countries = this.retrieveListOfCountries();

  }

  retrieveListOfCountries() : Country[]{
    /**
    this.countryService.mockList().pipe(map(
      (countries: any[]) => this.convertCountries(countries)
    ));
    */
     const result = this.countryService.mockList();
  }


  convertCountries(countries: Country[]) {
    console.log(countries);
    return countries.map(country => { return country });
  }


}

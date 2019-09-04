import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import {CountryService} from '../../services/country.service';
import { Country } from '../../models/country.model';
import { getDistance } from 'geolib';
import { ModalController } from '@ionic/angular';
import { NoteModalPage } from 'src/app/note-modal/note-modal.page';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent implements OnInit {

  countries : Country[];

  constructor(private countryService : CountryService,
              private modalController: ModalController) { }

  ngOnInit() {
    this.countries = this.retrieveListOfCountries();

  }

  retrieveListOfCountries() : Country[] {
     return this.countryService.retrieveCountryOrderByMetideGeoLocation();
  }


  convertCountries(countries: Country[]) {
    console.log(countries);
    return countries.map(country => { return country });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: NoteModalPage
    });
    return await modal.present();
  }

}
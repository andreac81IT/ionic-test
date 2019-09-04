import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { CountryService } from '../../services/country.service';
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

  countries: Country[];

  constructor(private countryService: CountryService,
    private modalController: ModalController) { }


  ngOnInit(): void {
    this.countries = this.retrieveListOfCountries();
  }

  retrieveListOfCountries(): Country[] {
    return this.countryService.retrieveCountryOrderByMetideGeoLocation();
  }

  convertCountries(countries: Country[]) {
    console.log(countries);
    return countries.map(country => { return country });
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async presentModal(country: Country) {
    const modal = await this.modalController.create({
      component: NoteModalPage,
      componentProps: {
        'country': this.serialize(country)
      }
    });
    return await modal.present();
  }
  
  protected serialize(item: any): string {
    return JSON.stringify(item);
  }
  
}
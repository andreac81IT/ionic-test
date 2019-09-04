import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { CountryService } from '../../services/country.service';
import { Country } from '../../models/country.model';
import { getDistance } from 'geolib';
import { ModalController } from '@ionic/angular';
import { NoteModalPage } from 'src/app/note-modal/note-modal.page';
import { Storage } from '@ionic/storage';
import { CountryStorageService } from 'src/app/services/country.storage.service';
import { AppConfigService } from 'src/app/services/app-config-service';
import { element } from 'protractor';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent implements OnInit {

  countries: Country[];

  constructor(protected countryService: CountryService,
    protected storage: Storage,
    protected countryStorage: CountryStorageService,
    protected modalController: ModalController) { }


  ngOnInit(): void {
    //se non sono in modalità offline
    if (!AppConfigService.settings.offline) {

      this.countryStorage.deleteStorage().then(el => {
        const result: Country[] = this.countryService.listCountriesFromUrl();
        this.countries = result;
        if (result && result.length > 0) {
          this.countryStorage.getCountries().then(els => {
            if (!els || els.length == 0) {
              this.countryStorage.addCountries(result).then(
                element => {
                });
            }
          });
        }
      });
    }

    else {
      //altrimenti sono in modalità offline e devo aver già caricato le country a db
      this.countryStorage.getCountries().then(
        (els : any) => {
          if(els && els.length > 0 && els[0])
          this.countries = els[0];
        }
      );
    }
  }



  // return this.countryService.retrieveCountryOrderByMetideGeoLocation();
  // }

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
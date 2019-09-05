import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Country } from '../models/country.model'


const ITEMS_KEY = 'my-country';

@Injectable({
  providedIn: 'root'
})
export class CountryStorageService {

  constructor(private storage: Storage) { }

  // CREATE
  addCountry(item: Country): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: Country[]) => {
      if (items) {
        items.push(item);
        return this.storage.set(ITEMS_KEY, items);
      } else {
        return this.storage.set(ITEMS_KEY, [item]);
      }
    });
  }

  addCountries(countries: Country[]): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: Country[]) => {
      if (items) {
          countries.forEach(element => {
          items.push(element);
        });
        return this.storage.set(ITEMS_KEY, items);
      } else {
        return this.storage.set(ITEMS_KEY, [countries]);
      }
    });
  }

  // READ
  getCountries(): Promise<Country[]> {
    return this.storage.get(ITEMS_KEY);
  }

  deleteStorage(): Promise<any> {
    return this.storage.remove(ITEMS_KEY);
  }
}
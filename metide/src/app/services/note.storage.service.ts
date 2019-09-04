import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Note} from '../models/note.model'


const ITEMS_KEY = 'my-note';

@Injectable({
  providedIn: 'root'
})
export class NoteStorageService {

  constructor(private storage: Storage) { }

  // CREATE
  addNote(item: Note): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: Note[]) => {
      if (items) {
        items.push(item);
        return this.storage.set(ITEMS_KEY, items);
      } else {
        return this.storage.set(ITEMS_KEY, [item]);
      }
    });
  }

  // READ
  getNotes(): Promise<Note[]> {
    return this.storage.get(ITEMS_KEY);
  }


  getNoteByCountry(countryId : string | number) : Promise<any>{
    return this.storage.get(ITEMS_KEY).then((items: Note[]) => {
      if (!items || items.length === 0) {
        return null;
      }
      let toKeep: Note[] = [];
      for (let i of items) {
        if (i.countryId !== countryId) {
          return i;
        }
      }
    });
  }

  // UPDATE
  updateNote(item: Note): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: Note[]) => {
      if (!items || items.length === 0) {
        return null;
      }

      let newItems: Note[] = [];

      for (let i of items) {
        if (i.countryId === item.countryId) {
          newItems.push(item);
        } else {
          newItems.push(i);
        }
      }

      return this.storage.set(ITEMS_KEY, newItems);
    });
  }

  // DELETE
  deleteNoteByCountryId(countryId: number | string): Promise<Note> {
    return this.storage.get(ITEMS_KEY).then((items: Note[]) => {
      if (!items || items.length === 0) {
        return null;
      }

      let toKeep: Note[] = [];

      for (let i of items) {
        if (i.countryId !== countryId) {
          toKeep.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, toKeep);
    });
  }
}
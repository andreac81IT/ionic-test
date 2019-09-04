import { AbstractRestService } from './abstract.rest.service';
import { Country } from '../models/country.model';
import { Note } from '../models/note.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class NoteService extends AbstractRestService<Note>{
    constructor(protected httpClient: HttpClient) {
        super(httpClient, "/note");
     }
  
}
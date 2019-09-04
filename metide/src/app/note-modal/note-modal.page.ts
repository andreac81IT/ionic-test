import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams, } from '@ionic/angular';
import { Country } from '../models/country.model';
import { NoteService } from '../services/note.service';
import { Note } from '../models/note.model';
import { NoteStorageService } from '../services/note.storage.service';


@Component({
  selector: 'app-note-modal',
  templateUrl: './note-modal.page.html',
  styleUrls: ['./note-modal.page.scss'],
})
export class NoteModalPage implements OnInit {

  private country : Country;
  private note : Note;
  private toUpdate = false;
  text : string;

  constructor(protected navParams: NavParams, protected modalController: ModalController, 
    protected noteService: NoteService,
    protected noteStorageService : NoteStorageService) {
  }

  ngOnInit(): void {
    const val = this.navParams.get('country');
    this.country = JSON.parse(val);
    
    this.noteStorageService.getNoteByCountry(this.note.countryId).then(
      note => {
        this.note = note;
      }
    );

  }


  public storageNote(){
    if(this.toUpdate){
      this.note.text = this.text;
      this.noteStorageService.updateNote(this.note).then(note => {
        this.closeModal();
      });
    }else{
      this.note = new Note();
      this.note.countryId = this.country.id;
      this.note.text = this.text;
      this.noteStorageService.addNote(this.note).then(note => {
        this.closeModal();
      });
    }
  }

  /**
   * Salva / aggiorna il testo di una nota.
   */
  public saveNote(){
    if(this.toUpdate){
      this.note.text = this.text;
      this.noteService.update(this.note.id,this.note).subscribe(
        (note: Note) => {
          this.closeModal();
        }
      );
    }else{
      this.note = new Note();
      this.note.countryId = this.country.id;
      this.note.text = this.text;
      this.noteService.create(this.note).subscribe(
        (note: Note) => {
          this.closeModal();
        }
      );
    }
  }

  public closeModal() {
    this.modalController.dismiss();
  }

}
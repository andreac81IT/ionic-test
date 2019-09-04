import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams, } from '@ionic/angular';
import { Country } from '../models/country.model';
import { NoteService } from '../services/note.service';
import { Note } from '../models/note.model';


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

  constructor(protected navParams: NavParams, protected modalController: ModalController, protected noteService: NoteService) {
  }

  ngOnInit(): void {
    const val = this.navParams.get('country');
    this.country = JSON.parse(val);
    const result = this.noteService.list({ "country": this.country.id }).subscribe(
      (result: Note[]) => {
        if (result && result.length > 0) {
          this.note = result[0];
          this.text = result[0].text;
          this.toUpdate = true;
        }
      },
      error => {
        //da inserire una modale di errore tecnico
        console.log("error");
      }
    );
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
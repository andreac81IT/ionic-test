import { Component, OnInit, Input } from '@angular/core';
import {ModalController, NavParams,} from '@ionic/angular';
import { Country } from '../models/country.model';
import { NoteService } from '../services/note.service';
import { Note } from '../models/note.model';


@Component({
  selector: 'app-note-modal',
  templateUrl: './note-modal.page.html',
  styleUrls: ['./note-modal.page.scss'],
})
export class NoteModalPage implements OnInit {
  
  private id : string | number;
  private countryName : string;
  private text : string;
  private toUpdate = false;

  constructor(protected navParams: NavParams, protected modalController : ModalController,protected noteService : NoteService ) {
  }

  ngOnInit(): void {
    this.id = this.navParams.get('id');
    this.countryName = this.navParams.get("countryName");
    
    const result = this.noteService.list({"country" : this.id}).subscribe(
      (result : Note[]) => {
        if(result && result.length > 0){
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

  
 
    
     
    
   

  

  public closeModal(){
    this.modalController.dismiss();
}

}
import { Component, OnInit, Input } from '@angular/core';
import {ModalController, NavParams,} from '@ionic/angular';


@Component({
  selector: 'app-note-modal',
  templateUrl: './note-modal.page.html',
  styleUrls: ['./note-modal.page.scss'],
})
export class NoteModalPage {

  constructor(public navParams: NavParams, public modalController : ModalController ) {
    console.log(navParams.get('id'));
  }

  public closeModal(){
    this.modalController.dismiss();
}

}
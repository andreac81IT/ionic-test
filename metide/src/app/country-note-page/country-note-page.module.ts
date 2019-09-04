import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CountryNotePagePage } from './country-note-page.page';

const routes: Routes = [
  {
    path: '',
    component: CountryNotePagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CountryNotePagePage]
})
export class CountryNotePagePageModule {}

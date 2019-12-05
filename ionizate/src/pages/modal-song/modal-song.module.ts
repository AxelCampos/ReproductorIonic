import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalSongPage } from './modal-song';

@NgModule({
  declarations: [
    ModalSongPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalSongPage),
  ],
})
export class ModalSongPageModule {}

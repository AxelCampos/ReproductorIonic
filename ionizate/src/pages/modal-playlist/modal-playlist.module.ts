import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalPlaylistPage } from './modal-playlist';

@NgModule({
  declarations: [
    ModalPlaylistPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalPlaylistPage),
  ],
})
export class ModalPlaylistPageModule {}

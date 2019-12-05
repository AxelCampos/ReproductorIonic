import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BeforeAddPlaylistPage } from './before-add-playlist';

@NgModule({
  declarations: [
    BeforeAddPlaylistPage,
  ],
  imports: [
    IonicPageModule.forChild(BeforeAddPlaylistPage),
  ],
})
export class BeforeAddPlaylistPageModule {}

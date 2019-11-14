import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreviusSongsPage } from './previus-songs';

@NgModule({
  declarations: [
    PreviusSongsPage,
  ],
  imports: [
    IonicPageModule.forChild(PreviusSongsPage),
  ],
})
export class PreviusSongsPageModule {}

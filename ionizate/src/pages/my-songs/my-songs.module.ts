import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MySongsPage } from './my-songs';

@NgModule({
  declarations: [
    MySongsPage,
  ],
  imports: [
    IonicPageModule.forChild(MySongsPage),
  ],
})
export class MySongsPageModule {}

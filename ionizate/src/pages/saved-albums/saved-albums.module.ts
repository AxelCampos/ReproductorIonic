import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SavedAlbumsPage } from './saved-albums';

@NgModule({
  declarations: [
    SavedAlbumsPage,
  ],
  imports: [
    IonicPageModule.forChild(SavedAlbumsPage),
  ],
})
export class SavedAlbumsPageModule {}

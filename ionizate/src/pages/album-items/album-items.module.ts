import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlbumItemsPage } from './album-items';

@NgModule({
  declarations: [
    AlbumItemsPage,
  ],
  imports: [
    IonicPageModule.forChild(AlbumItemsPage),
  ],
})
export class AlbumItemsPageModule {}

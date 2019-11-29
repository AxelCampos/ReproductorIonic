import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FollowsPage } from './follows';

@NgModule({
  declarations: [
    FollowsPage,
  ],
  imports: [
    IonicPageModule.forChild(FollowsPage),
  ],
})
export class FollowsPageModule {}

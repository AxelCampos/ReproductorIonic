import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ModalSongPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-song',
  templateUrl: 'modal-song.html',
})
export class ModalSongPage {
  private item: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = {
      name: navParams.get('name'),
      artists: navParams.get('artists'),
      url: navParams.get('url'),
      external_url:navParams.get('external_url'),
      imageURL:navParams.get('imageURL')

    };
    console.log(this.item);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalSongPage');
  }

}

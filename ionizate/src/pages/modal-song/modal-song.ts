import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {NodeServerProvider} from "../../providers/node-server/node-server";
import {BeforeAddPlaylistPage} from "../before-add-playlist/before-add-playlist";

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
  private saved: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _nodeProvider: NodeServerProvider,public viewCtrl: ViewController) {
    this.item = {
      name: navParams.get('name'),
      artists: navParams.get('artists'),
      url: navParams.get('url'),
      external_url: navParams.get('external_url'),
      imageURL: navParams.get('imageURL')
    };
    this.saved = navParams.get('saved');
  }

  deleteItem() {
    this._nodeProvider.deleteSong(this.item.url);
    this.saved = false;
    this.viewCtrl.dismiss();
  }


  saveTrack() {
    let item = {
      artists: this.item.artists,
      name: this.item.name,
      url: this.item.url,
      external_url: this.item.external_url,
      imageURL: this.item.imageURL
    };
    this._nodeProvider.setSong(item);
    this.saved = true;
    this.viewCtrl.dismiss();
  }
  doHandleAddPlaylist(){
    this.navCtrl.push(BeforeAddPlaylistPage,{item:this.item});
    this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {
  }

}

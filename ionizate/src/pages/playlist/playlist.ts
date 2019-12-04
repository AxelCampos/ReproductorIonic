import {Component} from '@angular/core';
import {IonicPage, ModalController, ModalOptions, NavController, NavParams} from 'ionic-angular';
import {ModalPlaylistPage} from "../modal-playlist/modal-playlist";
import {NodeServerProvider} from "../../providers/node-server/node-server";

/**
 * Generated class for the PlaylistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-playlist',
  templateUrl: 'playlist.html',
})
export class PlaylistPage {
  private playlist: any []=[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private _nodeProvider: NodeServerProvider) {
  }

  addPlaylist() {
    let modal = this.modalCtrl.create(ModalPlaylistPage);
    modal.present();
    modal.onDidDismiss(()=>{
      this.getPlayList();
    })
  }

  getPlayList() {
    this._nodeProvider.getPlaylist().then(data => {
      this.playlist = data;
    });
  }

  ionViewWillEnter() {
    this.getPlayList();
  }
}




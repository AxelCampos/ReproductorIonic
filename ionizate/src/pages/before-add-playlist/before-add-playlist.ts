import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {NodeServerProvider} from "../../providers/node-server/node-server";
import {ModalPlaylistPage} from "../modal-playlist/modal-playlist";

@IonicPage()
@Component({
  selector: 'page-before-add-playlist',
  templateUrl: 'before-add-playlist.html',
})
export class BeforeAddPlaylistPage {
  private playlist: any []=[];
  private item: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private _nodeProvider: NodeServerProvider)
  {
    this.item = navParams.get('item');
  }
  saveInPlaylist(playlist: string){
    this._nodeProvider.setPlaylist(playlist, this.item);
    this.navCtrl.pop();
  }
  addPlaylist() {
    let modal = this.modalCtrl.create(ModalPlaylistPage,{valid :true, item: this.item});
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

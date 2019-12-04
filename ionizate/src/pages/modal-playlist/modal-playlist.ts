import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {NodeServerProvider} from "../../providers/node-server/node-server";

@IonicPage()
@Component({
  selector: 'page-modal-playlist',
  templateUrl: 'modal-playlist.html',
})
export class ModalPlaylistPage {
  private namePlaylist: string = undefined;
  private playlist: any [] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _nodeProvider: NodeServerProvider,
              public viewCtrl: ViewController
  ) {
  }

  setNamePlaylist(event: any) {
    this.namePlaylist = event.value;
  }

  getPlayList() {
    this._nodeProvider.getPlaylist().then(data => {
      this.playlist = data;
    });
  }

  savePlaylist(resp: boolean) {
    if (resp) {
      this._nodeProvider.savePlaylist(this.namePlaylist);
    } else {
      let name = 'playlist'+(this.playlist.length+1);
      this._nodeProvider.savePlaylist(name);
    }
    this.viewCtrl.dismiss();
  }

  ionViewWillEnter() {
    this.getPlayList();
  }

}

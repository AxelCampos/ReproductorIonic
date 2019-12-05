import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NodeServerProvider} from "../../providers/node-server/node-server";
import {ArtistAlbumsPage} from "../artist-albums/artist-albums";
import {PreviusSongsPage} from "../previus-songs/previus-songs";

@IonicPage()
@Component({
  selector: 'page-my-songs',
  templateUrl: 'my-songs.html',
})
export class MySongsPage {

  private songs : any[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _nodeProvider: NodeServerProvider) {
  }

  getSongs(){
    this._nodeProvider.getSongs().then(data=>{
      data.forEach(dt=>{
        this.songs.push(dt.item);
      });
    });
  }
  deleteItem(url: string) {
    this._nodeProvider.deleteSong(url);
    setTimeout(() => {
      this.songs =[];
      this.getSongs();
    }, 300);
  }

  goToPreview(tracks: any[], name: string, url: string, external_url: string, artists: string, i: number) {
    this.navCtrl.push(PreviusSongsPage, {
      index: i,
      tracks: tracks,
      currentItem: {
        name: name,
        url: url,
        external_url: external_url,
        artists: artists
      }
    });
  }

  ionViewDidLoad() {
    this.getSongs();
    console.log()
  }

}

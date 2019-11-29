import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {SpotifyProvider} from "../../providers/spotify/spotify";
import {NodeServerProvider} from "../../providers/node-server/node-server";
import {AlbumItemsPage} from "../album-items/album-items";

@IonicPage()
@Component({
  selector: 'page-saved-albums',
  templateUrl: 'saved-albums.html',
})
export class SavedAlbumsPage {
  private albums: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private _provider: SpotifyProvider,
              private _nodeProvider: NodeServerProvider) {
  }

  getSavedAlbums() {
    this._nodeProvider.getAlbumsSaved().then(data => {
      data.forEach(dt => {
        this._provider.searchAlbum(dt.id).subscribe((data: any) => {
          this.albums.push(data);
        })
      })
    })
  }
  getSongs(id: string, name:string) {
    this.navCtrl.push(AlbumItemsPage, {
      id: id,
      name: name
    });
  }
  deleteItem(id: string) {
    this._nodeProvider.deleteSavedAlbum(id);
    setTimeout(() => {
      this.albums =[];
      this.getSavedAlbums();
    }, 300);
  }

  ionViewDidLoad() {
    this.getSavedAlbums();
  }

}

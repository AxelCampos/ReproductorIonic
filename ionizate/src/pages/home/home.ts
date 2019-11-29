import {NodeServerProvider} from './../../providers/node-server/node-server';
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SpotifyProvider} from '../../providers/spotify/spotify';
import {ArtistAlbumsPage} from '../artist-albums/artist-albums';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private name: string;
  private items: any[];
  private latestSearch: any[]=[];
  private value: string;

  constructor(
    public navCtrl: NavController,
    private _provider: SpotifyProvider,
    private _nodeProvider: NodeServerProvider
  ) {
  }

  search(event: any) {
    this.value = event.target.value;
    if (this.value != '') {
      this._provider.searchArtists(this.value).subscribe(
        (data: any) => {
          this.items = data.artists.items;
        },
        (error) => {
          console.log(error);
        }
      );
    }

  }

  searchAlbums(item: any) {
    this._nodeProvider.setLatestJson(item);
    this.navCtrl.push(ArtistAlbumsPage, {
      id: item.id,
      name: item.name,
      image: item.images[0],
      popularity: item.popularity,
      followers: item.followers.total
    });
  }

   searchLatest() {
    this._nodeProvider.searchLatest().then(data => {
     this.latestSearch = data;
    });
  }

  deleteItem(id: string) {
    this._nodeProvider.deleteItem(id);
    setTimeout(() => {
      this.searchLatest();
    }, 300);
  }

  ionViewWillEnter() {
    this.searchLatest();
  }
}

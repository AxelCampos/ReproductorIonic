import {PreviusSongsPage} from './../previus-songs/previus-songs';
import {SpotifyProvider} from './../../providers/spotify/spotify';
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NodeServerProvider} from "../../providers/node-server/node-server";

@IonicPage()
@Component({
  selector: 'page-album-items',
  templateUrl: 'album-items.html'
})
export class AlbumItemsPage {
  private id: string;
  private name: string;
  private album: any;
  private imageUrl: string;
  private tracks: any[] = [];
  private save = false;
  private albumsSaved: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private _provider: SpotifyProvider, private _nodeProvider: NodeServerProvider) {
    this.id = this.navParams.get('id');
    this.name = this.navParams.get('name');
    this.getAlbum();
  }


  saveAlbum() {
    this._nodeProvider.save(this.album.id);
    setTimeout(() => {
      this.ionViewWillEnter();
    }, 500);
  }

  getAlbumsSaved() {
    this._nodeProvider.getAlbumsSaved().subscribe(
      (data: any) => {
        this.albumsSaved = data;
        this.albumsSaved.forEach((x) => {
          if (x.id == this.id) {
            this.save = true;
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAlbum() {
    this._provider.searchAlbum(this.id).subscribe(
      (data) => {
        this.album = data;
        this.imageUrl = this.album.images[0];
        this.album.tracks.items.forEach(t => {
          var artists = '';
          for (var i = 0; i <= t.artists.length; i++) {
            if (t.artists[i] != undefined) {
              if (t.artists[i + 1] == undefined) {
                artists = artists + t.artists[i].name;
              } else {
                artists = artists + t.artists[i].name + ', ';
              }
            }

          }
          var item = {
            name: t.name,
            url: t.preview_url,
            artists: artists,
            imageURL: this.imageUrl,
            external_url: t.external_urls.spotify,
          };
          this.tracks.push(item);
        })
      },
      (error) => {
        console.log(error);
      }
    );
  }

  goToPreview(tracks: any[]) {
    console.log(tracks);
    this.navCtrl.push(PreviusSongsPage, {
      tracks: tracks
    });
  }

  ionViewWillEnter() {
    this.getAlbumsSaved()
  }

}

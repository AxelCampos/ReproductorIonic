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
  private imageUrl: {};
  private tracks: any[] = [];
  private save = false;
  private albumsSaved: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private _provider: SpotifyProvider, private _nodeProvider: NodeServerProvider) {
    this.name = this.navParams.get('name');
    if (navParams.get('isPlaylist')) {
      this.imageUrl=navParams.get('imageURL');
      this.getTracksOfPlaylist();
    } else {
      this.id = this.navParams.get('id');
      this.getAlbum();
    }
  }


  saveAlbum() {
    this._nodeProvider.save(this.album.id, this.album.name);
    setTimeout(() => {
      this.ionViewWillEnter();
    }, 300);
  }

  getAlbumsSaved() {
    this._nodeProvider.getAlbumsSaved().then(
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

  getTracksOfPlaylist(){
    this._nodeProvider.getTracksOfPlaylist(this.name).then(data=>{
      this.tracks = data;
    });
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

  ionViewWillEnter() {
    this.getAlbumsSaved();
  }

}

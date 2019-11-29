import {NodeServerProvider} from './../../providers/node-server/node-server';
import {AlbumItemsPage} from './../album-items/album-items';
import {SpotifyProvider} from './../../providers/spotify/spotify';
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PreviusSongsPage} from "../previus-songs/previus-songs";

@IonicPage()
@Component({
  selector: 'page-artist-albums',
  templateUrl: 'artist-albums.html'
})
export class ArtistAlbumsPage {
  private follow = false;
  private following: any[];
  private id: string;
  private name: string;
  private image: string;
  private popularity: string;
  private followers: string;
  private albums: any[] = [];
  private singles: any[] = [];
  private topTracks: any[] = [];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _provider: SpotifyProvider,
    private _nodeProvider: NodeServerProvider
  ) {
    this.id = this.navParams.get('id');
    this.name = this.navParams.get('name');
    this.image = this.navParams.get('image');
    this.popularity = this.navParams.get('popularity');
    this.followers = this.navParams.get('followers');
    this.getAlbums();
    this.getTopTracks();
    this.getFollowing();
  }

  getAlbums() {
    this._provider.searchAlbums(this.id).subscribe(
      (data: any) => {
        var data = data.items;
        data.forEach(d => {
          d.total_tracks != '1' ? this.albums.push(d) : this.singles.push(d);
        })
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getTopTracks() {
    this._provider.searchTopTracks(this.id).subscribe(
      (data: any) => {
        var tracks = data.tracks;
        var count = 1;

        tracks.forEach(t => {
          var artists = '';
          for (var i = 0; i <= t.artists.length; i++) {
            if (t.artists[i] != undefined) {
              if (t.artists[i+1] == undefined) {
                artists = artists + t.artists[i].name;
              } else {
                artists = artists + t.artists[i].name + ', ';
              }
            }

          }
          var item = {
            id: count,
            name: t.name,
            url: t.preview_url,
            artists: artists,
            external_url: t.external_urls.spotify,
            imageURL: t.album.images[0]
          };
          this.topTracks.push(item);
          count++;
        })
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getFollowing() {
    this._nodeProvider.getFollowings().then(
      (data: any) => {
        this.following = data;
        this.following.forEach((x) => {
          if (x.id == this.id) {
            this.follow = true;
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getSongs(id: string) {
    this.navCtrl.push(AlbumItemsPage, {
      id: id,
      name: this.name
    });
  }

  setFollow() {
    this._nodeProvider.setFollow(this.id, this.name);
    setTimeout(() => {
      this.ionViewWillEnter();
    }, 500);
  }

  goToPreview(tracks: any[], name: string, url: string,external_url: string, artists: string, i: number) {
    this.navCtrl.push(PreviusSongsPage, {
      index:i,
      tracks: tracks,
      currentItem:{
        name: name,
        url: url,
        external_url: external_url,
        artists: artists
      }
    });
  }

  ionViewWillEnter() {
    this.getFollowing();
  }

}

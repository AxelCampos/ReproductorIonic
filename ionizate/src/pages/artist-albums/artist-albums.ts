import { NodeServerProvider } from './../../providers/node-server/node-server';
import { AlbumItemsPage } from './../album-items/album-items';
import { SpotifyProvider } from './../../providers/spotify/spotify';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
	private albums: any[]=[];
  private singles: any[]=[];
	private topTracks: any[]=[];


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
				data.forEach(d=>{
				  d.total_tracks != '1'? this.albums.push(d) : this.singles.push(d);
        })
        console.log(this.singles)
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
				var count=1;
				tracks.forEach(t=>{
				  var item={
				    id: count,
            name: t.name,
          }
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
		this._nodeProvider.getFollowings().subscribe(
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
			id: id
		});
	}

	setFollow() {
		this._nodeProvider.setFollow(this.id);
		setTimeout(() => {
			this.ionViewWillEnter();
		}, 500);
	}
	ionViewWillEnter() {
		this.getFollowing();
	}

}

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
	private albums: any[];
	private topTracks: any[];

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
				this.albums = data.items;
			},
			(error) => {
				console.log(error);
			}
		);
	}
	getTopTracks() {
		this._provider.searchTopTracks(this.id).subscribe(
			(data: any) => {
				this.topTracks = data.tracks;
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
						console.log('lo ha encontrao');
						this.follow = true;
					} else {
						console.log('no lo ha encontrao');
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
		console.log('entra por aqui');
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ArtistAlbumsPage');
	}
}

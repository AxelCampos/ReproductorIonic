import { PreviusSongsPage } from './../previus-songs/previus-songs';
import { SpotifyProvider } from './../../providers/spotify/spotify';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-album-items',
	templateUrl: 'album-items.html'
})
export class AlbumItemsPage {
	private id: string;
	private album: any;
	private imageUrl: string;
	private tracks: any[];

	constructor(public navCtrl: NavController, public navParams: NavParams, private _provider: SpotifyProvider) {
		this.id = this.navParams.get('id');
		this.getAlbum();
	}

	ionViewDidLoad() {
	}
	getAlbum() {
		this._provider.searchAlbum(this.id).subscribe(
			(data) => {
				this.album = data;
				this.imageUrl = this.album.images[0];
				this.tracks = this.album.tracks.items;
			},
			(error) => {
				console.log(error);
			}
		);
	}
	goToPreview(name: string, artists: any[], url: string, image: string) {
		this.navCtrl.push(PreviusSongsPage, {
			name: name,
			artists: artists,
			url: url,
			image: image
		});
	}
}

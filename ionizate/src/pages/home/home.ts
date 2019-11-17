import { NodeServerProvider } from './../../providers/node-server/node-server';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SpotifyProvider } from '../../providers/spotify/spotify';
import { ArtistAlbumsPage } from '../artist-albums/artist-albums';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	private name: string;
	private items: any[];
	private latestSearch: any;

	constructor(
		public navCtrl: NavController,
		private _provider: SpotifyProvider,
		private _nodeProvider: NodeServerProvider
	) {}

	search(event: any) {
		let value = event.target.value;
		this._provider.searchArtists(value).subscribe(
			(data: any) => {
				this.items = data.artists.items;
			},
			(error) => {
				console.log(error);
			}
		);
	}
	searchAlbums(item: any) {
		console.log(item);
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
		this._nodeProvider.searchLatest().subscribe(
			(data: any) => {
				this.latestSearch = data;
			},
			(error) => {
				console.log(error);
			}
		);
	}
	ionViewWillEnter() {
		this.searchLatest();
	}
}

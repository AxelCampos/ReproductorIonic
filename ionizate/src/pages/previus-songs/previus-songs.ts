import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-previus-songs',
	templateUrl: 'previus-songs.html'
})
export class PreviusSongsPage {
	private nameSong: string;
	private artists: any[];
	private url: string;
	private image: string;
	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.nameSong = this.navParams.get('name');
		this.artists = this.navParams.get('artists');
		this.url = this.navParams.get('url');
		this.image = this.navParams.get('image');
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad PreviusSongsPage');
	}
}

import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {Media, MediaObject } from "@ionic-native/media";

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
  private currentTrack: MediaObject = null;
  private playing = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public media: Media, private platform : Platform) {
    this.nameSong = this.navParams.get('name');
    this.artists = this.navParams.get('artists');
    this.url = this.navParams.get('url');
    this.image = this.navParams.get('image');
  }

  play(item: string) {
    this.playing = true;
    this.platform.ready().then(() => {
      this.currentTrack = this.media.create(item);
      this.currentTrack.play();
    });
  }

  stop() {
    if (this.currentTrack) {
      this.currentTrack.stop();
      this.playing = false;
    }
  }

  ionViewDidLoad() {
  }
}

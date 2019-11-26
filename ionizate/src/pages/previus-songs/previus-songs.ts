import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {Media, MediaObject } from "@ionic-native/media";

@IonicPage()
@Component({
  selector: 'page-previus-songs',
  templateUrl: 'previus-songs.html'
})
export class PreviusSongsPage {
  private currentTrack: MediaObject = null;
  private playing = false;
  private tracks: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public media: Media, private platform : Platform) {
    this.tracks = this.navParams.get('tracks');
    console.log(this.tracks);
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

  open(item: string){
    window.open(item, '_system', 'location=yes');
  }

  ionViewDidLoad() {
  }
}

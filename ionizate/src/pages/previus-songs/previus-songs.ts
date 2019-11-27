import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {Media, MediaObject } from "@ionic-native/media";
import { Slides } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-previus-songs',
  templateUrl: 'previus-songs.html'
})
export class PreviusSongsPage {
  private currentTrack: MediaObject = null;
  private playing = false;
  private tracks: any[];
  private currentItem: any;
  private index: number;
  private acceptChange= false;
  @ViewChild(Slides) slides: Slides;


  constructor(public navCtrl: NavController, public navParams: NavParams, public media: Media, private platform : Platform) {
    this.tracks = navParams.get('tracks');
    this.currentItem = navParams.get('currentItem');
    this.index= navParams.get('index');
    console.log(this.tracks);
    console.log(this.currentItem);
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
  doChangeCurrent(){
    if (this.index==0){
      this.acceptChange = true;
    }
    if (!this.acceptChange){
      this.acceptChange= true;
    }else{
      this.index++;
      console.log(this.index);
    }
  }
  ionSlideNextEnd(){
    console.log("holados")
  }
}

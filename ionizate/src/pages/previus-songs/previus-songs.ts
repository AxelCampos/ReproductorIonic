import {Component, ViewChild} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, Platform} from 'ionic-angular';
import {Media, MediaObject } from "@ionic-native/media";
import { Slides } from 'ionic-angular';
import {NodeServerProvider} from "../../providers/node-server/node-server";
import {ModalSongPage} from "../modal-song/modal-song";

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
  private acceptChange = false;
  private savedSong = false;
  private songs: any [];
  @ViewChild(Slides) slides: Slides;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public media: Media,
    private platform : Platform,
    private _nodeProvider: NodeServerProvider,
    public modalCtrl: ModalController
  ) {
    this.tracks = navParams.get('tracks');
    this.currentItem = navParams.get('currentItem');
    this.index= navParams.get('index');
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

  getSong(){
    this.savedSong=false;
    this._nodeProvider.getSongs().then(
      (data: any) => {
        this.songs = data;
        this.songs.forEach((x) => {
          if (x.item.external_url == this.currentItem.external_url) {

            this.savedSong = true;
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  doChangeCurrentNext(){
    if (this.index==0){
      this.acceptChange = true;
    }
    if (this.index == this.tracks.length){
      this.acceptChange = false;
    }
    if (!this.acceptChange){
      this.acceptChange= true;
    }else{
      this.index++;
      for (let i=0; i<=this.tracks.length; i++){
        if(i == this.index)  this.currentItem = this.tracks[i];
      }
    }
    this.getSong();
  }

  doChangeCurrentPrev(){
    this.index--;
    for (let i=0; i<=this.tracks.length; i++){
      if(i == this.index)  this.currentItem = this.tracks[i];
    }
    this.getSong();
  }

  nextCurrent(){
    this.slides.slideTo(this.index+1);
    this.getSong();
  }
  prevCurrent(){
    this.slides.slideTo((this.index -1));
    this.getSong();
  }
  setSong(image: any){
    let item={
      artists : this.currentItem.artists,
      name: this.currentItem.name,
      url: this.currentItem.url,
      external_url: this.currentItem.external_url,
      imageURL: image
    };
    this._nodeProvider.setSong(item);
    setTimeout(() => {
      this.ionViewWillEnter();
    }, 300);
  }
  openModal(image: any){
    let item={
      artists : this.currentItem.artists,
      name: this.currentItem.name,
      url: this.currentItem.url,
      external_url: this.currentItem.external_url,
      imageURL: image,
      saved: this.savedSong
    };
    let modal = this.modalCtrl.create(ModalSongPage, item);
    modal.present();
    modal.onDidDismiss(()=>{
      this.getSong();
    })
  }
  ionViewWillEnter(){
    this.getSong();
  }
}

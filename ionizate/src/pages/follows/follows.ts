import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SpotifyProvider} from "../../providers/spotify/spotify";
import {NodeServerProvider} from "../../providers/node-server/node-server";
import {ArtistAlbumsPage} from "../artist-albums/artist-albums";

@IonicPage()
@Component({
  selector: 'page-follows',
  templateUrl: 'follows.html',
})
export class FollowsPage {
  private artists : any[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private _provider: SpotifyProvider,
              private _nodeProvider: NodeServerProvider) {
  }

  getFollows(){
    this._nodeProvider.getFollowings().then(data=>{
      data.forEach(dt=>{
        this._provider.getArtistById(dt.id).subscribe((data:any) =>{
          data.artists.forEach(a=>{
            this.artists.push(a);
          })
        })
      })

    });
  }
  deleteItem(id: string) {
    this._nodeProvider.deleteFollows(id);
    setTimeout(() => {
      this.artists =[];
      this.getFollows();
    }, 300);
  }

  searchAlbums(item: any) {
    this.navCtrl.push(ArtistAlbumsPage, {
      id: item.id,
      name: item.name,
      image: item.images[0],
      popularity: item.popularity,
      followers: item.followers.total
    });
  }

  ionViewDidLoad() {
    this.getFollows();
  }

}

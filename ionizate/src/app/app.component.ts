import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {PlaylistPage} from "../pages/playlist/playlist";
import {SavedAlbumsPage} from "../pages/saved-albums/saved-albums";
import {FollowsPage} from "../pages/follows/follows";
import {MySongsPage} from "../pages/my-songs/my-songs";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  @ViewChild(Nav) nav: Nav;
  pages: Array<{ icon: string ,title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.pages = [
        { icon: 'ios-search' ,title: 'Búsqueda', component: HomePage },
        { icon: 'ios-person-add',title: 'Mis artistas', component: FollowsPage },
        { icon: 'ios-musical-note',title: 'Mis canciones', component: MySongsPage },
        { icon: 'md-disc',title: 'Albumes', component: SavedAlbumsPage },
        { icon: 'ios-musical-notes',title: 'Playlist', component: PlaylistPage }
      ];
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}


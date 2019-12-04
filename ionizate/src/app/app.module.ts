import { PreviusSongsPage } from './../pages/previus-songs/previus-songs';
import { AlbumItemsPage } from './../pages/album-items/album-items';
import { ArtistAlbumsPage } from './../pages/artist-albums/artist-albums';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SpotifyProvider } from '../providers/spotify/spotify';
import { NodeServerProvider } from '../providers/node-server/node-server';
import {Media} from "@ionic-native/media";
import {FollowsPage} from "../pages/follows/follows";
import {PlaylistPage} from "../pages/playlist/playlist";
import {SavedAlbumsPage} from "../pages/saved-albums/saved-albums";
import {ModalPlaylistPage} from "../pages/modal-playlist/modal-playlist";



@NgModule({
	declarations: [ MyApp, HomePage, ArtistAlbumsPage, ModalPlaylistPage,AlbumItemsPage, PreviusSongsPage, FollowsPage,PlaylistPage, SavedAlbumsPage ],
	imports: [ BrowserModule, IonicModule.forRoot(MyApp), HttpClientModule ],
	bootstrap: [ IonicApp ],
	entryComponents: [ MyApp, HomePage, ModalPlaylistPage,ArtistAlbumsPage, AlbumItemsPage, PreviusSongsPage,FollowsPage,PlaylistPage, SavedAlbumsPage ],
	providers: [
	  StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    SpotifyProvider,
    NodeServerProvider,
    Media
  ]
})
export class AppModule {
}

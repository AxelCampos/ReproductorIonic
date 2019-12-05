import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SpotifyProvider {
	private baseUrl: string = 'https://api.spotify.com/v1';
	private searchUrl: string = this.baseUrl + '/search?q=';
	private albumsUrl: string = this.baseUrl + '/artists/';
	private albumUrl: string = this.baseUrl + '/albums/';
	private artistIdUrl : string = this.baseUrl + '/artists?ids=';
	private auth_token: string = 'Authorization: Bearer BQDriQX6kU0FNV9ohX3rL0fO2aVGKuesgza1vYq_p0WSEU9_vxXkxsLff0WSmeinx4XkW-IdOXbACIG_zw3Pt_6QF7CdjNVDf82uXC-9OlxMYtRGBqjowoyf4BnO22wsKr3KabBOgfm-IHFNP8lM5gwLFYCZw5-QqvX1GsxxIii1GJY';

	private requestHeader = new HttpHeaders()
		.set('Content-Type', 'application/json')
		.append('Authorization', this.auth_token);

	searchArtists(name: string) {
		return this.http.get(this.searchUrl + name + '&type=artist', {
			headers: this.requestHeader
		});
	}
	getArtistById(id: string){
	  return this.http.get(this.artistIdUrl +id ,{headers: this.requestHeader})
  }

	searchAlbums(id: string) {
		return this.http.get(this.albumsUrl + id + '/albums', {
			headers: this.requestHeader
		});
	}

	searchAlbum(id: string) {
		return this.http.get(this.albumUrl + id, { headers: this.requestHeader });
	}

	searchTopTracks(id: string) {
		return this.http.get(this.albumsUrl + id + '/top-tracks?country=ES', { headers: this.requestHeader });
	}

	constructor(public http: HttpClient) {}
}

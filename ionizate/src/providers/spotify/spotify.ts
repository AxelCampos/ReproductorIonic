import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SpotifyProvider {
	private baseUrl: string = 'https://api.spotify.com/v1';
	private searchUrl: string = this.baseUrl + '/search?q=';
	private albumsUrl: string = this.baseUrl + '/artists/';
	private albumUrl: string = this.baseUrl + '/albums/';
	private artistIdUrl : string = this.baseUrl + '/artists?ids=';
	private auth_token: string = 'Authorization: Bearer BQDNHhDrg2q9Sxymn7r9lVhXP5b-ReoWJJSaKCsDF20Iaq47wI1KVUzADAZMgJlRQ4u_A_sI45TIJSaqgWLvHsdVYFpO4mY_7EFFkdZwnROtr8P0AW-G8htJk_3CaQ0ledoXRVRPLb52F2DF9p5uTKhWMal2qa3zEgOEjR7WdJ8eJOA';

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

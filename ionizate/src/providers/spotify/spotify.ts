import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SpotifyProvider {
	private baseUrl: string = 'https://api.spotify.com/v1';
	private searchUrl: string = this.baseUrl + '/search?q=';
	private albumsUrl: string = this.baseUrl + '/artists/';
	private albumUrl: string = this.baseUrl + '/albums/';
	private auth_token: string = 'Authorization: Bearer BQBCt19in7TMmca1shvzzd_7GkLDpOY-wivjYbJXA32l6-PM0ZyGqd2Nyq_e7ETizysNKKBNOTPF2eJbI-ifXvkOXqUGL-AjEscdXADEHDphFk9BeFRASPhUSh6ec0JmCNnRQIhlvcA';

	private requestHeader = new HttpHeaders()
		.set('Content-Type', 'application/json')
		.append('Authorization', this.auth_token);
	searchArtists(name: string) {
		return this.http.get(this.searchUrl + name + '&type=artist', {
			headers: this.requestHeader
		});
	}
	searchAlbums(id: string) {
		return this.http.get(this.albumsUrl + id + '/albums', {
			headers: this.requestHeader
		});
	}
	searchAlbum(id: string) {
		return this.http.get(this.albumUrl + id, { headers: this.requestHeader });
	}
	constructor(public http: HttpClient) {}
}

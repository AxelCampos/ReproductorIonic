import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SpotifyProvider {
	private baseUrl: string = 'https://api.spotify.com/v1';
	private searchUrl: string = this.baseUrl + '/search?q=';
	private albumsUrl: string = this.baseUrl + '/artists/';
	private albumUrl: string = this.baseUrl + '/albums/';
	private auth_token: string = 'Authorization: Bearer BQAJ-gxvf7W0NoYsZc1Rk5E7eAbqs2tLyJVngSDbnZJPErnkhAD5W2aty3YdWgVh4T_FRL8c5ElW5xV_vB9UpTpS6V8lhOplxDFT6eWSaQJ42IiuTlayL5y4CB27ObzjhYVo16lrGhmF_U0U2_Kmh1lwvKI8X6_hMKDjxKFSjLoUOS4';

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

	searchTopTracks(id: string) {
		return this.http.get(this.albumsUrl + id + '/top-tracks?country=ES', { headers: this.requestHeader });
	}

	constructor(public http: HttpClient) {}
}

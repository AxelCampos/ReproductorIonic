import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SpotifyProvider {
	private baseUrl: string = 'https://api.spotify.com/v1';
	private searchUrl: string = this.baseUrl + '/search?q=';
	private albumsUrl: string = this.baseUrl + '/artists/';
	private albumUrl: string = this.baseUrl + '/albums/';
	private auth_token: string = 'Authorization: Bearer BQCQbpknl0IqOW1Q1O4a8DH40cJXx44hk91h0xYKwTLPVarjScr0mngPKtMBJFEUL7-3HQzHj-tnGZbJwFCuCjR1w9gx8XYEy1nrVYKh5OheWGqXLoHcHuXh9lf1JMwaxnpFL0UScZPs6VcRXQckkqD7CXa349bWrxEwJ3_suA1zCa0';

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

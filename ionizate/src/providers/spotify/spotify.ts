import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SpotifyProvider {
	private baseUrl: string = 'https://api.spotify.com/v1';
	private searchUrl: string = this.baseUrl + '/search?q=';
	private albumsUrl: string = this.baseUrl + '/artists/';
	private albumUrl: string = this.baseUrl + '/albums/';
	private auth_token: string = 'Authorization: Bearer BQBi759G05N_Y-9sEyAzCtreC0C8LAvYgrJcBJf_0Ak8C5IxBWE9NCsRKdX3THVYWLayTb28urW6KBip1evmXtVswFodswT3dz20Ln9CeVBGOY-MmdKNd_-_g3i9ACqCfQjXM22zczN00GMAv7W5ZaNCfpcCFjhOX3THVTuYubgcjis';

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

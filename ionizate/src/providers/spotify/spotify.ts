import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SpotifyProvider {
	private baseUrl: string = 'https://api.spotify.com/v1';
	private searchUrl: string = this.baseUrl + '/search?q=';
	private albumsUrl: string = this.baseUrl + '/artists/';
	private albumUrl: string = this.baseUrl + '/albums/';
	private artistIdUrl : string = this.baseUrl + '/artists?ids=';
	private auth_token: string = 'Authorization: Bearer BQBdvuL0J-drtiKVjBNXeKlbPklVhW-I3Rnwfi8Sl3PniAM2DFpepSIQ4ZVqpT43kV6ZvcH_hxxdvvZAcManV43YMdfBQKw3k9OYh__llBHNmfTm1WmkN7IYblLAA8YVg-f67vdsQg6kXlksBjrbLEzch94d_4Iu0isE4SMdN8_SOq0';

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

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {renderComponent} from '@angular/core/src/render3';

@Injectable()
export class NodeServerProvider {
  private baseUrl: string = 'http://localhost:8081/';

  constructor(public http: HttpClient) {
  }

  private requestHeader = new HttpHeaders().set('Content-Type', 'application/json');

  checkName(name: string) {
    let data = {
      name: name
    };
    return this.http.post(this.baseUrl + 'checkname', data, {
      headers: this.requestHeader
    });
  }

  getFollowings() {
    return this.http.post(this.baseUrl + 'following', {headers: this.requestHeader});
  }

  searchLatest() {
    return this.http.post(this.baseUrl + 'latest', {
      headers: this.requestHeader
    });
  }

  setLatestJson(item: any) {
    this.searchLatest().subscribe(
      (data: any) => {
        var recently: any[] = data;
        var valid = true;
        if (recently.length == 10) {
          recently.forEach((x) => {
            if (x.id == item.id) {
              valid = false;
            }
          });
          if (valid) {
            this.http.delete(this.baseUrl + 'delete-item', {headers: this.requestHeader}).subscribe();
          }
        } else {
          recently.forEach((x) => {
            if (x.id == item.id) {
              valid = false;
            }
          });
        }
        if (valid) {
          this.http
            .post(this.baseUrl + 'push-item', item, {
              headers: this.requestHeader
            })
            .subscribe();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  setFollow(id: string) {
    this.http.post(this.baseUrl + 'follow-artist', {id}, {headers: this.requestHeader}).subscribe();
  }

  deleteItem(id: string) {
    console.log(id);
    this.searchLatest().subscribe(
      (data: any) => {
        var recently: any[] = data;
        recently = recently.filter(i=>{return i.id !== id});
        this.http.put(this.baseUrl+'remove-item', recently, {headers:this.requestHeader}).subscribe();
      },
      error => {
        console.log(error);
      }
    );
  };
}

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class NodeServerProvider {
  private baseUrl: string = "http://localhost:8080/";
  constructor(public http: HttpClient) {}

  private requestHeader = new HttpHeaders().set(
    "Content-Type",
    "application/json"
  );
  checkName(name: string) {
    let data = {
      name: name
    };
    return this.http.post(this.baseUrl + "checkname", data, {
      headers: this.requestHeader
    });
  }
  searchLatest() {
    return this.http.post(this.baseUrl + "latest", {
      headers: this.requestHeader
    });
  }
  setLatestJson(item: any) {
    console.log(item);

    this.http
      .put(this.baseUrl + "push-item", item, {
        headers: this.requestHeader
      })
      .subscribe();
  }
}

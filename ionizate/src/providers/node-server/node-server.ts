import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import firebase from "firebase";

@Injectable()
export class NodeServerProvider {
  private baseUrl: string = 'http://localhost:8081/';

  constructor(public http: HttpClient) {
  }

  private requestHeader = new HttpHeaders().set('Content-Type', 'application/json');


  getFollowings() {
    let list = [];
    return firebase.firestore().collection('artista_seguido').get().then(data => {
      data.docs.forEach(doc => {
        list.push(doc.data());
      });
      return list;
    });
  }

  getAlbumsSaved() {
    let list = [];
    return firebase.firestore().collection('albumes_guardados').get().then(data => {
      data.docs.forEach(doc => {
        list.push(doc.data());
      });
      return list;
    });
  }

  searchLatest() {
    let list = [];
    return firebase.firestore().collection('busqueda_artistas').get().then(data => {
      data.docs.forEach(doc => {
        list.push(doc.data());
      });
      return list;
    });

  }

  setLatestJson(item: any) {
    let idDB : string;
    var valid = true;
    firebase.firestore().collection('busqueda_artistas').get().then(data => {
      if (data.docs.length == 10){
        data.docs.forEach(doc => {
          if (doc.data().id == item.id)
            valid = false;
        });
        if(valid){
          idDB =data.docs.pop().id;
          firebase.firestore().collection("busqueda_artistas").doc(idDB).delete().then(function() {
            console.log("Document successfully deleted!");
          }).catch(function(error) {
            console.error("Error removing document: ", error);
          });
        }
      }else{
        data.docs.forEach(doc => {
          if (doc.data().id == item.id)
            valid = false;
        });
      }
      if(valid){
        firebase.firestore().collection("busqueda_artistas").add({
          external_urls: item.external_urls,
          followers: item.followers,
          genres: item.genres,
          href: item.href,
          id: item.id,
          images: item.images,
          name: item.name,
          popularity: item.popularity,
          type: item.type,
          uri: item.uri
        })
          .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });
      }
    });
  }

  setFollow(id: string, name: string) {
    firebase.firestore().collection("artista_seguido").add({
      id: id,
      name: name
    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  save(id: string, name: string) {
    firebase.firestore().collection("albumes_guardados").add({
      id: id,
      name: name
    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  deleteItem(id: string) {
    let idDB : string;
      firebase.firestore().collection('busqueda_artistas').get().then(data => {
      data.docs.forEach(doc => {
        if (doc.data().id == id)
          idDB = doc.id;

      });
        firebase.firestore().collection("busqueda_artistas").doc(idDB).delete().then(function() {
          console.log("Document successfully deleted!");
        }).catch(function(error) {
          console.error("Error removing document: ", error);
        });
    });
  }
}

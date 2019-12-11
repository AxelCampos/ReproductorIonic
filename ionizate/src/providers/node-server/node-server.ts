import {Injectable} from '@angular/core';
import firebase from "firebase";

@Injectable()
export class NodeServerProvider {

  constructor() {
  }


  getFollowings() {
    let list = [];
    return firebase.firestore().collection('artista_seguido').get().then(data => {
      data.docs.forEach(doc => {
        list.push(doc.data());
      });
      return list;
    });
  }

  getSongs() {
    let list = [];
    return firebase.firestore().collection('songs').get().then(data => {
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

  getPlaylist() {
    let list = [];
    return firebase.firestore().collection('playlist').get().then(data => {
      data.docs.forEach(doc => {
        list.push(doc.id);
      });
      return list;
    })

  }

  getTracksOfPlaylist(name: string) {
    let list = [];
    return firebase.firestore().collection('playlist').doc(name).get().then(data => {
      for (let i = 1; i <= Object.keys(data.data()).length; i++) {
        list.push(data.data()['song'+i]);
      }
      return list;
    });

  }

  setLatestJson(item: any) {
    let idDB: string;
    var valid = true;
    firebase.firestore().collection('busqueda_artistas').get().then(data => {
      if (data.docs.length == 10) {
        data.docs.forEach(doc => {
          if (doc.data().id == item.id)
            valid = false;
        });
        if (valid) {
          idDB = data.docs.pop().id;
          firebase.firestore().collection("busqueda_artistas").doc(idDB).delete().then(function () {
            console.log("Document successfully deleted!");
          }).catch(function (error) {
            console.error("Error removing document: ", error);
          });
        }
      } else {
        data.docs.forEach(doc => {
          if (doc.data().id == item.id)
            valid = false;
        });
      }
      if (valid) {
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

  setSong(item) {
    firebase.firestore().collection('songs').add({
      item
    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  setPlaylist(id: string, item: any) {
    console.log(item);
    let list;
    firebase.firestore().collection('playlist').doc(id).get().then(data => {
      list = data.data();
      if (list == undefined) {
        list = {};
        list['song1'] = item;
      } else {
        let song = 'song' + (Object.keys(list).length + 1);
        list[song] = item;
      }
      firebase.firestore().collection("playlist").doc(id).set(list).then(function () {
        console.log("Document successfully written!");
      });
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
    let idDB: string;
    firebase.firestore().collection('busqueda_artistas').get().then(data => {
      data.docs.forEach(doc => {
        if (doc.data().id == id)
          idDB = doc.id;

      });
      firebase.firestore().collection("busqueda_artistas").doc(idDB).delete().then(function () {
        console.log("Document successfully deleted!");
      }).catch(function (error) {
        console.error("Error removing document: ", error);
      });
    });
  }

  deleteFollows(id: string) {
    let idDB: string;
    firebase.firestore().collection('artista_seguido').get().then(data => {
      data.docs.forEach(doc => {
        if (doc.data().id == id)
          idDB = doc.id;

      });
      firebase.firestore().collection("artista_seguido").doc(idDB).delete().then(function () {
        console.log("Document successfully deleted!");
      }).catch(function (error) {
        console.error("Error removing document: ", error);
      });
    });
  }

  deleteSavedAlbum(id: string) {
    let idDB: string;
    firebase.firestore().collection('albumes_guardados').get().then(data => {
      data.docs.forEach(doc => {
        if (doc.data().id == id)
          idDB = doc.id;

      });
      firebase.firestore().collection("albumes_guardados").doc(idDB).delete().then(function () {
        console.log("Document successfully deleted!");
      }).catch(function (error) {
        console.error("Error removing document: ", error);
      });
    });
  }

  deleteSong(url: string) {
    let idDB: string;
    firebase.firestore().collection('songs').get().then(data => {
      data.docs.forEach(doc => {
        if (doc.data().item.url == url) {
          idDB = doc.id;
        }
      });
      firebase.firestore().collection("songs").doc(idDB).delete().then(function () {
        console.log("Document successfully deleted!");
      }).catch(function (error) {
        console.error("Error removing document: ", error);
      });
    });
  }

  savePlaylist(name: string) {
    firebase.firestore().collection("playlist").doc(name).set({}).then(function () {
      console.log("Document successfully written!");
    });
  }
}

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import firebase from "firebase";

import { AppModule } from './app.module';


const firebaseConfig = {
  apiKey: "AIzaSyDTK3askkm5UdRz37sqzEokCbV5olV3uFU",
  authDomain: "ionizate-2eb85.firebaseapp.com",
  databaseURL: "https://ionizate-2eb85.firebaseio.com",
  projectId: "ionizate-2eb85",
  storageBucket: "ionizate-2eb85.appspot.com",
  messagingSenderId: "668721650407",
  appId: "1:668721650407:web:b3a1f5c6df78c385f26042",
  measurementId: "G-ZPYR5P80N5"
};

firebase.initializeApp(firebaseConfig);

platformBrowserDynamic().bootstrapModule(AppModule);

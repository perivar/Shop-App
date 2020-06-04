import firebase from 'firebase'; // 4.8.1

class Fire {
  constructor() {
    this.init();
  }

  init = () =>
    firebase.initializeApp({
        apiKey: "AIzaSyCngPfFt7-u-cmGhsj86-rB-OP9inA411k",
        authDomain: "rental-app-743c0.firebaseapp.com",
        databaseURL: "https://rental-app-743c0.firebaseio.com",
        projectId: "rental-app-743c0",
        storageBucket: "rental-app-743c0.appspot.com",
        messagingSenderId: "180411019322",
        appId: "1:180411019322:web:2771c8901e15b9717ac503",
        measurementId: "G-R4WDX7DJPS"
    });

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    return firebase.database().ref('messages');
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };

  append = message => this.ref.push(message);

  // close the connection to the Backend
  off() {
    this.ref.off();
  }
}

Fire.shared = new Fire();
export default Fire;

import { IonPage, IonHeader, IonImg, IonContent, IonToolbar, IonTitle, IonAlert, IonIcon, IonAvatar, IonInput, IonButton, IonItem } from "@ionic/react";
import React, { Component } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import logo from './../assets/img/logo.svg'
import "../assets/js/app.js";
import { enter, enterGabe, hitzaEgiaztatu, idatzi, karakBorratu, loadGame, notChatting, sethiztegiHitza, zapaldua, zapalduGabe } from "../assets/js/app.js";
import "./Home.css";
import { backspaceOutline } from "ionicons/icons";

const client = new W3CWebSocket("ws://127.0.0.1:8000");

class Client extends Component {
  username = "";
  text = "";
  jasotakoa = "";
  clientID = "";
  chat = "";
  elementua = document.createElement("div");
  dataFromServer = { data: "", type: "", subtype: "" };
  state = {asmatu: false};
  keyCharToCode: { [key: string]: number } = {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    "PAUSE/BREAK": 19,
    "CAPS LOCK": 20,
    ESC: 27,
    SPACE: 32,
    "PAGE UP": 33,
    "PAGE DOWN": 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    INSERT: 45,
    DELETE: 46,
    "'0'": 48,
    "'1'": 49,
    "'2'": 50,
    "'3'": 51,
    "'4'": 52,
    "'5'": 53,
    "'6'": 54,
    "'7'": 55,
    "'8'": 56,
    "'9'": 57,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    WINDOWS: 91,
    "RIGHT CLICK": 93,
    "NUMPAD 0": 96,
    "NUMPAD 1": 97,
    "NUMPAD 2": 98,
    "NUMPAD 3": 99,
    "NUMPAD 4": 100,
    "NUMPAD 5": 101,
    "NUMPAD 6": 102,
    "NUMPAD 7": 103,
    "NUMPAD 8": 104,
    "NUMPAD 9": 105,
    "NUMPAD *": 106,
    "NUMPAD +": 107,
    "NUMPAD -": 109,
    "NUMPAD .": 110,
    "NUMPAD /": 111,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    "NUM LOCK": 144,
    "SCROLL LOCK": 145,
    "MY COMPUTER": 182,
    "MY CALCULATOR": 183,
    ";": 186,
    "=": 187,
    ",": 188,
    "-": 189,
    ".": 190,
    "/": 191,
    "`": 192,
    "[": 219,
    "\\": 220,
    "]": 221,
    "'": 222,
  };

  constructor(props: any) {
    super(props);
    this.elementua.setAttribute("id", "0");
  }

  logInUser = () => {

    var username = this.username;

    if (username.trim()) {
      const data = {
        username
      };
      this.setState({
        ...data
      }, () => {
        client.send(JSON.stringify({
          ...data,
          type: "userevent",
          username: this.username,
          id: this.clientID,
        }));
      });
    }
  };

  sendChat = () => {
    
    notChatting();

    client.send(
      JSON.stringify({
        type: "chat",
        username: this.username,
        content: this.chat,
        id: this.clientID,
      })
    );    
  };

  /* When content changes, we send the
  current content of the editor to the server. */
  onStateChange = (text: any) => {
    console.log("Zerbitzarira bidalitako textua: " + text);
    zapalduGabe();
    enterGabe();
    client.send(
      JSON.stringify({
        type: "contentchange",
        username: this.username,
        content: text,
        id: this.clientID,
      })
    );
  };

  componentWillMount() {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };

    client.onmessage = (message) => {

      this.dataFromServer = JSON.parse(message.data.toString());
      
      if (JSON.parse(message.data.toString()).type === "initial") {

        this.clientID = JSON.parse(message.data.toString()).id;
        sethiztegiHitza(JSON.parse(message.data.toString()).word);

      } else if (this.dataFromServer.type === "contentchange") {

        this.dataFromServer = JSON.parse(message.data.toString());
        this.jasotakoa = this.dataFromServer.data.toUpperCase();
        console.log("Zerbitzaritik jasotakoa: " + this.jasotakoa);
        if (this.jasotakoa === "") karakBorratu();
        if (this.jasotakoa === "ENTER") hitzaEgiaztatu();
        //JS-ko idatzi funtzioa
        idatzi(this.dataFromServer.data, this.keyCharToCode[this.jasotakoa]);

      } else if (this.dataFromServer.type === "userevent") {

        if (this.dataFromServer.subtype === "joined") {

          if(JSON.parse(message.data.toString()).username === this.username) {

            loadGame();

            //Prepare observer
            const ikuskatzeko = window.document.getElementById("game")!;
            //Create observer
            const observer = new MutationObserver((mutationList, observer) => {
              console.log(
                "Detektatutako mutazioa: " + mutationList[0].target.textContent
              );
              this.elementua = mutationList[0].target as HTMLDivElement;
              console.log("Gelaxkaren ID: " + this.elementua.id);
              if (zapaldua) this.onStateChange(mutationList[0].target.textContent);
              if (enter) this.onStateChange("ENTER");
            });
            //Call observer
            observer.observe(ikuskatzeko, {
              characterData: true,
              childList: true,
              attributes: true,
              subtree: true,
            });
          }
          console.log(JSON.parse(message.data.toString()).username + " has joined");
          var actual = document.getElementById("mezuak")!.innerHTML;
          actual = actual + "<br><i><b>" + JSON.parse(message.data.toString()).username + "</b></i> has joined the game.";
          if(this.username !== "") document.getElementById("mezuak")!.innerHTML = actual;

        } else if (this.dataFromServer.subtype === "left") {

          console.log(JSON.parse(message.data.toString()).username + " has left");
          var actual = document.getElementById("mezuak")!.innerHTML;
          actual = actual + "<br><i><b>" + JSON.parse(message.data.toString()).username + "</b></i> has left the game.";
          if(this.username !== "") document.getElementById("mezuak")!.innerHTML = actual;
        }
      } else if(this.dataFromServer.type === "chat"){
        console.log("New chat from: " + JSON.parse(message.data.toString()).username);
        var actual = document.getElementById("mezuak")!.innerHTML;
        if (JSON.parse(message.data.toString()).username !== this.username) actual = actual + "<br><b>" + JSON.parse(message.data.toString()).username + ": </b>" + JSON.parse(message.data.toString()).data;
        if (JSON.parse(message.data.toString()).username === this.username) actual = actual + "<br><b>You: </b>" + JSON.parse(message.data.toString()).data;
        if (this.username !== "") document.getElementById("mezuak")!.innerHTML = actual;
      }
    };
  }

  showLoginSection = () => (
    <div className="account">
      <div className="account__wrapper">
        <div className="account__card">
          <div className="account__profile">
            <IonAvatar className="account__avatar">
              <img src={`https://ui-avatars.com/api/?background=random&name=${"?"}`} />
            </IonAvatar>
            <p className="account__name">Hello, user!</p>
            <p className="account__sub">Join to play Wordle Collaborative</p>
          </div>
          <IonInput
            name="username"
            type="text"
            placeholder="Enter username"
            onIonChange={(e) => this.username = (e.target as HTMLInputElement).value}
            required className="form-control" ></IonInput>
          <button type="button" onClick={() => this.logInUser()} className="btn btn-primary account__btn">Join</button>
        </div>
      </div>
    </div>
  );

  showEditorSection = () => (
    <IonPage>
      <IonHeader>
        <IonImg class="logo" src={logo}/>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="game" id="game">
          <div className="row">
            <div className="gelaxka" id="1"></div>
            <div className="gelaxka" id="2"></div>
            <div className="gelaxka" id="3"></div>
            <div className="gelaxka" id="4"></div>
            <div className="gelaxka" id="5"></div>
          </div>
          <div className="row">
            <div className="gelaxka" id="6"></div>
            <div className="gelaxka" id="7"></div>
            <div className="gelaxka" id="8"></div>
            <div className="gelaxka" id="9"></div>
            <div className="gelaxka" id="10"></div>
          </div>
          <div className="row">
            <div className="gelaxka" id="11"></div>
            <div className="gelaxka" id="12"></div>
            <div className="gelaxka" id="13"></div>
            <div className="gelaxka" id="14"></div>
            <div className="gelaxka" id="15"></div>
          </div>
          <div className="row">
            <div className="gelaxka" id="16"></div>
            <div className="gelaxka" id="17"></div>
            <div className="gelaxka" id="18"></div>
            <div className="gelaxka" id="19"></div>
            <div className="gelaxka" id="20"></div>
          </div>
          <div className="row">
            <div className="gelaxka" id="21"></div>
            <div className="gelaxka" id="22"></div>
            <div className="gelaxka" id="23"></div>
            <div className="gelaxka" id="24"></div>
            <div className="gelaxka" id="25"></div>
          </div>
          <div className="row">
            <div className="gelaxka" id="26"></div>
            <div className="gelaxka" id="27"></div>
            <div className="gelaxka" id="28"></div>
            <div className="gelaxka" id="29"></div>
            <div className="gelaxka" id="30"></div>
          </div>
        </div>
        <IonAlert
          isOpen={this.state.asmatu}
          onDidDismiss={() => this.setState(false)} //Kontuz
          header={'Alert'}
          subHeader={'Subtitle'}
          message={'This is an alert message.'}
          buttons={['OK']}
        />
        <div id="mezua"></div>
        <div className='teklatua'>
          <div className='teklatuaRow'>
            <div id='q' className='teklatuaBotoi' onClick={() => idatzi('q',81)}>q</div>
            <div id='w' className='teklatuaBotoi' onClick={() => idatzi('w',87)}>w</div>
            <div id='e' className='teklatuaBotoi' onClick={() => idatzi('e',69)}>e</div>
            <div id='r' className='teklatuaBotoi' onClick={() => idatzi('r',82)}>r</div>
            <div id='t' className='teklatuaBotoi' onClick={() => idatzi('t',84)}>t</div>
            <div id='y' className='teklatuaBotoi' onClick={() => idatzi('y',89)}>y</div>
            <div id='u' className='teklatuaBotoi' onClick={() => idatzi('u',85)}>u</div>
            <div id='i' className='teklatuaBotoi' onClick={() => idatzi('i',73)}>i</div>
            <div id='o' className='teklatuaBotoi' onClick={() => idatzi('o',79)}>o</div>
            <div id='p' className='teklatuaBotoi' onClick={() => idatzi('p',80)}>p</div>
          </div>
          <div className='teklatuaRow'>
            <div id='a' className='teklatuaBotoi' onClick={() => idatzi('a',65)}>a</div>
            <div id='s' className='teklatuaBotoi' onClick={() => idatzi('s',83)}>s</div>
            <div id='d' className='teklatuaBotoi' onClick={() => idatzi('d',68)}>d</div>
            <div id='f' className='teklatuaBotoi' onClick={() => idatzi('f',70)}>f</div>
            <div id='g' className='teklatuaBotoi' onClick={() => idatzi('g',71)}>g</div>
            <div id='h' className='teklatuaBotoi' onClick={() => idatzi('h',72)}>h</div>
            <div id='j' className='teklatuaBotoi' onClick={() => idatzi('j',74)}>j</div>
            <div id='k' className='teklatuaBotoi' onClick={() => idatzi('k',75)}>k</div>
            <div id='l' className='teklatuaBotoi' onClick={() => idatzi('l',76)}>l</div>
            <div id='ñ' className='teklatuaBotoi' onClick={() => idatzi('ñ',192)}>ñ</div>
          </div>
          <div className='teklatuaRow'>
            <div className='teklatuaBotoi' onClick={() => karakBorratu()}><IonIcon icon={backspaceOutline} className='borratuBotoia'></IonIcon></div>
            <div id='z' className='teklatuaBotoi' onClick={() => idatzi('z',90)}>z</div>
            <div id='x' className='teklatuaBotoi' onClick={() => idatzi('x',88)}>x</div>
            <div id='c' className='teklatuaBotoi' onClick={() => idatzi('c',67)}>c</div>
            <div id='v' className='teklatuaBotoi' onClick={() => idatzi('v',86)}>v</div>
            <div id='b' className='teklatuaBotoi' onClick={() => idatzi('b',66)}>b</div>
            <div id='n' className='teklatuaBotoi' onClick={() => idatzi('n',78)}>n</div>
            <div id='m' className='teklatuaBotoi' onClick={() => idatzi('m',77)}>m</div>
            <div className='teklatuaBotoi' onClick={() => hitzaEgiaztatu()}>Enter</div>
          </div>
        </div>
        <div className='chat'>
          <div id='mezuak'></div>
          <IonItem>
            <IonAvatar>
              <img src={`https://ui-avatars.com/api/?background=random&name=${this.username}`} />
            </IonAvatar>
            <IonInput
              name="chattext"
              id="chattext"
              type="text"
              placeholder="Press SPACE to start chatting"
              onIonChange={(e) => this.chat = (e.target as HTMLInputElement).value}
              className="form-control"></IonInput>
            <IonButton onClick={() => this.sendChat()}>SEND</IonButton>
          </IonItem>
          

        </div>
          
        </IonContent>
    </IonPage>
  );

  render() {
    const username = this.username;
    return (
      <React.Fragment>
        <div className="container-fluid">
          {username ? this.showEditorSection() : this.showLoginSection()}
        </div>
      </React.Fragment>
    );
  }
}

export default Client;

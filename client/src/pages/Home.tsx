import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonButton, IonIcon, IonAlert, IonTextarea, IonItem } from '@ionic/react';
import './Home.css';
import logo from './../assets/img/logo.svg';
import '../assets/js/app.js';
import {idatzi, karakBorratu, hitzaEgiaztatu} from '../assets/js/app.js';
import { useState } from 'react';
import { backspaceOutline } from 'ionicons/icons';

const Home: React.FC = () => {
  const [asmatu, setAsmatu] = useState(false);
  const [mezua, idatziMezua] = useState<string>();
  return (
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
        <div className='game'>
          <div className='row'>
            <div className='gelaxka' id='1'></div>
            <div className='gelaxka' id='2'></div>
            <div className='gelaxka' id='3'></div>
            <div className='gelaxka' id='4'></div>
            <div className='gelaxka' id='5'></div>
          </div>
          <div className='row'>
            <div className='gelaxka'></div>
            <div className='gelaxka'></div>
            <div className='gelaxka'></div>
            <div className='gelaxka'></div>
            <div className='gelaxka'></div>
          </div>
          <div className='row'>
            <div className='gelaxka'></div>
            <div className='gelaxka'></div>
            <div className='gelaxka'></div>
            <div className='gelaxka'></div>
            <div className='gelaxka'></div>
          </div>
          <div className='row'>
            <div className='gelaxka'></div>
            <div className='gelaxka'></div>
            <div className='gelaxka'></div>
            <div className='gelaxka'></div>
            <div className='gelaxka'></div>
          </div>
          <div className='row'>
            <div className='gelaxka'></div>
            <div className='gelaxka'></div>
            <div className='gelaxka'></div>
            <div className='gelaxka'></div>
            <div className='gelaxka'></div>
          </div>
          <div className='row'>
            <div className='gelaxka'></div>
            <div className='gelaxka'></div>
            <div className='gelaxka'></div>
            <div className='gelaxka'></div>
            <div className='gelaxka'></div>
          </div>
        </div> 
        <IonAlert

          isOpen={asmatu}
          onDidDismiss={() => setAsmatu(false)}
          header={'Alert'}
          subHeader={'Subtitle'}
          message={'This is an alert message.'}
          buttons={['OK']}

        />
        <IonButton href='client'></IonButton>
        <div id='mezua'></div>
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
          <div className='mezuak'></div>
          <IonItem>
            <IonTextarea id='testuKutxa' placeholder="Mezua idatzi..." cols={1} value={mezua} onIonChange={e => idatziMezua(e.detail.value!)}></IonTextarea>
          </IonItem>
          <IonButton href='client'>Bidali</IonButton>
          

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
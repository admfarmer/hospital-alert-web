import { Component, OnInit, ViewChild, NgZone, Inject, OnDestroy, Directive, HostListener } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { AlertService } from 'src/app/shared/alert.service';
import { SweetAlertService } from 'src/app/shared/sweetalert.service';
import * as moment from 'moment';
import * as mqttClient from '../../vendor/mqtt';
import { MqttClient } from 'mqtt';
import * as _ from 'lodash';
import * as Random from 'random-js';
import { Howl, Howler } from 'howler';

import { CountdownComponent } from 'ngx-countdown';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @ViewChild(CountdownComponent) counter: CountdownComponent;

  items_stop: any = [];
  items_start: any = [];
  info: any = {};
  edit: boolean = false;

  client: MqttClient;
  notifyUser = null;
  notifyPassword = null;

  isOffline = false;

  isSound = true;
  isPlayingSound = false;

  playlists: any = [];
  notifyUrl: string;

  id: any;
  hos_name: any;
  amphur: any;
  province: any;
  create_date: any;
  create_time: any;
  message: any;
  ans_date: any;
  ans_time: any;
  amp_name: any;
  prov_name: any;

  constructor(
    private alertService: AlertService,
    private sweetAlertService: SweetAlertService,
    private zone: NgZone,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    this.notifyUrl = `ws://203.113.117.66:8080`;
    this.notifyUser = `q4u`;
    this.notifyPassword = `##q4u##`;

    this.alertStop();
    // this.alertStart();
    this.initialSocket();

  }


  public unsafePublish(topic: string, message: string): void {
    try {
      this.client.end(true);
    } catch (error) {
      console.log(error);
    }
  }

  public ngOnDestroy() {
    try {
      this.client.end(true);
    } catch (error) {
      console.log(error);
    }
  }

  onFinished() {
    console.log('Time finished!');
    this.connectWebSocket();
  }

  onNotify($event) {
    console.log('Finished');
  }

  toggleSound() {
    this.isSound = !this.isSound;
  }

  openEdit(items_start: any) {
    console.log(items_start);
    let x: any = items_start;
    this.id = x.id;
    this.hos_name = x.hos_name;
    this.amphur = x.amphur;
    this.province = x.province;
    this.create_date = x.create_date;
    this.create_time = x.create_time;
    this.message = x.message;
    this.ans_date = x.ans_date;
    this.ans_time = x.ans_time;
    this.amp_name = x.amp_name;
    this.prov_name = x.prov_name;

    this.edit = true;

  }
  async Save() {
    // this.edit = false;
    let alertId = this.id;
    this.info = {
      hos_name: this.hos_name,
      amphur: this.amphur,
      province: this.province,
      create_date: moment(this.create_date).format('YYYY-MM-DD'),
      create_time: this.create_time,
      message: this.message,
      ans_date: moment(Date()).format('YYYY-MM-DD'),
      ans_time: moment(Date()).format('HH:mm:ss'),
      status_flg: 'N'
    }
    // console.log(alertId, '::', datas);
    try {
      var rs: any;
      rs = await this.alertService.update(alertId, this.info);
      console.log(rs);

      if (rs.info > 0) {
        this.alertStart();
        this.alertStop();
        this.Cancel()
        // this.edit = false;

      } else {
        this.sweetAlertService.error(rs.message);
      }
    } catch (error) {
      console.log(error);
      // this.sweetAlertService.error('เกิดข้อผิดพลาด');
    }

  }
  Cancel() {
    this.id = null;
    this.hos_name = null;
    this.amphur = null;
    this.province = null;
    this.create_date = null;
    this.create_time = null;
    this.message = null;
    this.ans_date = null;
    this.ans_time = null;
    this.amp_name = null;
    this.prov_name = null;
    this.edit = false;
  }
  async alertStart() {
    try {
      const rs: any = await this.alertService.alertStart();
      if (rs.info.length > 0) {
        this.items_start = rs.info;
        console.log(this.items_start);
      } else {
        this.sweetAlertService.error('เกิดข้อผิดพลาด');
      }
    } catch (error) {
      console.log(error);
      this.sweetAlertService.error();
    }
  }

  async alertStop() {
    try {
      const rs: any = await this.alertService.alertStop();
      // console.log(rs.info);
      if (rs.info.length > 0) {
        this.items_stop = rs.info;
        console.log(this.items_stop);
      } else {
        this.sweetAlertService.error('เกิดข้อผิดพลาด');
      }
    } catch (error) {
      console.log(error);
      this.sweetAlertService.error();
    }
  }


  connectWebSocket() {

    try {
      this.client.end(true);
    } catch (error) {

    }
    // const rnd = new Random();
    // const username = sessionStorage.getItem('username');
    // const strRnd = rnd.integer(1111111111, 9999999999);
    const clientId = `Alert-center`;
    console.log('***!!!***');

    try {
      this.client = mqttClient.connect(this.notifyUrl, {
        clientId: clientId,
        username: this.notifyUser,
        password: this.notifyPassword
      });
    } catch (error) {
      console.log(error);
    }

    const topic = `alert/center`;

    const that = this;

    this.client.on('message', (topic, payload) => {
      that.alertStart();
      that.playSound()
    });

    this.client.on('connect', () => {
      console.log('Connected!');
      that.zone.run(() => {
        that.isOffline = false;
      });

      that.client.subscribe(topic, (error) => {
        if (error) {
          that.zone.run(() => {
            that.isOffline = true;
            try {
              that.counter.restart();
            } catch (error) {
              console.log(error);
            }
          });
        }
      });
    });

    this.client.on('close', () => {
      console.log('MQTT Conection Close');
    });

    this.client.on('error', (error) => {
      console.log('MQTT Error');
      that.zone.run(() => {
        that.isOffline = true;
        that.counter.restart();
      });
    });

    this.client.on('offline', () => {
      console.log('MQTT Offline');
      that.zone.run(() => {
        that.isOffline = true;
        try {
          that.counter.restart();
        } catch (error) {
          console.log(error);
        }
      });
    });
  }

  initialSocket() {
    // connect mqtt
    this.connectWebSocket();
    this.alertStart();
  }

  playSound() {
    // console.log(this.servicePointSpeak);
    this.isPlayingSound = true;

    const audioFiles = [];
    audioFiles.push('./assets/audio/police.mp3');
    // audioFiles.push('./assets/audio/ka.mp3');

    const howlerBank = [];

    const loop = false;

    const onPlay = [false];
    let pCount = 0;
    const that = this;

    const onEnd = function (e) {

      if (loop) {
        pCount = (pCount + 1 !== howlerBank.length) ? pCount + 1 : 0;
      } else {
        pCount = pCount + 1;
      }

      if (pCount <= audioFiles.length - 1) {

        if (!howlerBank[pCount].playing()) {
          howlerBank[pCount].play();
        } else {
          howlerBank[pCount].stop();
          howlerBank[pCount].unload();
          howlerBank[pCount].play();
        }
      }
      // else {
      //   this.isPlayingSound = false;
      //   // remove queue in playlist
      //   const idx = _.findIndex(that.playlists, { queueNumber: strQueue, roomNumber: strRoomNumber });
      //   if (idx > -1) {
      //     that.playlists.splice(idx, 1);
      //   }
      //   // call sound again
      //   // setTimeout(() => {
      //   //   that.isPlayingSound = false;
      //   //   that.prepareSound();
      //   // }, 1000);
      // }
    };

    for (let i = 0; i < audioFiles.length; i++) {
      howlerBank.push(new Howl({
        src: [audioFiles[i]],
        onend: onEnd,
        preload: true,
        html5: true,
      }));
      // if (this.soundSpeed) {
      //   howlerBank[i].rate(this.soundSpeed);
      // }
    }

    try {
      howlerBank[0].play();
    } catch (error) {
      console.log(error);
    }
  }


}

import { ToastController } from "ionic-angular";
import { Injectable } from '@angular/core';

@Injectable()
export class UtilityService {

  constructor(
    private toastCtrl: ToastController
  ) { }

  presentToast(msg: string, duration: number) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: duration,
      position: 'bottom'
    });
    toast.present();
  }
}

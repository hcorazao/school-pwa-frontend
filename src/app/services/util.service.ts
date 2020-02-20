import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  isLoading = false;
  _loading;

  private subject = new Subject<any>();

  private keepAfterRouteChange = false;
  presentLoading() {
    throw new Error("Method not implemented.");
  }

  constructor(
    public toastCtrl: ToastController,
    public loadingController: LoadingController,
    public alertCtrl:AlertController

  ) {
  }

  /**
   * Show toast and display the message
   * @param message 
   */
  async showToast(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 4000,
      position: 'top',
      mode: 'md',
    });
    toast.present();
  }

  /**
   * Show toast and display the  error message
   * @param message 
   */
  async showErrorToast(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 4000,
      color: 'danger',
      position: 'bottom',
      mode: 'md',
    });
    toast.present();
  }
  async showLoading() {
    this._loading = await this.loadingController.create({
      message: 'Loading....',
      duration: 3000
    });
    await this._loading.present();
    const { role, data } = await this._loading.onDidDismiss();
  }
  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
      mode: 'md',
      color: 'success'
    });
    toast.present();
  }
  async dismissLoading() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log(''));
  }

  /*--------API Error Function alert message--------------*/
  async error(message: string, keepAfterNavigationChange = false) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 6000,
      position: 'top',
      cssClass: 'error-toast',
      color: 'danger',
      mode: 'md',
    });
    toast.present();

    this.keepAfterRouteChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', text: message });
  }
  async presentWarningAlert(msg) {
    const alert = await this.alertCtrl.create({
      message: msg,
      buttons: ['OK'],
      cssClass: 'alert-danger'
    });
    await alert.present();
  }
}

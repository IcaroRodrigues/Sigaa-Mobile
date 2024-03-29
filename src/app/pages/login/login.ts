import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastController } from '@ionic/angular';


import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(
    public userData: UserData,
    public router: Router,
    public toastCtrl: ToastController,
  ) { }

  async onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      const response = this.userData.login(this.login.username, this.login.password);

      if (response) {
        this.router.navigateByUrl('/app/tabs/schedule');
      } else {
        const toast = await this.toastCtrl.create({
          header: 'Usuário ou senha incorreta',
          duration: 3000,
          buttons: [{
            text: 'Close',
            role: 'cancel'
          }],
          position: 'top',
          color: 'danger',

        });

        await toast.present();
      }
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}

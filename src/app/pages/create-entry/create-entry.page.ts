import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController , AlertController, MenuController , Platform } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse , HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ApiService } from '../../services/api.service';
import { JournalConstructComponent } from '../../components/journal-construct/journal-construct.component';

@Component({
  selector: 'app-create-entry',
  templateUrl: './create-entry.page.html',
  styleUrls: ['./create-entry.page.scss'],
})
export class CreateEntryPage implements OnInit {

  @ViewChild(JournalConstructComponent,null)journal: JournalConstructComponent;
  showError=false;

  constructor(private router: Router,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public alertCtrl : AlertController,
    public menuCtrl : MenuController,
    public platform : Platform,
    public http : HttpClient,
    public userService : UserService,
    public apiService : ApiService) {
    }

  ngOnInit() {
    this.userService.title = "";
    this.userService.content = "";
    this.userService.journalMode = "Create";
    this.userService.entryImages = [];
  }

  saveEntry(){
    if (this.userService.title == "" || this.userService.content == "" ){
      this.empty();
    }else{
      this.loadingCtrl.create({
        cssClass: 'yellow',
        spinner:'circles'
      }).then((res) => {
        res.present();
        this.apiService.createEntry(this.userService.title,this.userService.content,this.userService.entryImages).subscribe(res => {
          if (res['Success']==true){
            this.showError = false;
            this.userService.selectedIndex = 2;
            this.userService.title = "";
            this.userService.content = "";
            this.userService.entryImages = [];
            this.userService.imagePaths = [];
            this.loadingCtrl.dismiss();
            this.presentAlert();
          }else{
            this.showError = true;
            this.loadingCtrl.dismiss();
            this.presentError();
          }
        });
      })
    }
  }

  cancelEntry(){
    this.router.navigateByUrl('/view-entries');
  }

  ionViewWillEnter(){
    this.userService.showMenubar = true;
    if (this.platform.width()>850) {
      this.userService.showSidebar = true;
    } else {
      this.userService.showSidebar = false;
    }
    this.userService.title = "";
    this.userService.content = "";
    this.userService.journalMode = "Create";
    this.journal.ionViewWillEnter();
    this.loadingCtrl.create({
      cssClass: 'yellow',
      spinner:'circles',
      duration:1500
    }).then((res) => {
      res.present();
    });
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'alert',
      header: 'Success!',
      message: 'Your entry has been created.',
      buttons: ['OK']
    });
    await alert.present();
    const { role, data } = await alert.onDidDismiss();
    this.journal.ionViewWillEnter();
    this.router.navigateByUrl('/view-entries');
  }

  async empty() {
    const alert = await this.alertCtrl.create({
      cssClass: 'alert',
      header: 'Invalid!',
      message: 'Title and content are required.',
      buttons: ['OK']
    });
    await alert.present();
  }


  async presentError() {
    const alert = await this.alertCtrl.create({
      cssClass: 'alert',
      header: 'Error!',
      message: 'Entry creation failed.',
      buttons: ['OK']
    });
    await alert.present();
  }
}

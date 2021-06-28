import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/Services/common.service';
import { FunctionsService } from 'src/app/Services/functions.service';
import { Params_Get_All_Data, UserInfo, Proxy } from 'src/app/Services/proxy.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit, OnDestroy {

  proxyAllData: Subscription;
  loader!: any;
  userName = '';
  password = '';

  constructor(
    public proxy: Proxy,
    public functions: FunctionsService,
    public cmv: CommonService,
    public router: Router,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.proxyAllData.unsubscribe();
  }
  async showLoader(message = 'Please wait...') {
    this.loader = await this.loadingController.create({
      message,
      translucent: true
    });

    await this.loader.present();
  }

  dismissLoader(): void {
    this.loader.dismiss();
  }
  login(): void {
    if ((this.userName !== '') && (this.password !== '')) {

      this.showLoader('Logging In, Please Wait...');

      const paramsAllData = new Params_Get_All_Data();
      paramsAllData.My_UserInfo = new UserInfo();
      paramsAllData.My_UserInfo.UserName = this.userName;
      paramsAllData.My_UserInfo.Password = this.password;
      paramsAllData.My_UserInfo.IsAuthenticated = false;
      paramsAllData.My_UserInfo.OwnerID = 1;
      paramsAllData.My_UserInfo.UserID = 1;
      paramsAllData.My_UserInfo.Ticket = '';

      this.proxyAllData = this.proxy.Get_All_Data(paramsAllData).subscribe(
        result => {
          this.dismissLoader();
          if (result != null) {
            if (result.User.IsAuthenticated === true) {
              this.cmv.Is_Logged_In.next(result.User.IsAuthenticated);
              this.cmv.ticket = result.User.Ticket;
              this.functions.colors = result.MyColors;
              this.functions.data = result;
              this.router.navigate(['/outlets']);
            }
          }
        }
      );
    } else {
      this.cmv.presentNotificationToast('Username and Password are required!', 3000, 'danger', 'top');
    }
  }
}

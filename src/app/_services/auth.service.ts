import { UserService } from './../user/user.service';
import { CognitoService } from './cognito.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstant } from '../app.constant';
import { StorageService } from '../_helpers';
import { AuthenticationDetails } from 'amazon-cognito-identity-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authData: any;
  token: string | string[];
  permission: { role: any; permission: any; };
  constructor(private http: HttpClient, private cognitoService: CognitoService,
    private userService: UserService, private storageService: StorageService) { }

  formHeader(): Observable<HttpHeaders> {
    const that = this;
    return new Observable((observer) => {
      let header = new HttpHeaders();
      if (that.token) {
        header = header.append('Authorization', that.token);
        observer.next(header);
      } else {
        this.cognitoService.getIdToken({
          callback: () => {
          },
          callbackWithParam: (param) => {
            if (!param) {
              this.userService.logout();
            } else {
              that.token = param;
              header = header.append('Authorization', that.token);
              observer.next(header);
            }
          }
        });
      }
    });
  }

  setUserPermission() {
    const that = this;
    return new Observable(observer => {
      return this.formHeader().subscribe((header) => {
        const options = { headers: header };
        const query = '?data=' + encodeURI(JSON.stringify({ timezone: Intl.DateTimeFormat().resolvedOptions().timeZone }));
        this.http.get(AppConstant.AWS_API_ENDPOINT + '/userpermission' + query, options)
          .subscribe((response) => {
            this.authData = response;
            this.savePermission(response);
            observer.next(response);
          }, (err) => {
            if (err.status === 401 || err.status === 403) {
              this.userService.logout();
            }
            observer.error(err);
          });
      }, (err) => {
        observer.error();
      });
    });
  }

  // hasAccess(action) {
  //   const role = (this.permission) ? this.permission.role : this.storageService.get('role');
  //   const privilage = (this.permission) ? this.permission.permission : this.storageService.getPermissions();
  //   if (Number(role) === AppConstant.Role.ADMIN) {
  //     return true;
  //   } else if (Number(role) === AppConstant.Role.Manager && this.storageService.get('allowAccessAsAdmin') && this.storageService.get('allowAccessAsAdmin') === 'true') {
  //     return true;
  //   } else {
  //     const access = privilage.find((d) => d.action === action);
  //     const a = access ? access : '' && true;
  //     return a.grant;
  //   }
  // }

  private savePermission(data) {
    console.log(data);
    // this.appUtil.spinnerDone();
    this.permission = data;
    this.storageService.setRole(data.role);
    this.storageService.set('user', data.cognitoSub);
    // if (data.role === AppConstant.Role.Manager) {
    //   this.storageService.set('team', data.team);
    //   this.storageService.set('isPartner', data.isPartner);
    //   this.storageService.set('allowAccessAsAdmin', data.allowAccessAsAdmin);
    //   this.storageService.setPermissions(data.permission);
    // }
  }

  get userData(): any {
    return this.authData;
  }
}

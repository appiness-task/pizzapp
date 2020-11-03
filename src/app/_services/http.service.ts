import { AppConstant } from './../app.constant';
import { CognitoService } from './cognito.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StartupService } from './startup.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  token: string;
  cache: object;
  dummy: boolean;

  constructor(private cognitoService: CognitoService, private router: Router,
    private http: HttpClient, private startupService: StartupService) { }

  logout() {
    // this.cognitoUtil.getCurrentUser().signOut();
    this.router.navigate(['/login']);
  }

  printIdToken() {
    this.cognitoService.getIdToken({
      callback: () => {
      },
      callbackWithParam: (param) => {
        if (!param) {
          //     console.log('cant get id token');
        } else {
          //   console.log('ID token of user', param);
        }
      }
    });
  }

  getHeader(json, noAuth?: boolean): Observable<HttpHeaders> {
    this.printIdToken();
    const that = this;

    let header = new HttpHeaders();
    if (json) {
      header = header.append('Content-Type', 'application/json');
    }
    return new Observable((observer) => {
      if (noAuth) {
        header = header.append('Authorization', this.startupService.clientId);
        observer.next(header);
      } else if (that.token) {
        header = header.append('Authorization', that.token);
        observer.next(header);
      } else {
        this.cognitoService.getAccessToken({
          callback: () => {
          },
          callbackWithParam: (param) => {
            if (!param) {
              this.logout();
              observer.error();
            } else {
              that.token = param;
              header = header.append('Authorization', param);
              observer.next(header);
            }
          }
        });
      }
    });
  }

  getAuthHeader() {
    return { Authorization: this.token };
  }

  handler(httpResult, observer, cache) {
    httpResult
      .subscribe((response) => {
        // this.spinner.spinnerDone();
        observer.next(response);
      }, (err) => {
        if (err.status === 401) {
          this.tryRefreshToken(observer, cache);
        } else {
          // this.spinner.spinnerDone();
          observer.error(err);
        }
      });
  }

  tryRefreshToken(observer, cache) {
    const that = this;
    // that.spinner.spinnerInit();
    this.cognitoService.refresh((err) => {
      if (err) {
        // that.spinner.spinnerDone();
        observer.error(err);
        that.logout();
      } else {
        that.token = null;
        const json = (cache.method === 'post' || cache.method === 'put');
        that.getHeader(json).subscribe((header) => {
          const options = { headers: header };
          const http = (json) ? that.http[cache.method](cache.url, cache.data, options) :
            that.http[cache.method](cache.url, options);
          http.subscribe((data) => {
            // that.spinner.spinnerDone();
            observer.next(data);
          }, (error) => {
            // that.spinner.spinnerDone();
            observer.error(error);
            that.logout();
          });
        });
      }
    });
  }

  cacheRequest(method, url, data?) {
    return { method, url, data };
  }

  post(url, data, noAuth?: boolean): Observable<any> {
    return new Observable((observer) => {
      this.getHeader(true, noAuth).subscribe((header) => {
        const options = { headers: header };
        const cache = this.cacheRequest('post', AppConstant.AWS_API_ENDPOINT + url, data);
        this.handler(this.http.post(AppConstant.AWS_API_ENDPOINT + url, data, options), observer, cache);
      }, (err) => {
        observer.error();
      });
    });
  }

  put(url, data) {
    return new Observable((observer) => {
      this.getHeader(true).subscribe((header) => {
        // console.log('header++', header);
        const options = { headers: header };
        // this.spinner.spinnerInit();
        const cache = this.cacheRequest('put', AppConstant.AWS_API_ENDPOINT + url, data);
        this.handler(this.http.put(AppConstant.AWS_API_ENDPOINT + url, data, options), observer, cache);
      }, (err) => {
        // console.log(err);
        observer.error();
      });
    });
  }

  get(url, data): Observable<any> {
    return new Observable((observer) => {
      this.getHeader(false).subscribe((header) => {
        // console.log('header', header);
        const options = { headers: header };
        const query = (data) ? '?data=' + encodeURI(JSON.stringify(data)) : '';
        if (url !== '/customer/all') {
          if (url !== '/driver/all') {
            // this.spinner.spinnerInit();
          }
        }
        const cache = this.cacheRequest('get', AppConstant.AWS_API_ENDPOINT + url + query);
        this.handler(this.http.get(AppConstant.AWS_API_ENDPOINT + url + query, options), observer, cache);
      }, (err) => {
        // console.log(url);
        // console.error('err++', err);
        observer.error(err);
      });
    });
  }

  delete(url, data): Observable<any> {
    return new Observable((observer) => {
      this.getHeader(false).subscribe((header) => {
        const options = { headers: header };
        const query = (data) ? '?data=' + encodeURI(JSON.stringify(data)) : '';
        // console.log(query);
        // this.spinner.spinnerInit();
        const cache = this.cacheRequest('delete', AppConstant.AWS_API_ENDPOINT + url + query);
        this.handler(this.http.delete(AppConstant.AWS_API_ENDPOINT + url + query, options), observer, cache);
      }, (err) => {
        // console.error('err++', err);
        observer.error(err);
      });
    });
  }
}

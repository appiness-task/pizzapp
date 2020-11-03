import { environment } from './../../environments/environment';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstant } from '../app.constant';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})

export class StartupService {

    domain: string;
    domainName: any[];
    user;
    public startupData: any;
    constructor(private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        @Inject(DOCUMENT) private document: HTMLDocument) {
        this.route.params.subscribe(() => {
            this.domain = window.location.href.replace(/(https?:\/\/)?(www.)?/i, '');
            this.domainName = this.domain.split('.');
        });
    }

    public async load(): Promise<any> {
        this.startupData = null;
        let data: object;
        if (environment.production) {
            data = { name: this.domainName[0] };
        } else {
            data = { name: 'kris' };
        }

        try {
            return new Promise((resolve, reject) => {
                this.http.get(`${AppConstant.AWS_API_ENDPOINT}/formeditor${(data) ? '?data=' + encodeURI(JSON.stringify(data)) : ''}`)
                    .subscribe((formSettingsData) => {
                        this.startupData = formSettingsData;
                        resolve(true);
                    }, (error) => {
                        this.router.navigateByUrl('/error');
                        resolve(true);
                    }, () => {
                        const head = document.querySelector('head');
                        const favicon = this.document.createElement('link');

                        favicon.setAttribute('rel', 'icon');
                        favicon.setAttribute('type', 'image/x-icon');
                        favicon.setAttribute('href', this.startupData.navigationIcon);
                        head.appendChild(favicon);

                        if (!this.isLoginEnabled) {
                            this.router.navigateByUrl('/new-task');
                        } else {
                            this.user = localStorage.getItem('user');
                            if (this.user === null) {
                                this.router.navigateByUrl('/login');
                            } else {
                                if (window.location.pathname === '/error') {
                                    this.router.navigateByUrl('/dashboard');
                                }
                            }
                        }
                        this.document.documentElement.style.setProperty('--main-bg-color', this.startupData.themeColor);
                        resolve(true);
                    });
            });
        } catch (err) {
            this.router.navigateByUrl('/error');
            Promise.resolve(true);
        }
    }

    get startData(): any {
        return this.startupData;
    }

    get isLoginEnabled(): any {
        return this.startupData.isLoginEnabled;
    }

    get clientId(): string {
        return this.startupData.clientId;
    }

    get loginIcon(): string {
        return this.startupData.loginIcon;
    }

    get navigationIcon(): string {
        return this.startupData.navigationIcon;
    }

    get businessType(): number {
        return this.startupData.businessType;
    }

    get isAutoFillInformationEnabled(): number {
        return this.startData.isAutoFillInformationEnabled;
    }

    get isCustomerSearchEnabled(): number {
        return this.startData.isCustomerSearchEnabled;
    }

    get isAutoAllocationEnabled(): number {
        return this.startData.isAutoAllocationEnabled;
    }

    get language(): string {
        return this.startData.language;
    }
}


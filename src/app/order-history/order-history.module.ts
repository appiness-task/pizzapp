import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {OrderHistoryRoutingModule} from './order-history.routing';
import {OrderHistoryComponent} from './order-history.component';
import { SharedModule } from '../shared';

@NgModule({
  declarations: [OrderHistoryComponent],
  imports: [
    CommonModule,
    OrderHistoryRoutingModule,
    SharedModule
  ]
})
export class OrderHistoryModule { }

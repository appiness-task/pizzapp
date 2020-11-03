import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderHistoryComponent } from './order-history/order-history.component';


const routes: Routes = [
  {
    path: 'order-history',
    data: { title: 'Order History' },
    component: OrderHistoryComponent,
    loadChildren: () => import('./order-history/order-history.module').then(m => m.OrderHistoryModule)
  },
  {
    path: '',
    redirectTo:"/order-history",
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

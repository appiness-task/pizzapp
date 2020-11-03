import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SHARED_ZORRO_MODULES } from './shared-zorro.module';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LayoutModule,
    ReactiveFormsModule,
    ...SHARED_ZORRO_MODULES
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LayoutModule,
    ReactiveFormsModule,
    ...SHARED_ZORRO_MODULES
  ],
  providers: [
  ]
})
export class SharedModule { }

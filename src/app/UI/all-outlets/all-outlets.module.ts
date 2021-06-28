import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllOutletsPageRoutingModule } from './all-outlets-routing.module';

import { AllOutletsPage } from './all-outlets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllOutletsPageRoutingModule
  ],
  declarations: [AllOutletsPage]
})
export class AllOutletsPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DisplayBanksPage } from './display-banks';

@NgModule({
  declarations: [
    DisplayBanksPage,
  ],
  imports: [
    IonicPageModule.forChild(DisplayBanksPage),
  ],
})
export class DisplayBanksPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateEntryPageRoutingModule } from './create-entry-routing.module';

import { CreateEntryPage } from './create-entry.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    CreateEntryPageRoutingModule
  ],
  declarations: [CreateEntryPage]
})
export class CreateEntryPageModule {}

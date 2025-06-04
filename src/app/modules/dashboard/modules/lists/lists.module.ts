import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsComponent } from './lists.component';
import { ListsRoutingModule } from './lists-routing.module';
import { StoreModule } from '@ngrx/store';
import { listsFeature } from './store/lists.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ListsEffects } from './store/lists.effects';
import { SharedModule } from '../../../../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListsComponent,
  ],
  imports: [
    CommonModule,
    ListsRoutingModule,
    StoreModule.forFeature(listsFeature),
    EffectsModule.forFeature([ListsEffects]),
    SharedModule,
    FormsModule,
  ]
})
export class ListsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InscriptionsComponent } from './inscriptions.component';
import { InscriptionsRoutingModule } from './inscriptions-routing.module';

@NgModule({
    declarations: [
        InscriptionsComponent
    ],
    imports: [
        CommonModule,
        InscriptionsRoutingModule,
        ReactiveFormsModule,
    ],
    exports: [
        InscriptionsComponent
    ]
})
export class InscriptionsModule { }

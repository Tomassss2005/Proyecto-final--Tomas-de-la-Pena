import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionsComponent } from './inscriptions.component';

const routes: Routes = [

    // Parte de la base /dashboard/inscriptions
    {
        path: '',
        component: InscriptionsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InscriptionsRoutingModule { }
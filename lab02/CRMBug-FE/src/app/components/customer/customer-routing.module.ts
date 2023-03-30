import { CustomerComponent } from './customer.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: CustomerComponent,
    children: [
      {
        path: "address",
        loadChildren: () => import("../address/address.module").then(m => m.AddressModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }

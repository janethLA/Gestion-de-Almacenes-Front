import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryPageComponent } from './components/delivery-page/delivery-page.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { PaymentsContentComponent } from './components/payments-content/payments-content.component';
import { RegisterStoreComponent } from './components/register-store/register-store.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ReportOfOrdersComponent } from './components/report-of-orders/report-of-orders.component';
import { ShowOrdersComponent } from './components/show-orders/show-orders.component';
import { ShowStoresComponent } from './components/show-stores/show-stores.component';
import { StoreContentComponent } from './components/store-content/store-content.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UpdateWarehouseComponent } from './components/update-warehouse/update-warehouse.component';
import { UserGuard } from './security/user.guard';

const routes: Routes = [
  {path:'manageAccounts',component: HomeAdminComponent,canActivate:[UserGuard]},
  {path:'registerStores',component: RegisterStoreComponent,canActivate:[UserGuard]},
  {path:'showStores',component: ShowStoresComponent,canActivate:[UserGuard]},
  {path:'showStores/:id',component: StoreContentComponent,canActivate:[UserGuard]},
  {path:'login',component:LoginComponent},
  {path:'home',component:HomePageComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path:'home/orders-list',component:OrdersListComponent,canActivate:[UserGuard]},
  {path:'home/user/update-user',component:UpdateUserComponent,canActivate:[UserGuard]},
  {path:'home/show-orders',component:ShowOrdersComponent,canActivate:[UserGuard]},
  {path:'home/reports',component:ReportOfOrdersComponent,canActivate:[UserGuard]},
  {path:'home/delivery',component:DeliveryPageComponent,canActivate:[UserGuard]},
  {path:'home/payments',component:PaymentsContentComponent,canActivate:[UserGuard]},
  {path:'home/update/warehouses',component:UpdateWarehouseComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

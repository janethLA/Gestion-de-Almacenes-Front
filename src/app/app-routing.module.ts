import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { RegisterStoreComponent } from './components/register-store/register-store.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ReportOfOrdersComponent } from './components/report-of-orders/report-of-orders.component';
import { ShowOrdersComponent } from './components/show-orders/show-orders.component';
import { ShowStoresComponent } from './components/show-stores/show-stores.component';
import { StoreContentComponent } from './components/store-content/store-content.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';

const routes: Routes = [
  {path:'manageAccounts',component: HomeAdminComponent},
  {path:'registerStores',component: RegisterStoreComponent},
  {path:'showStores',component: ShowStoresComponent},
  {path:'showStores/:id',component: StoreContentComponent},
  {path:'login',component:LoginComponent},
  {path:'home',component:HomePageComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path:'home/orders-list',component:OrdersListComponent},
  {path:'home/user/update-user',component:UpdateUserComponent},
  {path:'home/show-orders',component:ShowOrdersComponent},
  {path:'home/reports',component:ReportOfOrdersComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterStoreComponent } from './components/register-store/register-store.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ShowStoresComponent } from './components/show-stores/show-stores.component';
import { StoreContentComponent } from './components/store-content/store-content.component';

const routes: Routes = [
  {path:'manageAccounts',component: HomeAdminComponent},
  {path:'registerStores',component: RegisterStoreComponent},
  {path:'showStores',component: ShowStoresComponent},
  {path:'showStores/:id',component: StoreContentComponent},
  {path:'login',component:LoginComponent},
  {path:'home',component:HomePageComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

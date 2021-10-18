import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { RegisterRoleComponent } from './components/register-role/register-role.component';
import { DgPrivelegesComponent } from './components/dg-priveleges/dg-priveleges.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {RequestService} from '../app/services/request.service';

import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http' 
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import { RegisterStoreComponent } from './components/register-store/register-store.component';
import { ShowStoresComponent } from './components/show-stores/show-stores.component';
import {AgmCoreModule} from '@agm/core';
import { StoreCardComponent } from './components/store-card/store-card.component';
import { RegisterSectorComponent } from './components/register-sector/register-sector.component';
import { StoreContentComponent } from './components/store-content/store-content.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { CategoryFormComponent } from './components/category-form/category-form.component'
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { CookieService } from 'ngx-cookie-service';
import { interceptorProvider, } from './security/jwt-interceptor.interceptor';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { LoginComponent } from './components/login/login.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { HomePageComponent } from './components/home-page/home-page.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidenavComponent,
    RegisterUserComponent,
    HomeAdminComponent,
    RegisterRoleComponent,
    DgPrivelegesComponent,
    RegisterStoreComponent,
    ShowStoresComponent,
    StoreCardComponent,
    RegisterSectorComponent,
    StoreContentComponent,
    ProductFormComponent,
    CategoryFormComponent,
    LoginComponent,
    ProductCardComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatDividerModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule, FormsModule,
    MatTableModule,
    MatDialogModule,
    HttpClientModule,
    MatSnackBarModule,
    MatInputModule,
    AgmCoreModule.forRoot({apiKey:"AIzaSyAlZsuin6kTiBDLiELbZhUpgAeZ6UiYgWo"}),
    MaterialFileInputModule,
    MatAutocompleteModule,
    
  ],
  providers: [RequestService,CookieService,interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }

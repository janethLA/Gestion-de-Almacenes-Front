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
import {MatBadgeModule} from '@angular/material/badge';
import { ItemCardComponent } from './components/cards/item-card/item-card.component';
import { DgNewUserComponent } from './components/dialogs/dg-new-user/dg-new-user.component';
import { DgPhoneCodeComponent } from './components/dialogs/dg-phone-code/dg-phone-code.component';
import { DgConfirmPedidoComponent } from './components/dialogs/dg-confirm-pedido/dg-confirm-pedido.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { OrderCardComponent } from './components/cards/order-card/order-card.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { ShowOrdersComponent } from './components/show-orders/show-orders.component';
import { DgUpdateUserComponent } from './components/dialogs/dg-update-user/dg-update-user.component';
import { DgAssignDeliveryComponent } from './components/dialogs/dg-assign-delivery/dg-assign-delivery.component';
import { MatListModule } from '@angular/material/list';
import { ReportOfOrdersComponent } from './components/report-of-orders/report-of-orders.component'; 
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DgForgetPasswordComponent } from './components/dialogs/dg-forget-password/dg-forget-password.component'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DgRestartPasswordComponent } from './components/dialogs/dg-restart-password/dg-restart-password.component';
import { DeliveryPageComponent } from './components/delivery-page/delivery-page.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DgOrdersRejectedComponent } from './components/dialogs/dg-orders-rejected/dg-orders-rejected.component';
import { DgFillEmergencyComponent } from './components/dialogs/dg-fill-emergency/dg-fill-emergency.component';
import { DgShippingCostComponent } from './components/dialogs/dg-shipping-cost/dg-shipping-cost.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DgCreatePaymentComponent } from './components/dialogs/dg-create-payment/dg-create-payment.component';
import { PaymentsContentComponent } from './components/payments-content/payments-content.component';
import {MatStepperModule} from '@angular/material/stepper';
import { DgViewPaymentComponent } from './components/dialogs/dg-view-payment/dg-view-payment.component';
import { UpdateWarehouseComponent } from './components/update-warehouse/update-warehouse.component';
import { DgUpdatePriceComponent } from './components/dialogs/dg-update-price/dg-update-price.component';
import { DgUpdateImageComponent } from './components/dialogs/dg-update-image/dg-update-image.component';
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
    ItemCardComponent,
    DgNewUserComponent,
    DgPhoneCodeComponent,
    DgConfirmPedidoComponent,
    OrdersListComponent,
    OrderCardComponent,
    UpdateUserComponent,
    ShowOrdersComponent,
    DgUpdateUserComponent,
    DgAssignDeliveryComponent,
    ReportOfOrdersComponent,
    DgForgetPasswordComponent,
    DgRestartPasswordComponent,
    DeliveryPageComponent,
    DgOrdersRejectedComponent,
    DgFillEmergencyComponent,
    DgShippingCostComponent,
    DgCreatePaymentComponent,
    PaymentsContentComponent,
    DgViewPaymentComponent,
    UpdateWarehouseComponent,
    DgUpdatePriceComponent,
    DgUpdateImageComponent,
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
    MatBadgeModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatExpansionModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule
    
  ],
  providers: [RequestService,CookieService,interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }

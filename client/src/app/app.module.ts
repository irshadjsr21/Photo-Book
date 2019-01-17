import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiServiceService } from './service/api-service.service';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { MugsComponent } from './components/mugs/mugs.component';
import { MobileCoversComponent } from './components/mobile-covers/mobile-covers.component';
import { CalendarsWallComponent } from './components/calendars-wall/calendars-wall.component';
import { CalendarsDesktopComponent } from './components/calendars-desktop/calendars-desktop.component';
import { PhotobooksComponent } from './components/photobooks/photobooks.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CustomProductComponent } from './components/custom-product/custom-product.component';
import { CartComponent } from './components/cart/cart.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { PreviewHeaderComponent } from './components/preview-header/preview-header.component';
import { NgxImageEditorModule } from 'ngx-image-editor';
import { PhotoeditorComponent } from './components/photoeditor/photoeditor.component';
import { AccountComponent } from './components/account/account.component';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { AdminLoginComponent } from './components/admin-panel/login/login.component';
import { AdminDashboardComponent } from './components/admin-panel/dashboard/dashboard.component';
import { UserGuard } from './auth/user.guard';
import { AdminGuard } from './auth/admin.guard';

const appRoutes: Routes = [
  { path: 'mug', component: MugsComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'productedit', component: ProductDetailComponent },
  { path: 'photoeditor', component: PhotoeditorComponent },
  { path: 'account', component: AccountComponent, canActivate: [UserGuard] },
  { path: 'product', component: LandingComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard]
  },
  { path: '', redirectTo: '/product', pathMatch: 'full' },
  { path: '**', redirectTo: '/product' }
];

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    MugsComponent,
    MobileCoversComponent,
    CalendarsWallComponent,
    CalendarsDesktopComponent,
    PhotobooksComponent,
    ProductDetailComponent,
    CustomProductComponent,
    CartComponent,
    SignInComponent,
    SignUpComponent,
    HeaderComponent,
    PreviewHeaderComponent,
    PhotoeditorComponent,
    AccountComponent,
    AdminLoginComponent,
    AdminDashboardComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularCropperjsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ApiServiceService, UserGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}

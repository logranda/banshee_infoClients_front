import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, CurrencyPipe, registerLocaleData} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import localeEs from '@angular/common/locales/es-CO';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatOptionModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './auth/guards/auth.guard';
import {CreateCostumerComponent} from './costumer/create-costumer.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {CreateVisitComponent} from './costumer/create-visit.component';
import {TokenInterceptor} from './auth/interceptors/token.interceptor';
import {AuthInterceptor} from './auth/interceptors/auth.interceptor';
import {CostumerComponent} from "./costumer/costumer.component";
import {MatStepperModule} from "@angular/material/stepper";
import {ChartComponent} from './chart/chart.component';
import {ChartsModule} from 'ng2-charts';
import {NumberOnlyDirective} from "./commons/utility/number-only.directive";

registerLocaleData(localeEs, 'es-CO');
const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'costumer', component: CostumerComponent, canActivate: [AuthGuard]},
  {path: 'chart', component: ChartComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CostumerComponent,
    HomeComponent,
    HeaderComponent,
    CreateCostumerComponent,
    CreateVisitComponent,
    ChartComponent,
    NumberOnlyDirective
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatOptionModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatDialogModule,
    MatAutocompleteModule,
    ChartsModule
  ],
  exports: [
    CreateCostumerComponent,
    CreateVisitComponent
  ],
  entryComponents: [
    CreateCostumerComponent,
    CreateVisitComponent
  ],
  providers: [
    CookieService, CurrencyPipe,
    {provide: LOCALE_ID, useValue: 'es-CO'},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

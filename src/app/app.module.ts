import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {AppMainComponent} from './shared/app-main/app-main.component';
import {AppToolbarComponent} from './shared/app-main/app-toolbar/app-toolbar.component';
import {SideNavComponent} from './shared/app-main/side-nav/side-nav.component';
import {routing} from './routes';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {Angular2FontawesomeModule} from 'angular2-fontawesome';
import {LogInComponent} from './auth/log-in/log-in.component';
import {ResetComponent} from './auth/reset/reset.component';
import {SignUpComponent} from './auth/sign-up/sign-up.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {StoreModule} from '@ngrx/store';
import {LoginReducer} from '../app/store/reducers/currentuser.reducer';
import * as IAppStates from './store/IAppState';
import {UserService} from './user/user.service';
import {AuthService} from './auth/auth.service';
import {AuthGuard} from './auth/auth.guard';
import {LocalStorageService} from './shared/services/local-storage/local-storage.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './home/home.component';
import {HomeService} from './home/home.service';
import {RecipeComponent} from './shared/recipe/recipe.component';
import {FooterComponent} from './shared/footer/footer.component';
import {MatSelectModule, MatSidenav, MatSidenavContainer, MatSidenavContent, MatSidenavModule} from '@angular/material';
import {SideMenuComponent} from './shared/side-menu/side-menu.component';
import {NgHttpLoaderModule} from 'ng-http-loader/ng-http-loader.module';
import {RestService} from './rest.service';
import {AddRecipeComponent} from './add-recipe/add-recipe.component';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {ImageCropperModule} from 'ngx-image-cropper';
import { MyRecipeComponent } from './my-recipe/my-recipe.component';
import {MyRecipeService} from './my-recipe/my-recipe.service';
import {TokenStorage } from './core/token.storage';
import {Interceptor} from "./core/inteceptor";
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { StarsDisplayComponent } from './shared/stars-display/stars-display.component';
import { ShowErrorsComponent } from './shared/show-errors/show-errors.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    AppMainComponent,
    AppToolbarComponent,
    SideNavComponent,
    LogInComponent,
    ResetComponent,
    SignUpComponent,
    HomeComponent,
    RecipeComponent,
    FooterComponent,
    SideMenuComponent,
    AddRecipeComponent,
    MyRecipeComponent,
    ViewRecipeComponent,
    StarsDisplayComponent,
    ShowErrorsComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    Angular2FontawesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSidenavModule,
    HttpClientModule,
    NgHttpLoaderModule,
    NgMultiSelectDropDownModule.forRoot(),
    ImageCropperModule,
    StoreModule.forRoot({loggedInUser :LoginReducer}),
    routing
  ],
  providers: [
    UserService,
    AuthService,
    AuthGuard,
    LocalStorageService,
    HomeService,
    RestService,
    MyRecipeService,
    TokenStorage,
    {provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi : true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

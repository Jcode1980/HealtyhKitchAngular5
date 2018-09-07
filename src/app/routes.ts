import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {AppMainComponent} from './shared/app-main/app-main.component';
import {LogInComponent} from './auth/log-in/log-in.component';
import {ResetComponent} from './auth/reset/reset.component';
import {SignUpComponent} from './auth/sign-up/sign-up.component';
import {AuthGuard} from './auth/auth.guard';
import {AddRecipeComponent} from './add-recipe/add-recipe.component';
import {ViewRecipeComponent} from './view-recipe/view-recipe.component';
import {HomeComponent} from './home/home.component';
import { MyRecipeComponent } from './my-recipe/my-recipe.component';

const appRoutes: Routes = [
  {
    path: '',
    component: AppMainComponent,
    // canActivate: [AuthGuard],
    children: [
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: 'add-recipe', component: AddRecipeComponent, pathMatch: 'full'},
      {path: 'my-recipes', component: MyRecipeComponent, pathMatch: 'full'},
      {path: 'edit-recipe/:id', component: AddRecipeComponent },
      {path: 'view-recipe/:id', component: ViewRecipeComponent},
     
    ]

  },
  {
    path: 'auth',
    // canActivate: [PreventLoggedInAccessGuard],
    children: [
      {path: 'login', component: LogInComponent},
      {path: 'reset', component: ResetComponent},
      {path: 'sign-up', component: SignUpComponent}
    ]
  }
];

export const routing = RouterModule.forRoot(appRoutes);

import { Routes } from '@angular/router';
import { HomeComponent} from "./home/home.component";
import { ContactUsComponent} from "./contact-us/contact-us.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: '**', redirectTo: ''},
];


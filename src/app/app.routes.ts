import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { NewDetailComponent } from './pages/new-detail/new-detail.component';
import { NewsComponent } from './pages/news/news.component';
import { ServicesComponent } from './pages/services/services.component';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: 'services',
    component: ServicesComponent
  },

  {
    path: 'about',
    component: AboutComponent
  },

  {
    path: 'contact',
    component: ContactComponent
  },

  {
    path: 'news',
    component: NewsComponent
  },

  // Detalhe da notícia selecionada
  { path: 'news/:id', component: NewDetailComponent },

  { path: '**', redirectTo: '' }
];

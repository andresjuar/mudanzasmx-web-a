import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { QuoteComponent } from './pages/quote/quote.component';
import { SucursalesComponent } from './pages/sucursales/sucursales.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';


export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'Contacto', component: ContactoComponent},
    {path: 'Nosotros', component: NosotrosComponent},
    {path: 'Cotiza', component: QuoteComponent},
    {path: 'Sucursales', component: SucursalesComponent},
    {path: 'Servicios', component: ServiciosComponent},
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateQrComponent } from './pages/generate-qr/generate-qr.component';
import { VerifyQrComponent } from './pages/verify-qr/verify-qr.component';

const routes: Routes = [
  {path: 'generate', component: GenerateQrComponent},
  {path: 'verify', component: VerifyQrComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

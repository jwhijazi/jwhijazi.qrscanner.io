import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VerifyQrComponent } from './pages/verify-qr/verify-qr.component';
import { GenerateQrComponent } from './pages/generate-qr/generate-qr.component';

@NgModule({
  declarations: [
    AppComponent,
    VerifyQrComponent,
    GenerateQrComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

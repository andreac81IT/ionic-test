import { APP_INITIALIZER, NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AppConfigService } from './services/app-config-service';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {CountryService} from './services/country.service';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpRequest } from '@angular/common/http';
import { NoteModalPage } from './note-modal/note-modal.page';
import { NoteService } from './services/note.service';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

export function initializeApp(appConfig: AppConfigService) {
  return () => appConfig.load();
}

@NgModule({
  declarations: [AppComponent,NoteModalPage],
  entryComponents: [NoteModalPage],
  imports: [BrowserModule,FormsModule, IonicModule.forRoot(),
    IonicStorageModule.forRoot(), 
  AppRoutingModule,HttpClientModule,FontAwesomeModule],
  providers: [
    StatusBar,
    SplashScreen,
    CountryService,
    NoteService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    AppConfigService,
    {
        provide: APP_INITIALIZER,
        useFactory: initializeApp,
        deps: [AppConfigService],
        multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicStorageModule } from '@ionic/storage';
import { CountryListComponent } from './country-list.component';
import { CountryService } from 'src/app/services/country.service';
import { CountryStorageService } from 'src/app/services/country.storage.service';
import { ModalController, AngularDelegate } from '@ionic/angular';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { AppConfigService } from 'src/app/services/app-config-service';
import { APP_INITIALIZER, NgModule, LOCALE_ID } from '@angular/core';
import { MockConfigService } from 'src/app/services/mock.config.service';

describe('CountryListComponent', () => {
  let component: CountryListComponent;
  let fixture: ComponentFixture<CountryListComponent>;
  
  function initializeApp(appConfig: AppConfigService) {
    return () => appConfig.load();
  }


  beforeEach(async(() => {
   
    TestBed.configureTestingModule({
      imports: [IonicStorageModule.forRoot()],
      declarations: [ CountryListComponent ],
      providers: [CountryService,CountryStorageService,HttpClient,HttpHandler,ModalController,AngularDelegate,AppConfigService

      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
    
  }
  
  ));
  
  
  beforeEach(() => {
    TestBed.overrideProvider(AppConfigService,{
        useFactory: initializeApp,
        deps: [AppConfigService],
    });

    fixture = TestBed.createComponent(CountryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
});

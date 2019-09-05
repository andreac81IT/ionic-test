import { AppConfigService } from './app-config-service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MockConfigService {

    constructor(private service: AppConfigService) {
        
    }

    load(){
        this.service.load();
    }
}
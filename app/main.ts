import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import { AudioService } from './services/AudioService';

const platform = platformBrowserDynamic();

platform.bootstrapModule(AppModule, [

]);
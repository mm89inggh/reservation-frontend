import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  imports: [GoogleMapsModule],
  exports: [GoogleMapsModule]
})
export class GoogleMapsConfigModule {}
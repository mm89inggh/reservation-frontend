import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    // Configura AGM con la API key aquí.
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCQsCp70RsIMCAjxUoUH-PDbwLxC3BrjHQ'
    })
  ],
  exports: [
    // Exporta el módulo configurado para que otros componentes puedan usarlo.
    AgmCoreModule
  ]
})
export class AgmConfigModule {}

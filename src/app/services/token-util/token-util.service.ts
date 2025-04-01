import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class TokenUtilService {

  constructor(private keycloakService: KeycloakService) {}


  // Decodificar el token
  public getDecodedToken(): Promise<any> {
    return this.keycloakService.getToken()
      .then(token => {
        return JSON.parse(atob(token.split('.')[1])); // Decodifica el token
      })
      .catch(e => {
        console.error('Error occurred while parsing. Check console logs:', e);
        throw e; // Propaga el error para que pueda ser manejado donde se use este método
      });
  }
  

  // Obtener un atributo específico del token
  public async getAttribute(attribute: string): Promise<any> {
    try {
      const decodedToken = await this.getDecodedToken(); // Esperar a que se decodifique el token
      return decodedToken[attribute]; // Retornar el atributo solicitado
    } catch (e) {
      console.error('Error occurred while retrieving attribute:', e);
      throw e; // Propagar el error si algo falla
    }
  }
  
}
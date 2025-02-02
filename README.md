# Sistema de Reserva de Citas para Pequeños Negocios

## Descripción

Este proyecto es un sistema de reservas en línea diseñado para pequeños negocios que requieren la programación de citas, como peluquerías, spas, restaurantes, estudios de yoga, entre otros. El sistema permite a los propietarios gestionar y optimizar sus reservas de manera eficiente, mejorando la experiencia del cliente y evitando conflictos como el overbooking.

La aplicación se desarrolló utilizando una arquitectura modular para facilitar la integración con sistemas existentes y adaptarse a las necesidades de cada negocio. Se emplearon prácticas de desarrollo ágil, principios SOLID y buenas prácticas de diseño para garantizar escalabilidad y flexibilidad.

## Características

- **Gestión de Usuarios:** Registro e inicio de sesión.
- **Gestión de Reservas:**
  - Creación y cancelación de reservas.
  - Prevención de overbooking mediante restricciones únicas en la base de datos.
- **Gestión de Servicios:** Administración de los servicios ofrecidos por el negocio.
- **Información del Negocio:** Visualización y edición de datos del negocio.
- **Notificaciones:** Enío y visualización de notificaciones relacionadas con las reservas.
- **Transacciones:** Historial de pagos asociados a las reservas.

## Tecnologías Utilizadas

### **Frontend:**
- Angular 19
- HTML5, CSS3, TypeScript
- RxJS

### **Backend:**
- Spring Boot
- Java
- Spring Data JPA
- PostgreSQL

### **Base de Datos:**
- PostgreSQL

## Estructura del Proyecto

```
frontend-angular/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   │   ├── login.component.ts
│   │   │   │   │   ├── login.component.html
│   │   │   │   │   └── login.component.css
│   │   │   │   ├── register/
│   │   │   │   │   ├── register.component.ts
│   │   │   │   │   ├── register.component.html
│   │   │   │   │   └── register.component.css
│   │   │   ├── dashboard/
│   │   │   │   ├── dashboard.component.ts
│   │   │   │   ├── dashboard.component.html
│   │   │   │   └── dashboard.component.css
│   │   │   ├── reservations/
│   │   │   │   ├── reservations.component.ts
│   │   │   │   ├── reservations.component.html
│   │   │   │   └── reservations.component.css
│   │   │   ├── services-management/
│   │   │   │   ├── services-management.component.ts
│   │   │   │   ├── services-management.component.html
│   │   │   │   └── services-management.component.css
│   │   │   ├── business-info/
│   │   │   │   ├── business-info.component.ts
│   │   │   │   ├── business-info.component.html
│   │   │   │   └── business-info.component.css
│   │   │   ├── notifications/
│   │   │   │   ├── notifications.component.ts
│   │   │   │   ├── notifications.component.html
│   │   │   │   └── notifications.component.css
│   │   │   ├── transactions/
│   │   │   │   ├── transactions.component.ts
│   │   │   │   ├── transactions.component.html
│   │   │   │   └── transactions.component.css
│   │   ├── models/
│   │   ├── services/
│   │   ├── shared/
│   │   ├── app.routes.ts
│   │   ├── app.component.ts
│   │   └── main.ts
```

## Instalación y Configuración

### **Requisitos**
- **Frontend:** Node.js, Angular CLI (v19 o superior)
- **Backend:** JDK 11 o superior, Maven o Gradle
- **Base de Datos:** PostgreSQL

### **Clonar el Repositorio**

```bash
git clone https://github.com/tu-usuario/sistema-reservas.git
cd sistema-reservas
```

### **Instalación del Frontend**
```bash
cd frontend-angular
npm install
ng serve
```

### **Instalación del Backend**
```bash
cd backend-spring
mvn clean install
mvn spring-boot:run
```

### **Base de Datos (PostgreSQL)**
Ejecuta el siguiente script SQL para crear la base de datos y sus tablas:

```sql
CREATE TABLE USUARIO (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE NEGOCIO (
    id_negocio SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion TEXT NOT NULL,
    contacto VARCHAR(50) NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario)
);

CREATE TABLE RESERVA (
    id_reserva SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    estado VARCHAR(50) DEFAULT 'pendiente',
    id_usuario INT NOT NULL,
    id_negocio INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario),
    FOREIGN KEY (id_negocio) REFERENCES NEGOCIO(id_negocio)
);
```

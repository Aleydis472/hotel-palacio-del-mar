# **Aplicación de Reservas de Hotel - Angular + Firebase**

Esta aplicación web permite a los usuarios gestionar reservas en un hotel, facilitando la creación, modificación y cancelación de reservas. Con solo una habitación disponible, los usuarios deben seguir ciertas reglas para realizar sus reservas, como no poder reservar más de 3 días ni hacerlo con más de 30 días de anticipación. La aplicación también inhabilita las fechas ya ocupadas, asegurando así una gestión eficiente y organizada de las reservas a través de Firebase.

## **Características Principales**

- **Crear Reservas**: Los usuarios pueden realizar nuevas reservas seleccionando fechas disponibles y proporcionando la información requerida.
- **Modificar y Eliminar Reservas**: Las reservas existentes pueden ser editadas o canceladas fácilmente.
- **Validaciones de Fecha**:
  - Se restringe la selección de fechas ya ocupadas.
  - La duración máxima de estancia permitida es de 3 días.
  - Las reservas no pueden hacerse con más de 30 días de anticipación.
- **Verificación de Fechas Disponibles**: Las fechas ocupadas se desactivan en el calendario, y se muestra un mensaje de error si se intenta reservar en días ya reservados.

## **Tecnologías Utilizadas**

- **Angular 18**: Framework principal utilizado para el desarrollo del frontend.
- **Firebase Firestore**: Base de datos en la nube que almacena las reservas de manera segura.
- **Bootstrap**: Framework CSS utilizado para estilizar y estructurar la interfaz de usuario.
- **Angular Signals**: Herramienta para la gestión reactiva del estado, permitiendo la actualización en tiempo real de los datos.
- **Font Awesome**: Biblioteca de iconos utilizada en la interfaz para mejorar la experiencia del usuario.
- **SweetAlert**: Biblioteca utilizada para mostrar alertas y mensajes de confirmación de manera elegante y atractiva.

## **Requisitos**

### **Instalaciones Previas**

Antes de clonar e instalar el proyecto, asegúrate de tener instaladas las siguientes herramientas:

- [Node.js](https://nodejs.org/) (Versión 14 o superior)
- [Angular CLI](https://angular.io/cli) (Versión 12 o superior)
- Cuenta en [Firebase](https://firebase.google.com/)

### **Clonar el Proyecto**

Para clonar el repositorio de GitHub, ejecuta:

```bash
git clone https://github.com/tu-repositorio/reservas-hotel-angular.git
cd reservas-hotel-angular


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

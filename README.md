# Cliente de React para la API Rest con NestJS

Este es un cliente de React que consume la API Rest desarrollada con NestJS. El cliente proporciona una interfaz de usuario para la autenticación de usuarios, la gestión del estado global del usuario y del carrito utilizando "Jotai", filtros de búsqueda, búsqueda de productos, paginación de productos, enrutamiento con react-router-dom y la posibilidad de ver tus pedidos.

## Funcionalidades

- **Autenticación**: El cliente permite a los usuarios registrarse e iniciar sesión utilizando la API Rest de NestJS. La autenticación se gestiona mediante JSON Web Tokens (JWT).

- **Estado Global**: Utiliza "Jotai" para gestionar el estado global de la aplicación, incluyendo la información del usuario y el contenido del carrito de compras.

- **Filtros de Búsqueda**: Los usuarios pueden filtrar productos por diferentes criterios, como categoría, precio, etc.

- **Búsqueda de Productos**: Permite a los usuarios buscar productos específicos por nombre o descripción.

- **Paginación de Productos**: Los resultados de la búsqueda se presentan de forma paginada para una mejor experiencia de usuario.

- **Enrutamiento**: Utiliza `react-router-dom` para gestionar el enrutamiento de la aplicación, lo que permite una navegación fluida entre las diferentes páginas y vistas.

- **Visualización de Pedidos**: Los usuarios pueden ver sus pedidos anteriores, proporcionando un historial de compras completo.

## Requisitos

Asegúrate de tener instalado Node.js y npm en tu sistema antes de continuar.

## Instalación

1. Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/andresdrew02/nestjs-basic-react-client
```

2. Navega al directorio del proyecto:

```bash
cd nestjs-basic-react-client
```

3. Instala las dependencias:

```bash
npm install
```

## Configuración

1. Abre el archivo de configuración en el cliente (por ejemplo, `src/config.js`) y asegúrate de que la URL de la API apunte a la ubicación de tu API Rest de NestJS.

## Uso

1. Inicia la aplicación:

```bash
npm run dev
```

2. El cliente estará disponible en `http://localhost:5173` de forma predeterminada. Asegúrate de que la API de NestJS esté en ejecución y configurada correctamente para que el cliente pueda consumirla.

## Estructura del Proyecto

La estructura del proyecto del cliente puede incluir las siguientes carpetas y archivos:

- `src/components`: Componentes reutilizables de React.
- `src/pages`: Componentes de páginas de la aplicación.
- `src/store`: Configuración de estado global utilizando "Jotai".
- `src/lib`: Utilidades y funciones de ayuda.
- `src/App.tsx`: Punto de entrada de la aplicación.
- `public`: Archivos estáticos, como imágenes y favicon.

## Contribución

Si deseas contribuir a este proyecto, ¡estamos encantados de recibir tus contribuciones! Por favor, sigue los estándares de codificación y envía tus solicitudes de extracción.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para obtener más detalles.

---

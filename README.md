# Trello Angular Clone

![Angular](https://img.shields.io/badge/Angular-19-DD0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC?logo=tailwindcss&logoColor=white)
![Dexie](https://img.shields.io/badge/Dexie-IndexedDB-4B5563)
![OAuth 2.0](https://img.shields.io/badge/OAuth-2.0-F59E0B)

Clon de Trello construido con Angular 19. La aplicación permite crear y administrar tableros, listas, tarjetas, etiquetas y checklist con una experiencia de escritorio enfocada en productividad. El estado principal se persiste en IndexedDB mediante Dexie y la autenticación se integra con Google OAuth.

## Resumen del proyecto

| Elemento | Detalle |
| --- | --- |
| Nombre | Trello Angular Clone |
| Framework | Angular 19 |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS 4 + estilos locales |
| Persistencia | IndexedDB con Dexie |
| Autenticación | Google OAuth con `angular-oauth2-oidc` |
| Tipo de app | SPA de gestión visual de tableros |

## Funcionalidades

| Módulo | Qué hace |
| --- | --- |
| Tableros | Crea, lista, ordena y marca tableros como favoritos. |
| Vista de tablero | Muestra el tablero activo con sus listas y tarjetas. |
| Listas | Permiten organizar el trabajo por columnas. |
| Tarjetas | Guardan título, descripción, posición y estado de completado. |
| Etiquetas | Añaden color y contexto visual a las tarjetas. |
| Checklist | Desglosan tareas dentro de una tarjeta. |
| Comentarios | Registran notas y conversaciones por tarjeta. |
| Autenticación | Inicia y cierra sesión con Google. |
| Navegación | Incluye rutas para inicio, tableros, tablero individual, acerca de y callback de auth. |

## Tecnologías principales

| Tecnología | Uso |
| --- | --- |
| Angular Router | Navegación entre páginas y carga de vistas. |
| Angular Material | Menús e interacciones de interfaz. |
| Angular CDK | Utilidades base para comportamientos de UI. |
| RxJS | Flujo reactivo y composición de estado. |
| Dexie | Capa cómoda sobre IndexedDB. |
| angular-oauth2-oidc | Flujo OAuth con Google. |
| Tailwind CSS | Utilidades de estilo para construir la interfaz. |

## Requisitos

| Requisito | Detalle |
| --- | --- |
| Node.js | Entorno compatible con Angular 19. |
| Gestor de paquetes | `npm` o `pnpm`. |
| Navegador | Uno moderno con soporte para IndexedDB y OAuth. |

## Instalación

| Paso | Comando |
| --- | --- |
| Instalar dependencias | `npm install` |
| o con pnpm | `pnpm install` |
| Ejecutar en desarrollo | `npm start` |

Después de arrancar el servidor, abre `http://localhost:4200/`.

## Scripts disponibles

| Script | Comando | Descripción |
| --- | --- | --- |
| `start` | `ng serve` | Inicia el servidor de desarrollo. |
| `build` | `ng build` | Genera la compilación de producción. |
| `watch` | `ng build --watch --configuration development` | Recompila en modo observación. |
| `test` | `ng test` | Ejecuta las pruebas unitarias. |

## Estructura del proyecto

| Ruta | Propósito |
| --- | --- |
| `src/app/pages` | Vistas principales de la aplicación. |
| `src/app/components` | Componentes reutilizables de UI. |
| `src/app/stores` | Estado y lógica de consulta de dominio. |
| `src/app/services` | Servicios, incluido el de autenticación. |
| `src/app/auth` | Pantalla y flujo de callback de OAuth. |
| `src/app/routing` | Resolvers y lógica de apoyo a rutas. |
| `src/app/db.ts` | Esquema y operaciones sobre IndexedDB. |
| `src/app/types.ts` | Tipos compartidos del dominio. |
| `src/app/google-auth.config.ts` | Configuración del cliente OAuth de Google. |

## Rutas principales

| Ruta | Pantalla |
| --- | --- |
| `/` | Home con acceso a tableros y secciones informativas. |
| `/boards` | Lista general de tableros. |
| `/about` | Información de la aplicación. |
| `/board/:boardId` | Vista detallada de un tablero. |
| `/auth/callback` | Retorno del flujo de autenticación. |

## Configuración de autenticación

| Archivo | Qué contiene |
| --- | --- |
| `src/app/google-auth.config.ts` | Issuer, client ID, redirect URI, scopes y parámetros del flujo OAuth. |
| `src/app/services/auth/auth.service.ts` | Inicialización, login, logout y lectura del perfil. |

Si cambias el dominio o ejecutas la app en otra URL, revisa `redirectUri` en `src/app/google-auth.config.ts` para que coincida con tu entorno local o de despliegue.

## Persistencia local

| Entidad | Tabla Dexie | Uso |
| --- | --- | --- |
| Board | `board` | Datos del tablero, favoritos y último acceso. |
| List | `list` | Columnas de un tablero. |
| Card | `card` | Tarjetas dentro de una lista. |
| Label | `label` | Etiquetas asociadas a tarjetas. |
| LabelOption | `labelOption` | Opciones de etiqueta por lista. |
| CheckList | `checklist` | Listas de verificación por tarjeta. |
| CheckListItem | `checklistItem` | Ítems de cada checklist. |
| Comment | `comment` | Comentarios asociados a tarjetas. |

## Flujo de uso

| Acción | Resultado |
| --- | --- |
| Entrar a la app | Se carga la vista principal con navegación y acceso a tableros. |
| Crear un tablero | Se guarda localmente y aparece en la lista general. |
| Abrir un tablero | Se muestran sus listas y tarjetas. |
| Iniciar sesión | Se lanza el flujo de Google OAuth. |
| Cerrar sesión | Se elimina la sesión activa en el cliente. |

## Desarrollo

| Tarea | Comando |
| --- | --- |
| Compilar para verificar | `npm run build` |
| Ejecutar pruebas | `npm test` |
| Levantar servidor con recarga | `npm start` |

## Notas

| Tema | Observación |
| --- | --- |
| Backend | Este proyecto funciona principalmente como cliente y persiste datos en el navegador. |
| Sincronización | El esquema incluye banderas como `synced` y `edited` para posibles flujos futuros. |
| CLI | El proyecto fue generado con Angular CLI 19.2.0. |

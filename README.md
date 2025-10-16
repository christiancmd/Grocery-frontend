# Crud-frontend

Interfaz frontend para un sistema de inventario dinámico e intuitivo. Esta aplicación construida con React ofrece una experiencia sencilla para listar, crear, editar, filtrar y descargar información de productos.

## Qué es

`Crud-frontend` es la parte visual de un proyecto CRUD de productos. Está pensada para gestionar un inventario: mostrar productos, filtrar por categoría, paginar resultados, ver detalles y descargar reportes en PDF por producto.

La UI está diseñada para ser clara y rápida de usar, con componentes reutilizables (tarjetas, tablas, formularios, panel de control) y un flujo de trabajo pensado para administradores.

## Tecnologías

- React (Vite)
- Axios para llamadas HTTP
- react-router para navegación
- react-hook-form para formularios
- tailwindcss para estilos (clases utilitarias)
- react-hot-toast para notificaciones

## Estructura importante

- `src/components/` - Componentes reutilizables (Dashboard, Product, UI primitives, etc.)
- `src/api/request.js` - Cliente Axios y funciones para consumir la API backend
- `src/context/` - Contextos compartidos (por ejemplo, `CategoriesContext` para las categorías)
- `src/hooks/` - Hooks personalizados
- `src/assets/`, `src/utils/` - Utilidades y activos

## Funcionalidades principales

- Listado de productos con paginación.
- Búsqueda por nombre y filtrado por categoría.
- Creación y edición de productos mediante formularios validados.
- Panel de resumen con métricas del inventario.
- Descarga de PDF por producto (petición al backend que genera el PDF).

## APIs esperadas

El frontend espera un backend REST con los siguientes endpoints (ejemplos basados en este proyecto):

- `GET /grocery/api/groceries/` - Listar productos
- `GET /grocery/api/groceries/:id/` - Obtener producto por id
- `POST /grocery/api/groceries/` - Crear producto
- `PUT /grocery/api/groceries/:id/` - Actualizar producto
- `DELETE /grocery/api/groceries/:id/` - Eliminar producto
- `GET /grocery/api/categories/` - Listar categorías
- `GET /grocery/generate-pdf/:id/` - Generar y descargar PDF para un producto específico

> Nota: Ajusta las URLs base en `src/api/request.js` si tu backend corre en otra ruta o puerto.

## Instalación y ejecución (desarrollo)

1. Instala dependencias:

```bash
cd Crud-frontend
npm install
```

2. Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

3. Abre `http://localhost:3000` (o la URL que indique Vite).

### Variables a revisar

- `src/api/request.js` contiene las `baseURL` para las llamadas. Asegúrate de que apunten a tu backend (ej. `http://127.0.0.1:8000`).

## Cómo descargar un PDF de producto

El frontend hace una petición a un endpoint que devuelve el PDF de un producto y recibe un blob. El código de ejemplo usa Axios con `responseType: 'blob'` y crea un `ObjectURL` para descargar o mostrar el PDF.


## Manejo de errores y CORS

- Si el frontend y backend corren en orígenes distintos, habilita CORS en el backend y configura los orígenes permitidos para los entornos donde desplegues.
- Las llamadas a la API deben manejar errores y mostrar mensajes al usuario (por ejemplo, usando `react-hot-toast`).

## Buenas prácticas y notas

- Mantén las URLs de la API en `src/api/request.js` para fácil configuración.
- Usa `CategoriesContext` (o un proveedor global) para compartir datos como la lista de categorías entre vistas.
- Libera los `ObjectURL` creados con `URL.revokeObjectURL(url)` cuando ya no se necesiten.

## Troubleshooting (problemas comunes)

- 404 al descargar PDF: revisa que la ruta exista en el backend y que el id enviado sea válido.
- Network Error / CORS: configura `django-cors-headers` y permisos adecuados.
- `undefined` en la URL de descarga: asegúrate de pasar un `id` válido desde el componente que hace la petición.

## Contribuir

Si quieres mejorar la UI o añadir funcionalidades, crea una rama, agrega tests mínimos y abre un PR con una descripción clara de los cambios.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

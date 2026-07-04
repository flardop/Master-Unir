# Actividad 5 - Sistema Blogging en Angular

Este proyecto resuelve la actividad del modulo: crear una SPA en Angular con un componente `blog` que permita publicar noticias desde un formulario y mostrarlas en un listado dentro del mismo componente.

## Lo que ya incluye el proyecto

- Componente `blog` cargado en la aplicacion principal.
- Dos noticias iniciales dentro de un array.
- Pintado dinamico del listado con `*ngFor`.
- Formulario con campos obligatorios:
  - titulo
  - imagen
  - texto
  - fecha
- Validacion para impedir insertar noticias vacias.
- Insercion de nuevas noticias al principio del array.
- Diseno responsive para escritorio y movil.
- Workflow de GitHub Actions para compilar el proyecto automaticamente.

## Estructura importante

- `src/app/app-module.ts`: importa `FormsModule` y declara los componentes.
- `src/app/blog/blog.ts`: logica del componente, array de noticias y funcion `agregarNoticia`.
- `src/app/blog/blog.html`: formulario y listado de noticias.
- `src/app/blog/blog.css`: estilos de la actividad.

## Requisitos

- Node.js LTS 22 o 24.
- pnpm 11 o superior.

No uses Node 23, porque Angular 20 no lo soporta oficialmente y puede dar errores o quedarse bloqueado.

## Como ejecutar el proyecto

1. Abre una terminal dentro de esta carpeta:

```bash
cd sistema-blogging-angular
```

2. Instala dependencias:

```bash
pnpm install
```

3. Arranca el servidor:

```bash
pnpm start
```

4. Abre el navegador en:

```text
http://localhost:4200
```

## Como defender la actividad paso a paso

1. `Creacion del proyecto`
   - Se ha creado una app Angular llamada `sistema-blogging-angular`.

2. `Creacion del componente blog`
   - Se genero el componente `blog`.
   - Se cargo dentro de `app.html` usando `<app-blog></app-blog>`.

3. `Maquetacion`
   - El componente tiene dos zonas:
     - formulario de nueva noticia
     - listado de noticias

4. `Array de datos`
   - En `blog.ts` existe un array `noticias` con dos noticias iniciales.

5. `Pintado del array`
   - En `blog.html` se usa `*ngFor` para recorrer y mostrar cada noticia.

6. `Recogida de datos del formulario`
   - Se usa `ngForm` y `[(ngModel)]` para comunicar HTML y TypeScript.

7. `Validacion`
   - La funcion `agregarNoticia()` comprueba que ningun campo este vacio.
   - Si falta algun dato, se muestra un mensaje y no se inserta la noticia.

8. `Insercion en el array`
   - Si todo esta correcto, la noticia se inserta con `unshift()` para que aparezca la primera.

## Pasos recomendados para GitHub

Hazlo desde la carpeta del proyecto, no desde una carpeta superior con mas actividades.

1. En GitHub crea un repositorio publico, por ejemplo:
   - `actividad-5-blog-angular`

2. En terminal entra al proyecto:

```bash
cd sistema-blogging-angular
```

3. Inicializa Git:

```bash
git init
git branch -M main
```

4. Haz el primer commit:

```bash
git add .
git commit -m "feat: crear sistema blogging en Angular"
```

5. Conecta tu repositorio de GitHub:

```bash
git remote add origin https://github.com/TU-USUARIO/actividad-5-blog-angular.git
```

6. Sube el proyecto:

```bash
git push -u origin main
```

## Commits recomendados para que se vea el progreso

Si quieres que el profesor vea bien el control de versiones, puedes hacerlo con varios commits:

1. `chore: crear proyecto Angular`
2. `feat: crear componente blog`
3. `feat: maquetar formulario y listado`
4. `feat: agregar noticias iniciales`
5. `feat: validar formulario e insertar noticias`
6. `docs: actualizar README de la actividad`

## Entrega final

Debes entregar dos cosas:

1. El enlace publico del repositorio de GitHub.
2. Un archivo `.zip` del proyecto sin la carpeta `node_modules`.

Para crear el ZIP:

1. Cierra el servidor si lo tienes abierto.
2. Borra `node_modules` si quieres aligerar el peso:

```bash
rm -rf node_modules
```

3. Comprime la carpeta `sistema-blogging-angular`.

## Verificacion

El proyecto se ha compilado correctamente con:

```bash
pnpm run build
```

# Registro de Jornada IA — carpeta lista para GitHub Pages

Esta carpeta es el sitio completo, lista para subir tal cual a GitHub Pages.
Incluye la app (`index.html`), el ícono para la pantalla de inicio del celular
(`icons/`), el manifiesto de instalación (`manifest.webmanifest`) y un
service worker (`sw.js`) para que se pueda "instalar" como app.

No necesitas servidor, backend ni build: todo es HTML/CSS/JS estático.

## Contenido

```
index.html                    ← la app (un solo archivo)
manifest.webmanifest          ← nombre, colores e íconos para "Agregar a inicio"
sw.js                         ← permite instalar la app y abrir el cascarón sin conexión
icons/                        ← íconos (reloj azul) en todos los tamaños necesarios
.nojekyll                     ← evita que GitHub procese el sitio con Jekyll
README.md                     ← este archivo
```

## 1. Crear el repositorio en GitHub

1. Entra a [github.com/new](https://github.com/new).
2. Ponle un nombre, por ejemplo `registro-jornada-ia`.
3. Puede ser **público** (Pages gratis) o **privado** (Pages requiere un plan de
   pago para repos privados). No hay nada sensible en el código: las
   credenciales, el secreto OTP y los datos de cada persona se generan y se
   guardan solo en el navegador de quien usa la app, nunca en el repositorio.
4. No marques "Add a README" (ya traes uno). Crea el repositorio vacío.

## 2. Subir el contenido de esta carpeta

### Opción A — desde el navegador (sin usar terminal)

1. Abre tu repositorio nuevo en GitHub.
2. Haz clic en **"uploading an existing file"** (o el botón **Add file → Upload files**).
3. Arrastra **todo el contenido** de esta carpeta (no la carpeta en sí: los
   archivos y subcarpetas que están dentro) a la ventana de GitHub. Debes ver
   subir `index.html`, `manifest.webmanifest`, `sw.js`, `.nojekyll`,
   `README.md` y la carpeta `icons/` con sus archivos.
4. Baja y haz clic en **Commit changes**.

### Opción B — con git (línea de comandos)

Desde la carpeta que descomprimiste:

```bash
git init
git add -A
git commit -m "Publica Registro de Jornada IA"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git push -u origin main
```

## 3. Activar GitHub Pages

1. En el repositorio, ve a **Settings** (⚙️) → **Pages** (menú izquierdo, bajo
   "Code and automation").
2. En **Build and deployment → Source**, elige **"Deploy from a branch"**.
3. En **Branch**, elige `main` y la carpeta `/ (root)`. Guarda.
4. Espera 1–2 minutos. GitHub construye el sitio (verás una marca verde ✅ en
   la pestaña **Actions** cuando termine).
5. En esa misma página de **Settings → Pages** aparecerá la URL pública, algo
   como:

   ```
   https://TU_USUARIO.github.io/TU_REPOSITORIO/
   ```

## 4. Abrir la app y agregarla a la pantalla de inicio

Abre esa URL **desde el navegador del celular** (tiene que ser `https://`,
que es lo que GitHub Pages da automáticamente; la cámara y el GPS no
funcionan sin HTTPS).

**Android (Chrome):**
1. Abre la URL.
2. Toca el menú ⋮ (arriba a la derecha).
3. Toca **"Instalar app"** o **"Agregar a pantalla de inicio"** (el texto
   varía según la versión de Chrome).
4. Confirma. El ícono azul del reloj aparecerá en tu pantalla de inicio y la
   app abrirá en su propia ventana, sin la barra del navegador.

**iPhone/iPad (Safari):**
1. Abre la URL en Safari (tiene que ser Safari; otros navegadores en iOS no
   permiten "Agregar a inicio" con ícono propio).
2. Toca el botón **Compartir** (el cuadro con la flecha hacia arriba).
3. Toca **"Agregar a pantalla de inicio"**.
4. Confirma. Aparecerá el mismo ícono azul del reloj.

Si el ícono no aparece a la primera (a veces el navegador cachea el ícono
anterior), recarga la página una vez con conexión antes de agregarla a
inicio.

## 5. Actualizar la app más adelante

1. Cambia lo que necesites y vuelve a subir los archivos (Opción A o B).
2. Si cambiaste el **código de la app** (no solo el README), abre `sw.js` y
   sube el número de versión, por ejemplo:

   ```js
   const CACHE = 'jornada-ia-v1';   // cámbialo a 'jornada-ia-v2'
   ```

   Esto evita que los teléfonos que ya instalaron la app se queden viendo una
   versión vieja cacheada. Sin este cambio, de todas formas se actualiza sola
   en segundo plano tras un par de aperturas, pero cambiar la versión lo hace
   inmediato.
3. GitHub Pages vuelve a publicar automáticamente 1–2 minutos después de cada
   `push` o subida.

## Notas importantes

- **Los datos son por dispositivo.** Cada persona que usa la app en su
  celular guarda sus propios registros en el almacenamiento local de su
  navegador (`localStorage`). No hay un servidor compartido: si necesitas que
  RH vea los registros de todo el personal desde un solo lugar, se requiere
  un backend real (este es el siguiente paso natural del proyecto, pero es
  otro alcance).
- **Primera carga con internet.** La primera vez que alguien usa la
  verificación facial, la app descarga ~7 MB de modelos de IA desde una CDN.
  Después de eso el navegador los deja en su caché.
- **Dominio propio (opcional).** Si tienes un dominio, en
  **Settings → Pages → Custom domain** puedes apuntarlo a este sitio.
- **HTTPS es obligatorio.** GitHub Pages lo da automáticamente; no necesitas
  configurar nada para tenerlo.

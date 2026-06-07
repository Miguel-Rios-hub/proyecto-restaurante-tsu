# Proyecto Restaurante

Sistema web de pedidos para restaurante desarrollado como proyecto final de TSU en Desarrollo Móvil Multiplataforma.

## Autores
Miguel Angel Rios Correa
Manuel Jimenez Cruz.

## ¿Qué hace?

- Registro e inicio de sesión de clientes
- Menú organizado por categorías (mexicana, italiana, postres, bebidas, mariscos)
- Selección de platillo y cocinero
- Carrito de compras y generación de factura
- Cambio de contraseña

## Tecnologías usadas

- **Frontend:** HTML, CSS, Bootstrap 5, JavaScript (vanilla)
- **Backend:** PHP con sesiones
- **Base de datos:** MySQL

## Cómo correrlo localmente

1. Tener instalado XAMPP (o cualquier servidor con PHP y MySQL)
2. Copiar la carpeta del proyecto en `htdocs/`
3. Importar la base de datos usando el script SQL en `php/conexion.php`
4. Entrar a `http://localhost/Proyecto`

## Estructura del proyecto

```
├── php/          # Lógica del servidor
├── java/         # Scripts de JavaScript
├── css/          # Estilos y Bootstrap
├── fotos/        # Imágenes de los platillos
└── *.html        # Páginas del sitio
```

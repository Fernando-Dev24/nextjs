# Descripcion

Este es un ecommerce creado y desarrollado primeramente por Fernando Herrera, el creador de cursos de programacion web. Este proyecto final pertenece al curso de NextJS en su version ^13.0. Este es un proyecto creado para demostrar y practicar todo lo aprendido a lo largo de dicho curso.

# Instalacion

Al momento de abrir este proyecto te recomendamos instalar las dependencias de node para que cree la carpeta node_module. Ejecuta el comando

```
npm install
```

## Ejecutar la aplicacion en dev

1. Clonar el repositorio
2. Crear una copia del archivo `.template.env` y renombrarlo a `.env` y cambiar las bases de entorno por las tuyas propias
3. Instalar dependencias `npm install` 👆
4. Levantar la base de datos. Importante: Tener docker instalado y abierto: `docker compose up -d`
5. Correr las migraciones de Prisma `npx prisma migrate dev`
6. Ejecutar seed `npm run seed`
7. Ejecutar el proyecto en dev `npm run dev`

## Ejecutar en prod

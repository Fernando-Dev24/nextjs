# DEVELOPMENT

Pasos para levantar la app

1. Leventar la base de datos

```
docker compose up -d
```

2. Renombrar .env.template to .env y reemplazar las variables de entorno de usuario y password

3. Ejecutar el seed para [crear la base de datos local](localhost:3000/api/seed)

# Levantar la app

```
npm install
npm run dev
```

# Prisma commando

1. Init Prisma

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

or install Prisma and then run

```
npm prisma init
```

Debido a la nueva forma de trabajar con next-auth/beta de Auth.js el cual ya no es solo para next si no que tiene varios frameworks a su disposicion se ha cambiado la forma de instalar y configurar dicha autenticacion. A continuacion están los pasos para lograr configurarlo de forma correcta

# Configurar Auth.js en su versión 1.2.3

1. Reconstruir modulos de node

```
npm install
```

2. Generar clave secreta

```
npx auth secret
```

Esto crea una nueva llave secreta en .env.local que es la convencion de NextJS sin embargo puedes copiar dicha clave y exportarla en un .env normal si asi lo necesitas

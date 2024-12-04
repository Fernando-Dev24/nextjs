# DEVELOPMENT

Pasos para levantar la app

1. Leventar la base de datos

```
docker compose up -d
```

2. Renombrar .env.template to .env y reemplazar las variables de entorno de usuario y password

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

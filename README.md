<picture>
	<source media="(prefers-color-scheme: dark)" srcset="./assets/images/Logo_Light_No_BG.svg" width="250">
	<img alt="The logo for UpNext" src="./assets/images/Logo_Dark.svg" width="250">
</picture>

## Welcome to UpNext!

UpNext is a service to help keep track of your TV, movies, and videogames, either in personal lists or shared with other users. UpNext is built for people that love to do things together, whether that's with friends or family.

You can try it out for yourself here: https://tv-watch-list.vercel.app/

### Tech Stack

- [Next.js](https://nextjs.org/) <picture><img alt="Logo for NextJS" src="./assets/images/nextjs-icon.svg" width="20"></picture>
- [React](https://react.dev/) <picture><img alt="Logo for ReactJS" src="./assets/images/react-icon.png" width="20"></picture>
- [TypeScript](https://www.typescriptlang.org/) <picture><img alt="Logo for TypeScript" src="./assets/images/ts-icon.png" width="20"></picture>
- [GraphQL](https://graphql.org/) <picture><img alt="Logo for GraphQL" src="./assets/images/graphql-logo.png" width="20"></picture>
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) 🐻
- [Apollo Server](https://www.apollographql.com/) <picture><img alt="Logo for Apollo" src="./assets/images/apollo-icon.png" width="20"></picture>
- [Apollo Client](https://www.apollographql.com/) <picture><img alt="Logo for Apollo" src="./assets/images/apollo-icon.png" width="20"></picture>
- [Next-Auth](https://next-auth.js.org/) <picture><img alt="Logo for Apollo" src="./assets/images/nextauth-icon.png" width="20"></picture>
- [PostgreSQL](https://www.postgresql.org/) <picture><img alt="Logo for Apollo" src="./assets/images/postgres-icon.png" width="20"></picture>
- [Prisma](https://www.prisma.io/) <picture><img alt="Logo for Apollo" src="./assets/images/prisma-icon.png" width="20"></picture>
- [TailwindCSS](https://tailwindcss.com/) <picture><img alt="Logo for Apollo" src="./assets/images/tailwind-icon.png" width="20"></picture>
- [DaisyUI](https://daisyui.com/) <picture><img alt="Logo for Apollo" src="./assets/images/daisy-icon.png" width="20"></picture>
- [RadixUI](https://www.radix-ui.com/) <picture><img alt="Logo for Apollo" src="./assets/images/radix-icon.png" width="20"></picture>

### Getting Started

You will need to configure `env.development.local` and `env.production.local` files using the [example](./.env.example).

> **_NOTE:_** keep the POSTGRES_PRISMA_URL set to "postgresql://test:test@localhost:5432/test?schema=public" for your development env, as that will be the url of the docker container created with the included `docker-compose.yml`

1. Install depencencies
```bash
npm run install
```
2. Start the required Docker containers for postgres and pgadmin
```bash
npm run docker-up
```
5. Start the application
```bash
npm run dev
```
or
```bash
npm run build
```
followed by 
```bash
npm run start
```
to start the application using the production environment

You should now be able to access the application locally at http://localhost:3000

<h1>BackendPattern</h1>

# Intro

This project has been created to explore Node functionalities and backend patterns. The main idea of this project is to be a template project. Then, use it in the future in new projects or to improve current ones I hope you enjoy it and learn something new. [See more here](https://frontend-pattern.vercel.app)

# Project structure

This project uses [Nx](https://nx.dev) to manage the monorepo, including [its structure suggestion](https://nx.dev/more-concepts/applications-and-libraries). So: 

- `apps/*` folder -> See each one as a Node service;
- `libs/model/*` folder -> Database table structure and they access the databases;
- other folders in `libs/*` -> helpers, types, and middleware.

It's possible to see the current project structure by running the following script 
```
yarn graph
```

![Screen Shot 2023-07-18 at 09 18 08](https://github.com/tassioFront/backend-pattern/assets/47509510/eb6a8b5c-2960-4b4c-a108-d91cf54736e2)
Screenshot of the project structure - it might be outdated

# Available Scripts

Using the challenges service as an example, you can run the following scripts (it's possible to do the same at any other project in the repository - See more at [anatomy](#anatomy)). 

Running Challenges service
```
# requires a mongo connection
nx serve challenges
```
Running Challenges tests
```
nx test challenges
```

Running Challenges build
```
nx build challenges
```

... other projects have the same structure. See more at [anatomy](#anatomy)


## Run many projects at the same time

Running tests in all projects

```
yarn test:ci-many
```

Running build in all projects

```
yarn build:ci-many
```

## anatomy

```
nx <target> <project> <...options>
```

You can also run multiple targets:

```
nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

# About author

Hi, I'm Tássio Jordão (TJ), a Chemical with Front-End experience. Actually, I'm a Frontend developer with some Chemistry knowledge. [See more here](https://frontend-pattern.vercel.app/about)

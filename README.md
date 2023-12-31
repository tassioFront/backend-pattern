<h1>BackendPattern</h1>

# Intro

This project has been created to explore Node functionalities and backend patterns. The main idea of this project is to be a template project. Then, use it in the future in new projects or to improve current ones I hope you enjoy it and learn something new. [See more here](https://frontend-pattern.vercel.app)

# Project mentality (read it before moving on)

This project follows a `programmatic pattern`, which means using the project tools to force contributors to follow the pattern instead of creating massive docs that nobody reads, in a nutshell.

To do so, we must create programmatic constraints that will guarantee contributors have been following them, mainly by using: 

- [Nx](https://nx.dev)
- [Eslint](https://eslint.org/)

Nx is used to create the project structure and help contributors to create things automatically as much as possible. That includes [creating new services](#creating-a-new-service), for example.

Eslint is our rules manager. Used to validate pattern definitions programmatically. That includes denying using a serviceA code into a serviceB context, denying controllers to throw 400 errors as it is a middleware responsibility, and so on. [See our custom rules here](https://github.com/tassioFront/backend-pattern/tree/main/eslint-local-rules). See the screenshots to understand:

Importing ChallengeModel at the User controller:

![Screenshot 2023-08-02 at 18 54 49](https://github.com/tassioFront/backend-pattern/assets/47509510/52ca29f6-9093-440a-98c5-f42ae0c44efd)


Throwing a 400 error at a controller:

![Screenshot 2023-08-02 at 18 55 03](https://github.com/tassioFront/backend-pattern/assets/47509510/58eca5b8-6ed0-4144-8d30-d901279a91e9)




We might create an article about it soon, for now, consults the project source code and play it!

OBS: It does not remove the documentation needs (even because this readme is a doc haha), but it reduces the amount and helps contributors to follow the team definitions.

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

# Creating a new service

You must follow the project pattern to create new stuff, including service. Ideally, the project itself must help you to follow them.

Let's create a new service `checkout`. You have 2 options: prompt and VS extension. Both will generate service for you, including database configuration, minimal CRUD routing and controller methods, and the database data structure (model):

## By prompt

Using prompt to help you
```
yarn nx generate @backend-pattern/plugin:service
```

Using the full command
```
yarn nx generate @backend-pattern/plugin:service --name=checkout --no-interactive
```

## By VS code extension

You can either use [Nx Console extension](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) to make it for you: 

![515ff6de282391a5dd2ac0349c6dc261](https://github.com/tassioFront/backend-pattern/assets/47509510/0f8cbc3c-93cc-422b-b812-7bba54bed541)

Generated files example:
![Screenshot 2023-08-02 at 09 44 42](https://github.com/tassioFront/backend-pattern/assets/47509510/f7b6efd5-1e3b-4227-a8c4-9666a96e90dd)

Wanna know how it works? See the [local plugin](https://github.com/tassioFront/backend-pattern/tree/main/libs/plugin) using [Nx generators](https://nx.dev/packages/plugin/generators/generator)

# About author

Hi, I'm Tássio Jordão (TJ), a Chemical with Front-End experience. Actually, I'm a Frontend developer with some Chemistry knowledge. [See more here](https://frontend-pattern.vercel.app/about)

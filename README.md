# PetAPI

Project to learn GraphQL by implementing the [PetStore API](https://petstore3.swagger.io/). 

## Dependencies
npm install apollo-server graphql
npm install --save-dev jest 

## Instructions to Run
node src/index.js
navigate to http://localhost:4000/ for the graphQL playground

Example Query 
```
{
  inventory {
    name
    id
    status
    category {
      name
    }
  }
}
```

Creating a new Pet (also returns the pet)
```
mutation {
  createPet(pet: {name: "Caleb", id: 3, category:{id:1, name:"Dog"}, tags:[],status:pending}) {
    name
    id
  }
}
```

Geting Users
```
{
  users {
    id
    username
    password
  }
}
```

Logging in
```
mutation {
  login(username: "admin", password: "admin") {
    firstName
  }
}
```

Change Password
```
mutation {
  updateUser(user: {id: 1, password: "secure!"}) {
    firstName
  }
}
```

Deleting User
```
mutation {
  deleteUser(username: "admin")
}
```
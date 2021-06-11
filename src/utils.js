// FAKE DATA

const users = [
    {
        id: 1,
        username: 'admin',
        password: 'admin',
        firstName: 'Admin',
        online: false
    },
    {
        id: 2,
        username: 'customer',
        username: 'customer',
        firstName: 'Customer',
        online: false
    }
];

const categories = [
    {
        id: 1,
        name: 'Dog'
    },
    {
        id: 2,
        name: 'Cat'
    }
];

const tags = [
    {
        id: 1,
        name: 'Cute'
    },
    {
        id: 2,
        name: 'Friendly'
    }
]

const pets = [
    {
        id: 1,
        name: 'Oliver',
        category: categories[0],
        tags: [tags[0], tags[1]],
        status: 'available'
    },
    {
        id: 2,
        name: 'James',
        categories: categories[1],
        tags: [tags[0]],
        status: 'sold'
    }
];

const orders = [
    {
        id: 1,
        pet: pets[1],
        quantity: 1,
        shipDate: 'Today',
        status: 'delivered',
        complete: true
    }
];

class UserAPI {
    // Return the one user
    getUserByID({id}) {
        let f = users.filter(u => u.id == id)
        return f.length == 0 ? null : f[0]
    }

    // Attempt to login with the username and password
    attemptLogin({username, password}) {
        let f = users.filter(u => u.username == username && u.password == password)
        if(f.length == 0) return null

        f[0].online = true; // set the online flag
        return f[0]
    }

    // Logout the user given by id
    logout({id}) {
        let f = users.filter(u => u.id == id)
        if(f.length == 0) return "User not Found"

        f[0].online = false; // reset the online flag (currently not checking if they are logged in)
        return "Logged Out " + f[0].firstName
    }

    // Update the given user to this information
    updateUser({user}) {
        let f = users.filter(u => u.id == user.id)
        if(f.length == 0) return null
        Object.assign(f[0], user)
        
        return f[0]
    }

    // Create a new user with the information
    createUser({user}) {
        // assuming the info is fine
        users.push(user)
        return user
    }

    deleteUser({username}) {
        let i = users.findIndex(u => u.username == username)
        if (i == -1) return "User not Found"
        
        
        return "Deleted User " + users.splice(i, 1)[0].firstName
    }

}

class StoreAPI {

    getInventory() {
        return pets
    }

    getOrderByID({id}) {
        let f = orders.filter(o => o.id == id)
        return f.length == 0 ? null : f[0]
    }

    // Return list of Pets
    getPetsByStatus({status}) {
        return pets.filter(p => p.status == status)
    }

    // Return list of pets
    getPetsByTags({tags}) {
        // if there exists a common tag name between 
        return pets.filter(p => p.tags.some(t => tags.map(t2 => t2.name).includes(t.name)))
    }

    // Return a single pet
    getPetByID({id}) {
        let f = pets.filter(p => p.id == id)[0]
        return f.length == 0 ? null : f
    }

    placeOrder({order}) {
        // assuming the info is fine
        orders.push(order)
        return order
    }
    
    removeOrder({id}) {
        let i = orders.findIndex(o => o.id == id)
        if (i == -1) return "Order not Found"
        
        return "Deleted Order of " + orders.splice(i, 1)[0].pet.name
    }

    createPet({pet}) {
        pets.push(pet)
        return pet
    }

    updatePet({pet}) {
        let f = pets.filter(p => p.id == pet.id)
        if(f.length == 0) return null
        Object.assign(f[0], pet)
        
        return f[0]
    }

    deletePet({id}) {
        let i = pets.findIndex(p => p.id == id)
        if (i == -1) return "Pet not Found"
        
        return "Deleted Pet " + orders.splice(i, 1)[0].name
    }

    updatePetStatus({id, name, status}) {
        return this.updatePet({id, name, status})
    }
}


module.exports = {
    UserAPI : UserAPI,
    StoreAPI: StoreAPI
}
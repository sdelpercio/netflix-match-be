const users = [];

const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => user.room === room && user.name === name);
    if(existingUser) {
        return { error: "Username is taken" }
    } else {
        const user = { id, name, room };

        user.push(user);
        return { user }
    }
}

const removeUser = () => {
    
}

const getUser = () => {
    
}

const getUsersInRoom = () => {
    
}
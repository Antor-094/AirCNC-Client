// save user to database

export const saveUer = user => {

    const currentUser = {
        email: user.email
    }

    fetch(`${import.meta.env.VITE_API_URL}/users/${user?.email}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(currentUser)
    }).then(res => res.json()).then(data => console.log(data))
}

// Become host
export const becomeHost = email => {

    const currentUser = {
        role: 'host'
    }

   return fetch(`${import.meta.env.VITE_API_URL}/users/${email}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(currentUser)
    }).then(res => res.json())
}


//Get role of the user

export const getRole = async email =>{

   const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${email}`)

   const user = await response.json()
   return user?.role 
}
const laravelApi = 'http://localhost:81';

        //comprobar si el usuario ya ha iniciado sesion antes
        // async function comprobarToken(){
        //     try {
        //         let respuesta = await fetch(laravelApi + "/api/comprobarToken", {
        //             method: "POST",
        //             headers: {
        //                 "Content-type": "application/json; charset=UTF-8",
        //                 Authorization: 'Bearer ' + sessionStorage.getItem("token")
        //             }
        //         });

        //     let data = await respuesta.json();
        //     console.log(data);

        //     } catch (error) {
        //         console.error(error);
        //     }
        // }

        // if(sessionStorage.getItem("token") != null){
        //     comprobarToken();
        // }
        //fin comprobacion sesion del usuario

        async function login(correo, contrasena) {

            try {
                let respuesta = await fetch(laravelApi + "/api/auth/login", {
                    method: "POST",
                    body: JSON.stringify({
                        email: correo,
                        password: contrasena,
                        remember_me: 'yes'
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                });

                let data = await respuesta.json();
                console.log(data);

            } catch (error) {
                console.error(error);
            }
        }

        async function register(nombre, correo, contrasena) {

            try {
                let respuesta = await fetch(laravelApi + "/api/auth/signup", {
                    method: "POST",
                    body: JSON.stringify({
                        name: nombre,
                        email: correo,
                        password: contrasena
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                });

                let data = await respuesta.json();
                console.log(data);

            } catch (error) {
                console.error(error);
            }
        }

        async function logout(){
            try {
                let respuesta = await fetch(laravelApi + "/api/logout", {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        Authorization: 'Bearer ' + sessionStorage.getItem("token")
                    }
                });
                
                let data = await respuesta.json();
                console.log(data);

            } catch (error) {
                console.log(error);
            }
        }
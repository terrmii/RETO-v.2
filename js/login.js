const laravelApi = 'http://localhost:81';

        async function login(correo, contrasena) {

            try {
                let respuesta = await fetch(laravelApi + "/api/auth/login", {
                    method: "POST",
                    body: JSON.stringify({
                        email: correo,
                        password: contrasena,
                        remember_me: true
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        'X-Requested-With': 'XMLHttpRequest',
                        'Access-Control-Allow-Origin': '*'
                    }
                });
                let data = await respuesta.json();
                console.log(data);
                console.log("El mail es: " + data["mail"]);

                // Al logearse
                if (data["access_token"] != null) {
                    console.log("Cerrando el modal");
                    var modal = document.getElementById('inicioSesionModal');
                    ocultar(modal);
                    
                    // Ocultar el fondo del modal (modal-backdrop)
                    var modalFondo = document.getElementsByClassName('modal-backdrop');
                    
                    // Recorre todos los elementos con la clase 'modal-backdrop'
                    for (var i = 0; i < modalFondo.length; i++) {
                        ocultar(modalFondo[i]);
                    }

                    var inicioSesion = document.getElementById('botonInicioSesion');

                    ocultar(inicioSesion);

                    var registro = document.getElementById('botonRegistro');

                    ocultar(registro);

                    var mailLogueado = document.getElementById('mailLogueado');

                    // Dividir la cadena en dos partes usando el carácter "@"
                    var partes = data["mail"].split("@");

                    // Tomar la primera parte (el nombre antes de "@")
                    var nombre = partes[0];

                    // Bienvenida al usuario
                    mailLogueado.innerHTML = 'Bienvenido, '+nombre;
                }
                

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

        // Ocultar cosas

        function ocultar(i){
            i.style.display = 'none';
        }
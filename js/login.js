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

                // Al logearse
                if (data["access_token"] != null) {
                    
                    ocultarModal();

                    var mailLogueado = document.getElementById('mailLogueado');

                    var partes = data["mail"].split("@");

                    var nombre = partes[0];

                    sessionStorage.setItem("AccessToken", data["access_token"]);
                    
                    // Mostrar boton logout
                    var botonLogout = document.getElementById('botonLogout');

                    botonLogout.style.display = 'inline-block';

                    // Bienvenida al usuario
                    mailLogueado.innerHTML = 'Bienvenido, <b>'+nombre+'</b>';

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
                        "Content-type": "application/json; charset=UTF-8",
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });

                let data = await respuesta.json();
                // console.log(data);

                if([data["message"] == 'Successfully created user!']){

                    login(data["mail"], data["password"]);
                    
                }

            } catch (error) {
                console.error(error);
            }
        }

        async function logout(){
            try {
                let respuesta = await fetch(laravelApi + "/api/auth/logout", {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        'X-Requested-With': 'XMLHttpRequest',
                        Authorization: 'Bearer ' + sessionStorage.getItem("AccessToken")
                    }
                });
                
                let data = await respuesta.json();
                console.log(data);

                sessionStorage.removeItem("AccessToken");

            } catch (error) {
                console.log(error);
            }
        }

        // Ocultar cosas

        function ocultar(i){
            i.style.display = 'none';
        }

        function ocultarModal(){
            console.log("Cerrando el modal");
            var modalInicioSesion = document.getElementById('inicioSesionModal');

            var modalRegistro = document.getElementById('registroModal');

            ocultar(modalInicioSesion);

            ocultar(modalRegistro);
            
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
        }
## This project was created with nodejs and express also I used mongoDB

### Hacer un REST API que contenga endpoints para las siguientes acciones:
1. Registrar un usuario que contenga la siguiente información además de sus credenciales de 1 a 2 películas favoritas.
2. Cambiar películas favoritas.
3. Obtener todas las películas únicas registradas
4. Sugerir un amigo: de manera aleatoria regresar un nombre de usuario de alguno que coincida con almenos una película.
5. Agregar amigo a mi lista.
6. Ver lista de amigos.
7. Eliminar amigos de mi lista
8. Borrar mi cuenta.
9. Ver perfil de su amigo (lista de amigos y películas favoritas).

### Restricciones:

- Al registrar usuario regresar lista de sugerencia de amigos que coincidan con las 2 películas favoritas al mismo tiempo.
- Es obligatoria almenos tener una película Favorita.
- A partir del punto 2 los requests deben usar cualquier método de autenticación.
- No se pueden agregar más de 2 películas favoritas
- Cambiar las películas tiene una restricción de 1 minuto de diferencia desde la ultima modificación, de lo contrario regresar un error.
- Solo puedes agregar amigos que tengan una coincidencia de película de lo contrario regresar un error.
- Ver el perfil de amigos debe estar restringido a aquellos que son realmente tus amigos.
- Cualquier coincidencia por película debe ser 'case-insensitive.
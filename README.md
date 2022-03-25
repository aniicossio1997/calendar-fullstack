# Calendar-fullstack

### Librerias del Backend:

- node
- express
- typescript
- mongoose
- mongoDB
- moment

### Librerias del Frontend:

- React
- redux | redux-toolkit
- chakra-ui
- formik | yup
- react-datetime-picker
- moment
- react-icons-

### API
----------


| Method |Auth  | Descripción| Respuesta
|--|--|--| -----|
| POST | /api/auth/login | Crea una nueva sesión para el usuario, para esto se le debe mandar un body con el `email y password` y se generara un token  |
| POST | /api/auth/me: | Verifica si el usuario esta autentificado. En los header se le debe mandar Authorization: Bearer token |

----
|         Method       |  Usuarios | Descripción  | Respuesta  | 
|----------------|-------------------------------|-----------------------------|------
|GET        |api/users     |Devuelve todos los usuarios |  |
|POST       | api/users         | Crea un usuario nuevo, el usuario necesita un ` name, email(debe ser unico) y un password(como minimo 4 caracteres)`    |Devuelve 200(ok:true) si se creo correctamente. Caso contrario   devuelve un 400( y un mensaje indicando porque fallo).  
|PUT        |api/users/:id        |Modifica un usuario, se debe contar con el token y mandarlo en los headers  ```Authorization: Bearer token ```   | 
|GET        |api/users/:id        |Devuelve un usuario con ese ID si existe |

----------


| Method |Eventos  | Descripción| Respuesta
|--|--|--| -----|
| GET | /api/users/:user/events | Devuelve todos los eventos dr un usuario |
| POST | /api/users/:user/events | Crea un evento para un usuario  |
| PUT | /api/users/:user/events/:id | Modifica un evento perteneciente a un usuario |
| DELETE | /api/users/:user/events/:id | Elimina un evento perteneciente a un usuario |

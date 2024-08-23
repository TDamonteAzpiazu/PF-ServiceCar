# Acá van a estar todas las rutas con lo que hacen y lo que necesitan para funcionar.

# Auth 

## Sign in(**POST**)
http://localhost:3001/auth/signin

Recibe por body:
```json
{
    "email": "admin@example.com",
    "password": "Password1!"
}
```
Retorna:
```json
{
    "success": "Autenticación exitosa",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YWFhYWIzNS0zNzhmLTQxYTItYmM3YS1mOWQ0ZGI2OTNlOTgiLCJpZCI6IjlhYWFhYjM1LTM3OGYtNDFhMi1iYzdhLWY5ZDRkYjY5M2U5OCIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE3MjQ0MzEzMzcsImV4cCI6MTcyNDQzNDkzN30.Qs4bfgZ2wJG-32IdYTZBJgy28D5OnoQJ78u9dmioqA0"
}
```

## Sign up(**POST**)
http://localhost:3001/auth/signup

Recibe por body:
```json
{
  "name": "Juan",
  "email": "juan@mail.com",
  "password": "Password1!",
  "repeatPassword": "Password1!",
  "address": "Calle 123"
}
```
Retorna:(todo el usuario menos password)
```json
{
  "id": "0dfd90d4-ac01-412a-895e-63f6e50794b9",
  "name": "Tobo",
  "email": "juan@mail.com",
  "address": "Calle 123",
  "image": "https://res.cloudinary.com/dc8tneepi/image/upload/ztbuutsulfhoarq63xsh.jpg",
  "role": "user",
  "status": "active"
}
```

# Users
## **Get** all users (SOLO ADMIN)
http://localhost:3001/users

Recibe token de admin por Bearer.

Retorna un array con usuarios.
## **Get** user by ID
http://localhost:3001/users/9aaaab35-378f-41a2-bc7a-f9d4db693e98

"9aaaab35-378f-41a2-bc7a-f9d4db693e98" Se reemplaza por algun id en su bdd.

Recibe token cualquiera por Bearer.

Retorna el objeto User:
```json
{
    "id": "9aaaab35-378f-41a2-bc7a-f9d4db693e98",
    "name": "Admin",
    "email": "admin@example.com",
    "password": "$2a$10$LfhXa2YsKAM7AFy/gD8gDumMP9K28e3FaukOTZw.WPwW8afJ8YVgW",
    "address": "Calle falsa 123",
    "image": "https://res.cloudinary.com/dc8tneepi/image/upload/ztbuutsulfhoarq63xsh.jpg",
    "role": "admin",
    "status": "active",
    "appointments": []
}
```
## **PUT** by ID
http://localhost:3001/users/a0f1d1cb-a7e6-4859-ada8-acfa782f6136

"a0f1d1cb-a7e6-4859-ada8-acfa782f6136" Se reemplaza por algun id en su bdd.

Recibe token cualquiera por Bearer por body los campos a modificar(Puede recibir todos o solo uno, da lo mismo)
```json
{
    "name": "Juan Pérez",
    "email": "juan@mail.com",
    "address": "Calle Falsa 123"
}
```
Retorna el objeto User con los campos actualizados:
```json
{
    "id": "0dfd90d4-ac01-412a-895e-63f6e50794b9",
    "name": "Juan Pérez",
    "email": "juan@mail.com",
    "password": "$2a$10$xhzb/Uu/p.F9EoS7iPF8kuP.0ZslH8N6D.NXL.J6.9DbEpcpVx/yu",
    "address": "Calle Falsa 123",
    "image": "https://res.cloudinary.com/dc8tneepi/image/upload/ztbuutsulfhoarq63xsh.jpg",
    "role": "user",
    "status": "active",
    "appointments": []
}
```
## Delete by id(ES UNA PETICIÓN **PUT** )
http://localhost:3001/users/delete/a0f1d1cb-a7e6-4859-ada8-acfa782f6136

"a0f1d1cb-a7e6-4859-ada8-acfa782f6136" Se reemplaza por algun id en su bdd.

Recibe token cualquiera por Bearer

Retorna:
```json
{
    "message": "User deleted successfully",
    "user": {
        "id": "a0f1d1cb-a7e6-4859-ada8-acfa782f6136",
        "name": "Tobias",
        "email": "tobo@mail.com",
        "password": "$2a$10$TpF3TZJpgZKwcsT.ItzU9OyWqDTdaL.Vq91xB1v3eJfUkIvFfaTlC",
        "address": "Calle 123",
        "image": "http://res.cloudinary.com/dwyboceie/image/upload/v1724430637/kymfjayk1jyniqeorvej.webp",
        "role": "user",
        "status": "inactive",
        "appointments": []
    }
}
```
# Cloudinary
## **POST** User Image
http://localhost:3001/cloudinary/userImage/a0f1d1cb-a7e6-4859-ada8-acfa782f6136

"a0f1d1cb-a7e6-4859-ada8-acfa782f6136" Se reemplaza por algun id en su bdd.

Recibe el archivo que se va a subir

Retorna el objeto User actualizado.
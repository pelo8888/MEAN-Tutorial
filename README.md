MEAN Stack Game
=======================

Esta aplicacion utiliza el stack MEAN (Mongo - Express - Angular - Node) y Bower como manejadro de dependencias para el frontEnd, por lo tanto lo primero que debemos hacer para tenerlo completamente funcional, es asegurarse de tener Mongo, nodeJS y bower instalados.

### Instalando node_modules
Una vez seguros de tener las dependencias anteriormente mencionadas, entramos al root del projecto y ejecutamos el comando:

```javascript
npm install
```

este comando descargara todas las dependencias internas del proyecto.

### Instalando bower_components
En el root del projecto ejecutamos el comando:

```javascript
bower install
```

este comando descargara todas las dependencias de frontend (angular, bootstrap, etc).


### Run server
Una vez finalizado vamos a ejecutar el comando

```javascript
npm start
```

para comenzar la ejecucion en modo debug.

## Configuration

### Agregando armas

Para cambiar las opciones de ataque disponibles debemos editar el archivo 'conf/options.json'
Agregando cada arma con el siguiente formato:

```javascript
{
  'name': 'Atomic_bomb',
  'kills': 'Rock'
}
```

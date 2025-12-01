# Impostorcitos

Juego simil Among us pero con palabras. Consiste en un juego multijugador en el cual se les dice a todos una palabra
exceptuando a uno, designado como impostor, al cual se le da como ayuda solamente el topico al cual pertenece la palabra.
Cuando comienza una ronda, los jugadores tendran que decir una nueva palabra que este relacionada a la palabra designada
por el juego. Al final de cada ronda, los jugadores tendran un espacio para discutir acerca de quien puede
llegar a ser el impostor, y luego deberan votar para expulsar a alguno.

El juego termina cuando se expulsa al impostor, o cuando quedan 2 jugadores, siendo 1 de ellos el impostor.

## Dinamica del juego
### Login
Bueno en realidad no hay login. Lo voy a agregar mas adelante eso.
Al ingresar a la aplicacion, debemos ingresar un nombre.
Se mostrara luego en pantalla una lista de salas creadas, con la opcion de unirse a una de ellas o de crear una.

### Creacion de salas
Al crear una sala se puede configurar:
- la cantidad de jugadores permitida
- Privacidad: Publica o privada
- Tiempo para escribir una palabra
- Tiempo de discusion
- Tiempo para votar a un jugador
- En un futuro vamos a configurar cantidad de impostores.

### Ingreso a la sala
En la sala se podra chatear con los diferentes jugadores que vayan ingresando. Cada jugador marcara la opcion "Ready" 
para indicar que esta listo para dar comienzo al juego. Cuando todos los jugadores esten listos, el juego comenzara.

### Comienzo del juego
Hay diferentes topicos sobre los cuales elegir palabras. El juego eligira de forma random un topico y la mostrara en pantalla.
Luego, a cada jugador, le indicara una palabra dentro de ese topico, exceptuando al impostor.
Finalmente se da por comenzada la primera ronda del juego

### Rondas
En cada ronda, cada jugador un tiempo para escribir una palabra, la cual podra ser leida por todos los jugadores 
durante esa ronda.
- Si el jugador no escribe ninguna palabra, contara como una palabra vacia

Al final, se abrira un espacio de discusion donde los jugadores podran debatir acerca de la eleccion de las palabras de
cada jugador, y llegar a un acuerdo sobre quien sera el siguiente expulsado.

Finalmente, se abre un espacio para elegir a un candidato a ser eliminado.
- En caso de haber empate, se reabre este espacio para volver a votar entre los mismos

### Condicion de victoria
- Si se elimina al impostor, gana el resto de los jugadores
- Si el impostor llega vivo hasta el final del juego, quedando solamente 2 jugadores, gana el impostor

## Flujo de pantallas
[Link al diagrama de flujo]

## Modelo de datos
[Link al modelo de datos]

## Getting started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the resul

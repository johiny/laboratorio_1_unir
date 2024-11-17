import { useState, useEffect } from "react";
import "./App.css";

function HotAndColdNumber() {
  // aqui creo un numero ramdom de 0 1 100 mil
  const dificultad = 100000;
  const [secretNumber, setSecretNumber] = useState(
    Math.round((1000 + Math.random() * dificultad) / 10) * 10
  );

  // esta es la variable que guarda el valor del input y lo mantiene actualizado
  const [value, setValue] = useState("");
  // variable que guarda los intentos del usuario
  const [intentos, setIntentos] = useState([]);
  //variable que guarda el numero de intentos que le quedan al usuario empezando en 15
  const [intentosRestantes, setIntentosRestantes] = useState(15);

  // el use effect actual como un lsitener para ejecutar cierto codigo cuando una variable cambia
  useEffect(() => {
    if (intentosRestantes === 15) {
      return;
    }
    if (intentosRestantes === 0) {
      alert(
        "«Mal, este juego no es para ti» el número secreto era: " + secretNumber
      );
      // vuelvo a reiniciar las variables de intentos restantes, intentos y secretNumber para reiniciar el juego
      setIntentosRestantes(15);
      setIntentos([]);
      Math.round((1000 + Math.random() * dificultad) / 10) * 10;
    }
    if (value == secretNumber) {
      alert(
        "Felicidades has ganado, el número secreto era: " +
          secretNumber +
          " eres increible!"
      );
      // reinicio el juego
      setIntentosRestantes(15);
      setIntentos([]);
      Math.round((1000 + Math.random() * dificultad) / 10) * 10;
    }
  }, [intentosRestantes]);

  useEffect(() => {
    console.log(
      "ah con que muy hacker, como recompensa aqui esta el numero secreto:",
      secretNumber
    );
  }, []);

  const verifyNumber = () => {
    let pista = "";
    if (value > secretNumber) {
      if (value - secretNumber > 50000) {
        pista = "estas muy arriba y helado, te estas congelando";
      } else if (value - secretNumber > 10000) {
        pista = "estas muy por arriba y bastante frio";
      } else if (value - secretNumber > 1000) {
        pista = "estas por arriba y frio";
      } else if (value - secretNumber > 100) {
        pista = "estas por arriba y tibio";
      } else if (value - secretNumber >= 10) {
        pista = "estas por arriba y bastante caliente";
      }
    } else if (value < secretNumber) {
      if (secretNumber - value > 50000) {
        pista = "estas muy abajo y helado, te estas congelando";
      } else if (secretNumber - value > 10000) {
        pista = "estas muy por abajo y bastante frio";
      } else if (secretNumber - value > 1000) {
        pista = "estas por abajo y frio";
      } else if (secretNumber - value > 100) {
        pista = "estas por abajo y tibio";
      } else if (secretNumber - value >= 10) {
        pista = "estas por abajo y bastante caliente";
      }
    }
    return "con el numero: " + value + " " + pista;
  };

  const handleEnter = () => {
    // verifico a ver que tan lejos esta el numero ingresado del numero secreto
    const pista = verifyNumber();

    // aqui agrego el intento a la lista de intentos y actualizo los intentos restantes
    setIntentos([...intentos, pista]);
    setIntentosRestantes(intentosRestantes - 1);
  };

  return (
    <>
      <div className="container">
        <h1>Hot And Cold!</h1>
        <h2>Descubre el número secreto yendo hacia arriba o hacia abajo</h2>
        <h3>Ojo solo tienes {intentosRestantes} intentos</h3>
        <div className="container__intentos">
          {intentos.map((intento, index) => (
            <p key={index}>{intento}</p>
          ))}
        </div>
        <p>
          Ingresa un número de 0 a 10000 mil!
          <br /> podrás encontrarlo entre tantas posibilidades?!
        </p>
        <input
          value={value}
          type="number"
          min="0"
          max="1000000"
          onChange={(e) => setValue(parseInt(e.target.value))}
        />
        <button onClick={handleEnter}>Intentar</button>
      </div>
    </>
  );
}

export default HotAndColdNumber;

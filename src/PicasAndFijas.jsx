import { useState, useEffect } from "react";
import "./App.css";

function PicasAndFijas() {
  // aqui creo un numero ramdom de 4 cifras, y lo convierto en string para mas adelante
  const [secretNumber, setSecretNumber] = useState(
    Math.floor(1000 + Math.random() * 9000).toString()
  );

  // esta es la variable que guarda el valor del input y lo mantiene actualizado
  const [value, setValue] = useState("");
  // variable que guarda los intentos del usuario
  const [intentos, setIntentos] = useState([]);
  //variable que guarda el numero de intentos que le quedan al usuario empezando en 12
  const [intentosRestantes, setIntentosRestantes] = useState(12);
  const winnerMessage =
    "Felicidades has ganado, el número secreto era: " + secretNumber + " ";
  // el use effect actual como un lsitener para ejecutar cierto codigo cuando una variable cambia
  useEffect(() => {
    if (intentosRestantes === 12) {
      return;
    }
    if (intentosRestantes === 0) {
      alert(
        "«Mal, este juego no es para ti» el número secreto era: " + secretNumber
      );
    }
    if (value == secretNumber) {
      if (intentosRestantes >= 10) {
        alert(
          winnerMessage +
            "«Excelente, eres un maestro estas fuera del alcance de los demás»"
        );
      } else if (intentosRestantes >= 8) {
        alert(winnerMessage + "«Muy bueno, puedes ser un gran competidor»");
      } else if (intentosRestantes >= 4) {
        alert(
          winnerMessage + "«Bien, estas progresando debes buscar tus límites»"
        );
      } else if (intentosRestantes >= 2) {
        alert(winnerMessage + "«Regular, Aún es largo el camino por recorrer»");
      }
      // reinicio el juego
      setIntentosRestantes(12);
      setIntentos([]);
      setSecretNumber(Math.floor(1000 + Math.random() * 9000).toString());
    }
  }, [intentosRestantes]);

  useEffect(() => {
    console.log(
      "ah con que muy hacker, como recompensa aqui esta el numero secreto:",
      secretNumber
    );
  }, []);

  const verifyNumber = () => {
    // aqui convierto el valor secreto que esta en string a un array de numeros, para poderlo iterar más facil
    const secretNumberArray = secretNumber.split("");
    // aqui igual con el valor introducido por el usuario
    const valueArray = value.split("");

    // aqui creo las variables que guardaran las picas y fijas
    let picas = 0;
    let fijas = 0;

    // aqui itero sobre todos los digitos del valor secreto para compararlos con los digitos del valor introducido por el usuario
    // si coincide exactamente en valor y posicion entonces pam es fija si no, verifica si el array del valor secreto incluye el digito actual que estamos iterando
    // y si esta entonces es pica
    for (let i = 0; i < valueArray.length; i++) {
      if (valueArray[i] === secretNumberArray[i]) {
        fijas++;
      } else if (secretNumberArray.includes(valueArray[i])) {
        picas++;
      }
    }

    // aqui retorno las picas y fijas
    return { picas, fijas };
  };

  const handleEnter = () => {
    // si no es igual entonces verifico las picas y fijas
    const { picas, fijas } = verifyNumber();

    // aqui agrego el intento a la lista de intentos
    setIntentos([...intentos, { value, picas, fijas }]);
    setIntentosRestantes(intentosRestantes - 1);
  };

  // esta funcion se activa cada vez que cambia el input y verifica que el valor no este vacio o sobre pase los limites de 0 a 9999,
  // si el valor no es valido, no hace nada y deja el valor anterior
  const handleChange = (e) => {
    const newValue = e.target.value;

    // verifica que el valor sea un número de 4 cifras, entre 0 a 9999
    if (
      newValue === "" ||
      (/^\d{1,4}$/.test(newValue) && newValue >= 0 && newValue <= 9999)
    ) {
      setValue(newValue);
    }
  };

  // esto agrega ceros cuando se quita el focus del input, por si el usuario puso un numero digamos 01 le agregara los 2 ceros faltantes para que quede bonito
  const handleBlur = () => {
    setValue(value.padStart(4, "0"));
  };

  return (
    <>
      <div className="container">
        <h1>Picas y FIjas!</h1>
        <h2>Encuentra el número secreto</h2>
        <h3>Ojo solo tienes {intentosRestantes} intentos más</h3>
        <div className="container__intentos">
          {intentos.map((intento, index) => (
            <div key={index}>
              <p>{intento.value}</p>
              <p>Picas: {intento.picas}</p>
              <p>Fijas: {intento.fijas}</p>
            </div>
          ))}
        </div>
        <p>Ingresa un número de 4 cifras</p>
        <input
          value={value}
          type="number"
          min="0000"
          max="9999"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <button onClick={handleEnter}>Intentar</button>
      </div>
    </>
  );
}

export default PicasAndFijas;

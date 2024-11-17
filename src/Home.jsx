import "./App.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
<h1>Picas y Fijas, Hot And Cold
</br>
Johan Sebastian Castillo Mazo
</h1>
      <div className="card-container">
        <Link to="/picasandfijas" className="card">
          <button>Ir a Picas y Fijas</button>
        </Link>
        <Link to="/hotandcold" className="card">
          <button>Ir a Hot And Cold!</button>
        </Link>
      </div>
    </>
  );
}

export default Home;

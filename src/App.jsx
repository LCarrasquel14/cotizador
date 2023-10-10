import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import ImagenCripto from "./assets/imagen-criptos.png";
import Formulario from "./components/Formulario";
import Cotizacion from "./components/contizacion";
import Spinner from "./components/Spinner";

const Imagen = styled.img`
  max-width: 400px;
  margin: 100px auto 0 auto;
  width: 80%;
  display: block;
`;
const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;
const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0;
  }
`;
function App() {
  const [monedasEscogidas, setMonedasEscogida] = useState({});
  const [cotizacion, setCotizacion] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (Object.keys(monedasEscogidas).length > 0) {
      const cotizarcrypto = async () => {
        setCargando(true);
        const { cryptoMoneda, moneda } = monedasEscogidas;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoMoneda}&tsyms=${moneda}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCotizacion(resultado.DISPLAY[cryptoMoneda][moneda]);
        setCargando(false);
      };
      cotizarcrypto();
    }
  }, [monedasEscogidas]);

  return (
    <Contenedor>
      <Imagen src={ImagenCripto} alt="Imagen cotizador" />
      <div>
        <Heading>Cotizador de CriptoMonedas Al Instante</Heading>
        <Formulario setMonedasEscogida={setMonedasEscogida} />
        {cargando ? (
          <Spinner />
        ) : (
          cotizacion.PRICE && <Cotizacion cotizacion={cotizacion} />
        )}
      </div>
    </Contenedor>
  );
}

export default App;

import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Error from "./Error";
import useSelecMonedas from "../Hooks/useSelecMonedas";
import { monedas } from "../Data/Monedas";

const InputSumit = styled.input`
  background-color: #9495ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 30px;
  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;
const Formulario = ({ setMonedasEscogida }) => {
  useEffect(() => {
    const consultarApi = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD";

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      const arrayCrypto = resultado.Data.map((crypto) => {
        const obj = {
          id: crypto.CoinInfo.Name,
          nombre: crypto.CoinInfo.FullName,
        };
        return obj;
      });
      setCrypto(arrayCrypto);
    };
    consultarApi();
  }, []);
  const [crypto, setCrypto] = useState([]);
  const [error, setError] = useState(false);
  const [moneda, SelecMonedas] = useSelecMonedas("Elige tu moneda", monedas);
  const [cryptoMoneda, SelecCryptoMonedas] = useSelecMonedas(
    "Elige tu CryptoMoneda",
    crypto
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([moneda, cryptoMoneda].includes("")) {
      setError(true);
      return;
    }
    setError(false);
    setMonedasEscogida({
      moneda,
      cryptoMoneda,
    });
  };

  return (
    <>
      {error ? <Error>Todos los campos son obligarios</Error> : ""}
      <form onSubmit={handleSubmit}>
        <SelecMonedas />
        {moneda}

        <SelecCryptoMonedas />
        {cryptoMoneda}

        <InputSumit type="submit" value="cotizar" />
      </form>
    </>
  );
};

export default Formulario;

import styled from "@emotion/styled";

const Contenedor = styled.div`
  color: #fff;
  font-family: "Lato", sans-serif;
  display: flex;
  align-items: center;
`;

const Precio = styled.p`
  font-size: 24px;
  span {
    font-weight: 700;
  }
`;

const Info = styled.p`
  font-size: 18px;
  span {
    font-weight: 700;
  }
`;

const Imagen = styled.img`
  width: 120px;
  height: 120px;
`;

const Cotizacion = ({ cotizacion }) => {
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } =
    cotizacion;
  return (
    <Contenedor>
      <Imagen
        src={`https://www.cryptocompare.com${IMAGEURL}`}
        alt="imagen de la cryto"
      />
      <div>
        <Precio>
          El precio actual es de: <span>{PRICE}</span>
        </Precio>
        <Info>
          El precio mas bajo del dia: <span>{HIGHDAY}</span>
        </Info>
        <Info>
          El precio mas bajo del dia: <span>{LOWDAY}</span>
        </Info>
        <Info>
          Varacion las ultimas 24hrs: <span>{CHANGEPCT24HOUR}</span>
        </Info>
        <Info>
          ultima actualizacion: <span>{LASTUPDATE}</span>
        </Info>
      </div>
    </Contenedor>
  );
};

export default Cotizacion;

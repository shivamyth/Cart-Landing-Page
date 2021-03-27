import React, { useState, useEffect } from "react";
import Axios from "axios";

import { random, commerce } from "faker";
import { Container, Col, Row } from "reactstrap";
import CartItem from "./CartItem";

const apiKey = "563492ad6f9170000100000161a0b1d0484b4ba38082a15779ac360c";
const url = "https://api.pexels.com/v1/search?query=laptop&per_page=6&page=1";
const localUrl =
  "https://jsonware.com/json/3631f2ed0b38f18d32387d6c5c92c665.json";

const BuyPage = ({ addInCart }) => {
  const [product, setProduct] = useState([]);

  const fetchPhotos = async () => {
    const { data } = await Axios.get(url, {
      headers: {
        Authorization: apiKey,
      },
    });

    const { photos } = data;
    const allProducts = photos.map((photo) => ({
      smallImage: photo.src.medium,
      tinyImage: photo.src.tiny,
      productName: random.word(),
      productPrice: commerce.price(),
      id: random.uuid(),
    }));

    setProduct(allProducts);
  };

  //   const fetchPhotos = async () => {
  //     const { data } = await Axios.get(localUrl);

  //     const { photos } = data;
  //     const allProducts = photos.map((photo) => ({
  //       smallImage: photo.src.medium,
  //       tinyImage: photo.src.tiny,
  //       productName: random.word(),
  //       productPrice: commerce.price(),
  //       id: random.uuid(),
  //     }));
  //     console.log(allProducts);
  //     setProduct(allProducts);
  //   };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <Container fluid>
      <h1 className="text-primary text-center">Buy Page</h1>
      <Row>
        {product.map((singleProduct) => (
          <Col md={4} key={singleProduct.id}>
            <CartItem product={singleProduct} addInCart={addInCart} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BuyPage;

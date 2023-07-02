import { useEffect, useState } from "react";
import axios from "axios";

// Components
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import PaginationComponent from "../pagination/pagination";

// Styles
import "../../styles/CardsStyles.css";
import styles from "./homebody.module.css";

function Home() {
  const [data, setdata] = useState(null);
  const [selectedPage, setSelectedPage] = useState(2);
  const { cart } = JSON.parse(localStorage.getItem("usuarios"));

  const addToCart = async (cid, pid) => {
    await axios.post(
      `https://ecomercebackend-production.up.railway.app/api/cartsBd/${cid}/product/${pid}`
    );
  };

  useEffect(() => {
    fetch(
      `https://ecomercebackend-production.up.railway.app/api/productsBd/?${
        selectedPage ? `page=${selectedPage}` : ""
      }`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setdata(data);
      });
  }, [selectedPage]);

  console.log(data?.payload);

  return (
    <div className={styles.container}>
      <div className={styles["products-container"]}>
        {data &&
          data.payload.map((element) => (
            <Card className="card" key={element._id}>
              <Card.Img variant="top" src={element.thumbnail} />
              <Card.Body>
                <div>
                  <Card.Title>{element.title}</Card.Title>
                  <Card.Text>{element.description}</Card.Text>
                </div>
                <div>
                  <Card.Text className="card-price">{element.price}</Card.Text>
                  <Button onClick={() => addToCart(cart, element._id)}>
                    Agregar Producto al carrito
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
      </div>
      <div className={styles.paginate}>
        {data && (
          <PaginationComponent
            currentPage={data.page}
            totalPages={data.totalPages}
            onPageChange={(newPage) => setSelectedPage(newPage)}
          />
        )}
      </div>
    </div>
  );
}

export default Home;

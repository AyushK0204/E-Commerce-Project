import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import ProductCard from "./ProductCard";

// Define the ProductList component separately
function ProductList({ products }) {
  // Function to shuffle an array randomly
  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  // Shuffle the products array
  const shuffledProducts = shuffleArray(products);

  return (
    <Fragment>
      {shuffledProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Fragment>
  );
}

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
      console.log(error);
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ELEGANZA" />

          <div className="banner">
            <p>Welcome To Eleganza</p>
            <h1>FIND AMAZING PRODUCT BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {/* Render the ProductList component */}
            <ProductList products={products} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;

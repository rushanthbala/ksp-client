import React from "react";
import "../../../styles/product-card.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";

const ProductCard = (props) => {
  const { _id, title, image, price } = props.item;
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        _id,
        title,
        image,
        price,
      })
    );
  };

  // Function to check if the image is Base64 encoded
  const isBase64 = (str) => {
    try {
      return btoa(atob(str)) === str; // Try to decode the string and encode it again to see if it's val_id
    } catch (e) {
      return false;
    }
  };

  return (
    <div className="product__item">
      <div className="product__img">
        {/* Check if the image is Base64 */}
        <img
          src={isBase64(image) ? `data:image/jpeg;base64,${image}` : image}
          alt="product-img"
          className="w-50"
        />
      </div>

      <div className="product__content">
        <h5>
          <Link to={`/products/${_id}`}>{title}</Link>
        </h5>
        <div
          className=" d-flex align-items-center justify-content-between"
          style={{ flexDirection: "column" }}
        >
          <span className="product__price">${price}</span>
          <button className="addTOCart__btn" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

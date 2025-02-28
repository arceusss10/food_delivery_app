import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  const data = useCart();
  const navigate = useNavigate();
  const dispatch = useDispatchCart();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceOptions = Object.keys(props.options);

  useEffect(() => {
    // Initialize size with the first available option
    if (priceOptions.length > 0) {
      setSize(priceOptions[0]);
    }
  }, [priceOptions]);

  const handleQty = (e) => {
    setQty(parseInt(e.target.value, 10));
  };

  const handleOptions = (e) => {
    setSize(e.target.value);
  };

  const handleAddToCart = async () => {
    const food = data.find(item => item.id === props.item._id);

    if (food) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.item._id, price: qty * parseInt(props.options[size]), qty });
      } else {
        await dispatch({ type: "ADD", id: props.item._id, name: props.foodName, price: qty * parseInt(props.options[size]), qty, size, img: props.ImgSrc });
      }
    } else {
      await dispatch({ type: "ADD", id: props.item._id, name: props.foodName, price: qty * parseInt(props.options[size]), qty, size, img: props.ImgSrc });
    }
  };

  const finalPrice = qty * parseInt(props.options[size] || 0);

  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  };

  return (
    <div>
      <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
        <img src={props.ImgSrc} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>
          <div className='container w-100 p-0' style={{ height: "38px" }}>
            <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} onClick={handleClick} onChange={handleQty}>
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} onClick={handleClick} onChange={handleOptions}>
              {priceOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <div className=' d-inline ms-2 h-100 w-20 fs-5'>
              ₹{finalPrice}/-
            </div>
          </div>
          <hr></hr>
          <button className="btn btn-success justify-center ms-2" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

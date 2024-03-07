import React from "react";
import { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";

export const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    category: "",
    description: "",
    dimensions: {
      length: 0,
      width: 0,
      height: 0
    },
    colors: [],
    tags: [],
    new_price: "",
    old_price: ""
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };



  function formatTags(tagsString) {
    // Split the tags string by comma and trim each tag
    const tagsArray = tagsString.split(',').map(tag => tag.trim());
    return tagsArray;
}

const tagsHandler = (e) => {
  setProductDetails({
    ...productDetails,
    tags: formatTags(e.target.value),
  });
};
  const handleDimensionChange = (e) => {
    setProductDetails({
      ...productDetails,
      dimensions: {
        ...productDetails.dimensions,
        [e.target.name]: parseFloat(e.target.value) // Convert input value to float
      }
    });
  };
  

  const Add_Product = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;
    let formData = new FormData();
    formData.new_price = parseInt(formData.new_price);
    formData.old_price = parseInt(formData.old_price);
    formData.append("product", image);

    console.log(productDetails);

    try {
      await fetch("http://localhost:4000/upload", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      })
        .then((resp) => resp.json())
        .then((data) => {
          responseData = data;
        });

      if (responseData.success) {
        product.image = responseData.image_url;
        console.log(product);
        await fetch("http://localhost:4000/addproduct", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        })
          .then((resp) => resp.json())
          .then((data) => {
            data.success ? alert("Product Added") : alert("Failed");
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleColorChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setProductDetails((prevState) => ({
        ...prevState,
        colors: [...prevState.colors, value]
      }));
    } else {
      setProductDetails((prevState) => ({
        ...prevState,
        colors: prevState.colors.filter((color) => color !== value)
      }));
    }
  };
  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="type here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Old Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="type here"
          />
        </div>

        <div className="addproduct-itemfield">
          <p>New Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="type here"
          />
        </div>
     
      </div>
      <div className="description">
          <p>Product Description</p>
          <textarea
            value={productDetails.description}
            onChange={changeHandler}
            type="textarea"
            name="description"
            placeholder="type description here"
          />
        </div>
        <div className="addproduct-itemfield">
  <div style={{ display: 'flex' }}>
    <div style={{ marginRight: '20px' }}>
      <p>Product Category</p>
      <select
        value={productDetails.category}
        onChange={changeHandler}
        name="category"
        className="add-product-selector"
      >
        <option value="art">Art</option>
        <option value="fashion">Fashion</option>
        <option value="gaget">Gadget</option>
        <option value="hobby">Hobby</option>
        <option value="household">household</option>
        <option value="educational">Educational</option>
        <option value="models">Models</option>
        <option value="tools">Tools</option>
        <option value="toys&games">Toys & Games</option>
      </select>
    </div>
    <div>
      <p>Colors</p>
      <div className="colors">


  <div>
    <label>
      <input
        type="checkbox"
        name="colors"
        value="White"
        checked={productDetails.colors.includes("White")}
        onChange={handleColorChange}
      />
      White
    </label>
  </div>
  <div>
    <label>
      <input
        type="checkbox"
        name="colors"
        value="Black"
        checked={productDetails.colors.includes("Black")}
        onChange={handleColorChange}
      />
      Black
    </label>
  </div>
  <div>
    <label>
      <input
        type="checkbox"
        name="colors"
        value="Gray"
        checked={productDetails.colors.includes("Gray")}
        onChange={handleColorChange}
      />
      Gray
    </label>
  </div>
  <div>
    <label>
      <input
        type="checkbox"
        name="colors"
        value="Silver"
        checked={productDetails.colors.includes("Silver")}
        onChange={handleColorChange}
      />
      Silver
    </label>
  </div>
  <div>
    <label>
      <input
        type="checkbox"
        name="colors"
        value="Clear/Transparent"
        checked={productDetails.colors.includes("Clear/Transparent")}
        onChange={handleColorChange}
      />
      Clear/Transparent
    </label>
  </div>
  <div>
    <label>
      <input
        type="checkbox"
        name="colors"
        value="Red"
        checked={productDetails.colors.includes("Red")}
        onChange={handleColorChange}
      />
      Red
    </label>
  </div>
  <div>
    <label>
      <input
        type="checkbox"
        name="colors"
        value="Blue"
        checked={productDetails.colors.includes("Blue")}
        onChange={handleColorChange}
      />
      Blue
    </label>
  </div>
  <div>
    <label>
      <input
        type="checkbox"
        name="colors"
        value="Green"
        checked={productDetails.colors.includes("Green")}
        onChange={handleColorChange}
      />
      Green
    </label>
  </div>
  <div>
    <label>
      <input
        type="checkbox"
        name="colors"
        value="Yellow"
        checked={productDetails.colors.includes("Yellow")}
        onChange={handleColorChange}
      />
      Yellow
    </label>
  </div>
  <div>
    <label>
      <input
        type="checkbox"
        name="colors"
        value="Orange"
        checked={productDetails.colors.includes("Orange")}
        onChange={handleColorChange}
      />
      Orange
    </label>
  </div>
  <div>
    <label>
      <input
        type="checkbox"
        name="colors"
        value="Purple"
        checked={productDetails.colors.includes("Purple")}
        onChange={handleColorChange}
      />
      Purple
    </label>
  </div>
  <div>
    <label>
      <input
        type="checkbox"
        name="colors"
        value="Pink"
        checked={productDetails.colors.includes("Pink")}
        onChange={handleColorChange}
      />
      Pink
    </label>
  </div>
  <div>
    <label>
      <input
        type="checkbox"
        name="colors"
        value="Gold"
        checked={productDetails.colors.includes("Gold")}
        onChange={handleColorChange}
      />
      Gold
    </label>
  </div>
  <div>
    <label>
      <input
        type="checkbox"
        name="colors"
        value="Bronze"
        checked={productDetails.colors.includes("Bronze")}
        onChange={handleColorChange}
      />
      Bronze
    </label>
  </div>
  <div>
    <label>
      <input
        type="checkbox"
        name="colors"
        value="Brown"
        checked={productDetails.colors.includes("Brown")}
        onChange={handleColorChange}
      />
      Brown
    </label>
  </div>
</div>
    </div>
  </div>
</div>

<div className="addproduct-itemfield">
        <p>Tags</p>
        <input
          value={productDetails.tags}
          onChange={tagsHandler}
          type="text"
          name="tags"
          placeholder="type tags here"
        />
      </div>

      <div className="addproduct-itemfield">
  <p>Dimensions (Length, Width, Height)(inches)</p>
  <div style={{ display: 'flex', gap: '10px' }}>
    <input
      type="number"
      name="length"
      value={productDetails.dimensions.length}
      onChange={handleDimensionChange}
      placeholder="Length"
      className="add-product-input"
    />
    <input
      type="number"
      name="width"
      value={productDetails.dimensions.width}
      onChange={handleDimensionChange}
      placeholder="Width"
      className="add-product-input"
    />
    <input
      type="number"
      name="height"
      value={productDetails.dimensions.height}
      onChange={handleDimensionChange}
      placeholder="Height"
      className="add-product-input"
    />
  </div>
</div>
     
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="addproduct-thumbnail-img"
            alt=""
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>

      <button
        onClick={() => {
          Add_Product();
        }}
        className="addproduct-btn"
      >
        Add
      </button>
    </div>
  );
};

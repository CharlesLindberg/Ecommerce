import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../Utilities/httpClient";
import { Product } from "../models/Product";

const ProductPage = () => {
  const [product, setProduct] = useState<Product> | (null > null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await fetchData(`/products/${id}`);
        console.log(fetchedProduct);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Faile to fetch product details", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>Pris: {product.price}</p>
      <p>Lagerstatus: {product.stock}</p>
    </div>
  );
};

export default ProductPage;

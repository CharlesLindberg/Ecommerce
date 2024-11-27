import { useEffect } from "react";
import { LoadProducts } from "../Utilities/LoadProducts";

const ProductsPage = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    LoadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await LoadProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products", error);
    }
  };

  return (
    <div>
      <h1>All products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price} SEK
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;

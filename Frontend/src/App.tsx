import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import HomePage from "./Pages/HomePage";
import ProductsPage from "./Pages/ProductsPage";
import ProductPage from "./Pages/ProductPage";
import NotFoundPage from "./Pages/NotFoundPage";
import Header from "./Components/Header";
import CartPage from "./Pages/CartPage";

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>
      </Routes>
    </Provider>
  );
};

export default App;

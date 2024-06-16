// https://fakestoreapi.com/

import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import Navigation from "./components/Navigation";
import NotFound from "./Pages/NotFound";
import CustomModal from "./components/Modal";

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalContent(null);
  };

  return (
    <>
      <Navigation onClick={openModal} closeModal={closeModal} />
      <CustomModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Auth Modal"
      >
        {modalContent}
      </CustomModal>
      <Routes>
        <Route
          path="/"
          element={<Home onClick={openModal} closeModal={closeModal} />}
        />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;

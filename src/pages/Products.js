import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import CustomTable from "../components/CustomTable";
import "./Pages.css";
import { Button, Form, Icon, Input, Modal, Popup } from "semantic-ui-react";
import { nanoid } from "@reduxjs/toolkit";
import {
  addProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../reducers/productsReducer";
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const [isOpen, setIsOpen] = useState(false);
  const [newProduct, setNewProduct] = useState("");
  const [editProduct, setEditProduct] = useState(null);

  const columns = [
    { name: "Producto", field: "name" },
    {
      name: "Accion",
      field: "",
      render: (row) => (
        <>
          <Popup
            trigger={
              <Button icon className="action-btn-edit">
                <Icon name="pencil" onClick={() => handleEditClick(row)} />
              </Button>
            }
            content="Editar producto"
          />
          <Popup
            trigger={
              <Button icon className="action-btn-delete">
                <Icon
                  name="times circle"
                  onClick={() => handleDeleteClick(row.id)}
                />
              </Button>
            }
            content="Eliminar producto"
          />
        </>
      ),
    },
  ];

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      dispatch(fetchProducts(JSON.parse(storedProducts)));
    } else {
      fetch("product.json")
        .then((response) => response.json())
        .then((data) => dispatch(fetchProducts(data)))
        .catch((error) => console.error(error));
    }
  }, [dispatch]);

  const handleCreateClick = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleNewProductChange = (event) => {
    setNewProduct(event.target.value);
  };

  const handleNewProductSubmit = (event) => {
    event.preventDefault();
    const p = { id: nanoid(), name: newProduct };
    dispatch(addProduct(p));
    setNewProduct("");
    setIsOpen(false);
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setIsOpen(true);
  };

  const handleEditProductChange = (event) => {
    setEditProduct({ ...editProduct, name: event.target.value });
  };

  const handleEditProductSubmit = (event) => {
    event.preventDefault();
    dispatch(updateProduct(editProduct));
    setIsOpen(false);
    setEditProduct(null);
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className="page-container">
      <NavBar />
      <div className="page-content">
        <div className="page-header">
          <h1>Productos</h1>
          <Button className="create-btn" primary onClick={handleCreateClick}>
            + Crear nuevo
          </Button>
        </div>
        <CustomTable columns={columns} data={products} />
        <Modal open={isOpen} onClose={handleModalClose}>
          <Modal.Header>
            {editProduct ? "Editar producto" : "Crear nuevo producto"}
          </Modal.Header>
          <Modal.Content>
            <Form
              onSubmit={
                editProduct ? handleEditProductSubmit : handleNewProductSubmit
              }
            >
              <Form.Field required>
                <label>Nombre del producto</label>
                <Input
                  placeholder="Nombre"
                  required
                  value={editProduct ? editProduct.name : newProduct}
                  onChange={
                    editProduct
                      ? handleEditProductChange
                      : handleNewProductChange
                  }
                />
              </Form.Field>
              <Button type="button" onClick={handleModalClose}>
                Cancelar
              </Button>
              <Button
                type="submit"
                primary
                disabled={
                  (editProduct && editProduct.name.trim() === "") ||
                  (!editProduct && newProduct.trim() === "")
                }
              >
                {editProduct ? "Guardar cambios" : "Crear"}
              </Button>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    </div>
  );
};

export default Products;

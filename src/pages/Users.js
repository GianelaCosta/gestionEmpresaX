import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "./Pages.css";
import "./Users.css";
import CustomTable from "../components/CustomTable";
import SearchField from "../components/SearchField";
import {
  Button,
  Input,
  Modal,
  Form,
  ModalContent,
  Dropdown,
} from "semantic-ui-react";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { addUser, fetchUsers } from "../reducers/usersReducer";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const [results, setResults] = useState(users);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ci, setCi] = useState("");
  const [cargo, setCargo] = useState("");
  const [role, setRole] = useState("");
  const [clientDirection, setClientDirection] = useState("");
  const [roleError, setRoleError] = useState(false);
  const [cargoError, setCargoError] = useState(false);

  const columns = [
    { name: "Nombre completo", field: "name" },
    { name: "Email", field: "email" },
    { name: "C.I.", field: "ci" },
    { name: "Cargo", field: "cargo" },
    { name: "Rol", field: "role" },
    { name: "Edificio Asociado", field: "clientDirection" },
  ];

  const cargos = [
    {
      key: "0",
      text: "Administrativo",
      value: "Administrativo",
    },
    { key: "1", text: "Limpieza", value: "Limpieza" },
  ];

  const roles = [
    {
      key: "0",
      text: "Administrador",
      value: "Administrador",
    },
    { key: "1", text: "Usuario", value: "Usuario" },
  ];

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      dispatch(fetchUsers(JSON.parse(storedUsers)));
    } else {
      fetch("users.json")
        .then((response) => response.json())
        .then((data) => dispatch(fetchUsers(data)))
        .catch((error) => console.error(error));
    }
  }, [dispatch]);

  const handleCreateClick = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleNewUserSubmit = (event) => {
    event.preventDefault();
    setCargoError(cargo === "");
    setRoleError(role === "");
    if (cargo !== "" && role !== "") {
      const u = { name, email, ci, cargo, role, id: nanoid(), clientDirection };
      dispatch(addUser(u));
      setIsOpen(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setCi("");
    setCargo("");
    setRole("");
    setClientDirection("");
  };

  const handleSearch = (results) => {
    setResults(results);
  };

  const handleCargoDropdownChange = (event, data) => {
    setCargo(data.value);
    setCargoError(false);
  };

  const handleRoleDropdownChange = (event, data) => {
    setRole(data.value);
    setRoleError(false);
  };

  return (
    <div className="page-container">
      <NavBar />
      <div className="page-content">
        <div className="page-header">
          <h1>Usuarios</h1>
          <Button className="create-btn" primary onClick={handleCreateClick}>
            + Crear nuevo
          </Button>
        </div>
        <SearchField data={users} onSearch={handleSearch} />
        <CustomTable columns={columns} data={results} />
        <Modal open={isOpen} onClose={handleModalClose}>
          <Modal.Header>Crear usuario</Modal.Header>
          <ModalContent>
            <Form onSubmit={handleNewUserSubmit}>
              <Form.Field required>
                <label>Nombre completo</label>
                <Input
                  placeholder="Nombre completo"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Field>
              <Form.Field required>
                <label>Email</label>
                <Input
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Field>
              <Form.Field required>
                <label>C.I.</label>
                <Input
                  placeholder="C.I."
                  type="text"
                  pattern="[0-9]+"
                  value={ci}
                  onChange={(e) => setCi(e.target.value)}
                  required
                  maxLength={8}
                />
              </Form.Field>
              <Form.Field required>
                <label>Rol</label>
                <Dropdown
                  placeholder="Rol"
                  options={roles}
                  onChange={handleRoleDropdownChange}
                  error={roleError}
                  fluid
                  selection
                />
              </Form.Field>
              <Form.Field required>
                <label>Cargo</label>
                <Dropdown
                  placeholder="Cargo"
                  options={cargos}
                  onChange={handleCargoDropdownChange}
                  error={cargoError}
                  fluid
                  selection
                />
              </Form.Field>
              <Form.Field required>
                <label>Edificio Asociado</label>
                <Input
                  placeholder="Edificio Asociado"
                  type="text"
                  value={clientDirection}
                  onChange={(e) => setClientDirection(e.target.value)}
                  required
                />
              </Form.Field>
              <Button type="button" onClick={handleModalClose}>
                Cancelar
              </Button>
              <Button type="submit" primary>
                Crear
              </Button>
            </Form>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default Users;

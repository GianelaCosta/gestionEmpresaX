import React, { useEffect, useState } from "react";
import { Button, Form, Icon, Input, Modal, Popup } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRequests, updateRequests } from "../reducers/requestsReducer";

import NavBar from "../components/NavBar";
import CustomTable from "../components/CustomTable";
import "./Pages.css";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests.requests);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestsToReject, setRequestsToReject] = useState([]);
  const [rejectionReason, setRejectionReason] = useState("");

  const formatDate = (date) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const columns = [
    { name: "Producto", field: "product" },
    { name: "Usuario que solicita", field: "userEmail" },
    { name: "Cantidad", field: "quantity" },
    { name: "Fecha", field: "date" },
    { name: "Edificio Asociado", field: "clientDirection" },
    { name: "Estado", field: "status" },
    { name: "Motivo de Rechazo", field: "rejectionReason" },
    {
      name: "Accion",
      field: "",
      render: (row) => (
        <>
          <Popup
            trigger={
              <Button
                icon
                className="action-btn-completed"
                disabled={
                  row.status === "Finalizado" || row.status === "Rechazado"
                }
              >
                <Icon
                  name="check circle outline"
                  onClick={() => handleFinishedRequest(row)}
                />
              </Button>
            }
            content="Finalizar pedido"
          />
          <Popup
            trigger={
              <Button
                icon
                className="action-btn-rejected"
                disabled={
                  row.status === "Finalizado" || row.status === "Rechazado"
                }
              >
                <Icon
                  name="times circle"
                  onClick={() => handleModalOpen(row)}
                />
              </Button>
            }
            content="Rechazar pedido"
          />
        </>
      ),
    },
  ];

  const handleFinishedRequest = (row) => {
    const updatedRequests = requests.map((request) => {
      if (request.id === row.id) {
        return {
          ...request,
          status: "Finalizado",
          rejectionReason: "N/A",
        };
      }
      return request;
    });
    dispatch(updateRequests(updatedRequests));
  };

  const handleModalOpen = (row) => {
    setIsModalOpen(true);
    setRequestsToReject(row);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setRequestsToReject(null);
    setRejectionReason("");
  };

  const handleRejectionSubmit = (event) => {
    event.preventDefault();
    const updatedRequests = requests.map((request) => {
      if (request.id === requestsToReject.id) {
        return {
          ...request,
          status: "Rechazado",
          rejectionReason: rejectionReason,
        };
      }
      return request;
    });
    dispatch(updateRequests(updatedRequests));
    setIsModalOpen(false);
    setRequestsToReject(null);
    setRejectionReason("");
  };

  useEffect(() => {
    const storedRequests = localStorage.getItem("requests");
    if (storedRequests) {
      dispatch(fetchRequests(JSON.parse(storedRequests)));
    } else {
      fetch("requests.json")
        .then((response) => response.json())
        .then((data) => {
          const formattedData = data.map((item) => {
            return {
              ...item,
              date: formatDate(item.date),
              status: "Pendiente",
              rejectionReason: "-",
            };
          });
          dispatch(fetchRequests(formattedData));
        })
        .catch((error) => console.error(error));
    }
  }, [dispatch]);

  return (
    <div className="page-container">
      <NavBar />
      <div className="page-content">
        <div className="page-header">
          <h1>Pedidos</h1>
        </div>
        <CustomTable columns={columns} data={requests} />

        <Modal open={isModalOpen} onClose={handleModalClose}>
          <Modal.Header>{"Rechazar pedido"}</Modal.Header>
          <Modal.Content>
            <Form onSubmit={handleRejectionSubmit}>
              <Form.Field required>
                <label>Motivo del rechazo</label>
                <Input
                  placeholder="Motivo"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  required
                />
              </Form.Field>
              <Button type="button" onClick={handleModalClose}>
                Cancelar
              </Button>
              <Button
                type="submit"
                primary
                disabled={rejectionReason.trim() === ""}
              >
                Aceptar
              </Button>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    </div>
  );
};

export default Requests;

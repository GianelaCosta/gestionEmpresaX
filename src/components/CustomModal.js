import React from "react";
import { Button, Dropdown, Form, Input, Modal } from "semantic-ui-react";

const CustomModal = ({
  isOpen,
  handleModalClose,
  itemToEdit,
  editMessage,
  createMessage,
  handleEditChange,
  handleEditSubmit,
  newItem,
  handleCreateChange,
  handleCreateSubmit,
  fields,
}) => {
  return (
    <Modal open={isOpen} onClose={handleModalClose}>
      <Modal.Header>{itemToEdit ? editMessage : createMessage}</Modal.Header>
      <Modal.Content>
        <Form onSubmit={itemToEdit ? handleEditSubmit : handleCreateSubmit}>
          {fields &&
            fields.map((field, index) => (
              <Form.Field key={index}>
                <label>{field.label}</label>
                {field.type === "dropdown" ? (
                  <Dropdown
                    placeholder={field.placeholder}
                    fluid
                    selection
                    options={field.options}
                  />
                ) : (
                  <Input
                    placeholder={field.placeholder}
                    type={field.inputType}
                    pattern={field.pattern}
                    value={
                      itemToEdit ? itemToEdit[field.name] : newItem[field.name]
                    }
                    onChange={
                      itemToEdit ? handleEditChange : handleCreateChange
                    }
                  />
                )}
              </Form.Field>
            ))}
          <Button type="button" onClick={handleModalClose}>
            Cancelar
          </Button>
          <Button type="submit" primary>
            {itemToEdit ? "Guardar cambios" : "Crear"}
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default CustomModal;

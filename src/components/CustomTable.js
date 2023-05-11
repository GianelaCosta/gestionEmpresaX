import React from "react";
import { Table } from "semantic-ui-react";

function CustomTable(props) {
  const { columns, data } = props;

  return (
    <Table basic="very">
      <Table.Header>
        <Table.Row>
          {columns &&
            columns.map((column) => (
              <Table.HeaderCell key={column.name}>
                {column.name}
              </Table.HeaderCell>
            ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data &&
          data.map((row) => (
            <Table.Row key={row.id}>
              {columns &&
                columns.map((column) => (
                  <Table.Cell key={`${row.id}-${column.name}`}>
                    {column.render ? column.render(row) : row[column.field]}
                  </Table.Cell>
                ))}
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
}

export default CustomTable;

import React from "react";
import styled from "styled-components";
import theme from "styled-theming";
import PropTypes from "prop-types";
import { Segment, Checkbox, Table } from "semantic-ui-react";
import { MOCK_BUG_DATA } from "./mock.js";

const backgroundColor = theme.variants("mode", "variant", {
  default: { light: "white", dark: "#282c34" },
  Low: { light: "lightgreen", dark: "darkgreen" },
  Medium: { light: "yellow", dark: "goldenrod" },
  High: { light: "orange", dark: "darkorange" },
  Critical: { light: "lightcoral", dark: "darkred" },
});

const textColor = theme("mode", {
  light: "black !important",
  dark: "white !important",
});

const CustomRow = styled(Table.Row)`
  background-color: ${backgroundColor};
`;

const CustomCell = styled(Table.Cell)`
  color: ${textColor};
`;

CustomRow.propTypes = {
  variants: PropTypes.oneOf(["default", "Low", "Medium", "High", "Critical"]),
};

const TableRow = ({ d }) => (
  <CustomRow variant={d.complete ? "default" : d.severity}>
    <CustomCell>{d.createdDate}</CustomCell>
    <CustomCell>{d.title}</CustomCell>
    <CustomCell>{d.description}</CustomCell>
    <CustomCell>
      <Checkbox slider checked={d.complete} />
    </CustomCell>
  </CustomRow>
);

const BugList = () => {
  return (
    <Segment>
      <Table compact definition celled>
        <Table.Header fullWidth>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Complete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {MOCK_BUG_DATA.map((bugData, index) => (
            <TableRow key={index} d={bugData} />
          ))}
        </Table.Body>
      </Table>
    </Segment>
  );
};

export default BugList;

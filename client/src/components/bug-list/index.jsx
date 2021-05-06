import React, { useState } from "react";
import styled from "styled-components";
import theme from "styled-theming";
import PropTypes from "prop-types";
import { Segment, Checkbox, Table } from "semantic-ui-react";
import { MOCK_BUG_DATA } from "./mock.js";

const backgroundColor = theme.variants("mode", "variant", {
  default: { light: "#fcfcfc", dark: "#282c34" },
  0: { light: "lightgreen", dark: "darkgreen" },
  1: { light: "yellow", dark: "goldenrod" },
  2: { light: "orange", dark: "darkorange" },
  3: { light: "lightcoral", dark: "darkred" },
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
  variants: PropTypes.oneOf(["default", "0", "1", "2", "3"]),
};

const TableRow = ({ d, setComplete }) => (
  <CustomRow variant={d.complete ? "default" : d.severity}>
    <CustomCell>{d.createdDate}</CustomCell>
    <CustomCell>{d.title}</CustomCell>
    <CustomCell>{d.description}</CustomCell>
    <CustomCell>
      <Checkbox
        slider
        value={d.complete}
        onChange={(e, { value }) => {
          console.log(e.target.value);
          console.log({ value });
          setComplete({ id: d.id, complete: !d.complete });
        }}
      />
    </CustomCell>
  </CustomRow>
);

const BugList = () => {
  const [bugData, setBugData] = useState(
    MOCK_BUG_DATA.sort((a, b) => {
      return parseInt(b.severity) - parseInt(a.severity);
    })
  );

  const setComplete = ({ id, complete }) => {
    let newBugData = JSON.parse(JSON.stringify(bugData));
    const index = newBugData.findIndex((d) => d.id === id);
    console.log({id})
    console.log({index})
    if (index > -1) {
      newBugData[index].complete = complete;
      setBugData(newBugData);
    } else {
      alert("Bug ID not found?");
    }
  };

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
          {bugData &&
            bugData.map((bugData, index) => (
              <TableRow key={index} d={bugData} setComplete={setComplete} />
            ))}
        </Table.Body>
      </Table>
    </Segment>
  );
};

export default BugList;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "styled-theming";
import PropTypes from "prop-types";
import { Segment, Checkbox, Table } from "semantic-ui-react";
import { MOCK_BUG_DATA } from "./mock.js";
import { COLORS, API } from "@/constants.js";

const backgroundColor = theme.variants("mode", "variant", {
  default: { light: "#fcfcfc", dark: "#282c34" },
  0: COLORS[0],
  1: COLORS[1],
  2: COLORS[2],
  3: COLORS[3],
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
    <CustomCell>{d.createdAt}</CustomCell>
    <CustomCell>{d.title}</CustomCell>
    <CustomCell>{d.description}</CustomCell>
    <CustomCell>
      <Checkbox
        slider
        checked={d.complete}
        onChange={(e, { value }) => {
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

  const getIssues = async () => {
    try {
      const issues = await fetch(`${API}issues`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const result = await issues.json();
      setBugData(
        result.sort((a, b) => {
          return parseInt(b.severity) - parseInt(a.severity);
        })
      );
    } catch (err) {
      alert(`Error: ${err}`);
      console.error(err);
    }
  };

  useEffect(() => {
    getIssues();
  }, []);

  const setComplete = async ({ id, complete }) => {
    let newBugData = JSON.parse(JSON.stringify(bugData));
    const index = newBugData.findIndex((d) => d.id === id);
    if (index > -1) {
      try {
        const update = await fetch(`${API}update`, {
          method: "POST",
          body: JSON.stringify({ id: id, complete: complete }),
          headers: { "Content-Type": "application/json" },
        });
        const result = await update.json();
        if (result) {
          newBugData[index].complete = complete;
          setBugData(newBugData);
        }
      } catch (err) {
        alert(`Error: ${err}`);
        console.error(err);
      }
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

import React, { useState } from "react";
import {
  Segment,
  Header,
  Dropdown,
  Form,
  Input,
  Button,
  TextArea,
} from "semantic-ui-react";

const severityOptions = [
  {
    key: 0,
    text: "Low",
    value: "Low",
    label: { color: "green", empty: true, circular: true },
  },
  {
    key: 1,
    text: "Medium",
    value: "Medium",
    label: { color: "yellow", empty: true, circular: true },
  },
  {
    key: 2,
    text: "High",
    value: "High",
    label: { color: "orange", empty: true, circular: true },
  },
  {
    key: 3,
    text: "Critical",
    value: "Critical",
    label: { color: "red", empty: true, circular: true },
  },
];

const submitIssue = async () => {
  try {
  } catch (err) {}
};

const IssueSubmission = () => {
  const [severity, setSeverity] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  return (
    <Segment>
      <Header>Submit Issue</Header>
      <Form>
        <Form.Field>
          <Dropdown
            floating
            direction="right"
            value={severity}
            placeholder="Select Severity Level"
            options={severityOptions}
            onChange={(e, { value }) => {
              setSeverity(value);
            }}
          ></Dropdown>
        </Form.Field>
        <Form.Field>
          <Input
            value={title}
            placeholder="Issue Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </Form.Field>
        <Form.Field>
          <TextArea
            value={description}
            placeholder="Issue Description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </Form.Field>
      </Form>
      <br></br>
      <Button
        primary
        onClick={() => {
          submitIssue();
        }}
      >
        Submit
      </Button>
    </Segment>
  );
};

export default IssueSubmission;

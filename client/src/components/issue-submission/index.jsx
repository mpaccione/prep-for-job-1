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
    value: "0",
    label: { color: "green", empty: true, circular: true },
  },
  {
    key: 1,
    text: "Medium",
    value: "1",
    label: { color: "yellow", empty: true, circular: true },
  },
  {
    key: 2,
    text: "High",
    value: "2",
    label: { color: "orange", empty: true, circular: true },
  },
  {
    key: 3,
    text: "Critical",
    value: "3",
    label: { color: "red", empty: true, circular: true },
  },
];

const IssueSubmission = () => {
  const [severity, setSeverity] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const submitIssue = async () => {
    try {
      const submission = await fetch("http://localhost:8082/submission", {
        method: "post",
        body: { createdAt: new Date().toISOString(), title, severity, description },
      });
      const result = await submission.json()
      // TODO: Add global state with context API or a parent wrapper and useState to update result list
      alert('Successful Submission')
    } catch (err) {
        alert(`Error: ${err}`)
        console.error(err)
    }
  };

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

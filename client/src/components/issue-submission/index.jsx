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
import styled from "styled-components"

const severityOptions = [
  { key: 0, text: "Low", value: 0 },
  { key: 1, text: "Medium", value: 1 },
  { key: 2, text: "High", value: 2 },
  { key: 3, text: "Critical", value: 3 },
];

const submitIssue = async () => {
    try {

    } catch (err) {

    }
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

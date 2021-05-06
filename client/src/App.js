import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "styled-theming";
import IssueSubmission from "@/components/issue-submission/index.jsx";
import BugList from "@/components/bug-list/index.jsx";
import { Radio } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

const backgroundColor = theme("mode", {
  light: "#fefefe",
  dark: "#282c34",
});

const Application = styled.div`
  background-color: ${backgroundColor};
`;

const initialMode = localStorage.getItem("mode");

function App() {
  const [showBugList, setShowBugList] = useState();
  const [mode, setMode] = useState(
    initialMode !== null ? initialMode : "light"
  );

  return (
    <ThemeProvider theme={{ mode: mode }}>
      <Application className="App">
        <Radio
          slider
          onChange={() => {
            const newMode = mode === "light" ? "dark" : "light";
            localStorage.setItem("mode", newMode);
            setMode(newMode);
          }}
        />
        {showBugList ? <BugList /> : <IssueSubmission />}
        <Radio
          slider
          onChange={(e, { value }) => {
            setShowBugList(!showBugList);
          }}
        />
      </Application>
    </ThemeProvider>
  );
}

export default App;

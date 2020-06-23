import styled from "styled-components";
import Button from "@material-ui/core/Button";

export const Tooltip = styled.p`
  font-size: 16px;
  margin: 0;
  color: ${(props) => (props.correct ? "rgb(18, 203, 163)" : "#ff767b")};
  text-align: ${(props) => (props.left ? "center" : "left")};
  font-family: "Inter", sans-serif;
  > p {
    display: inline;
  }
  width: 100%;
`;

export const SButton = styled(Button)`
  background: linear-gradient(45deg, #2196f3 30%, #21cbf3 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(33, 203, 243, 0.3);
`;

import styled from "styled-components";

export const Titulo = styled.h1`
  color: ${(props) => (props.primary ? "var(--primary)" : "var(--primary)")};
  font-size: ${(props) => (props.large ? "48px" : "32px")};
  font-weight: ${(props) => (props.thin ? "normal" : "bold")};
  text-transform: ${(props) => {
    if (props.capitalize) return "capitalize";
    if (props.uppercase) return "uppercase";
    return "none";
  }};
`;

export const Subtitulo = styled.h2`
  color: ${(props) => (props.primary ? "var(--primary)" : "var(--primary)")};
  font-size: ${(props) => (props.large ? "48px" : "32px")};
  font-weight: ${(props) => (props.thin ? "normal" : "bold")};
  text-transform: ${(props) => {
    if (props.capitalize) return "capitalize";
    if (props.uppercase) return "uppercase";
    return "none";
  }};
`;

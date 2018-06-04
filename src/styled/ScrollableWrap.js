import React from "react";
import styled from "styled-components";

const ScrollableWrap = styled.div`
  flex-grow: 1;
  background: white;
  display: flex;
  align-items: stretch;
  height: auto;
  overflow: hidden;
  position: relative;
  min-height: ${props => props.minHeight};
`;

export default ScrollableWrap;
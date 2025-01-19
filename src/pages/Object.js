import { useRef } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Object = () => {
  const containerRef = useRef();

  return (
    <ObjectContainer ref={containerRef}>
      <Outlet />
    </ObjectContainer>
  );
};

export default Object;

const ObjectContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 4rem;
`;

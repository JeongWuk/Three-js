import { Outlet } from "react-router-dom";
import styled from "styled-components";

const CommonLayout = () => {
  return (
    <Common>
      <Outlet />
    </Common>
  );
};

export default CommonLayout;

const Common = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  background-color: aliceblue;
  position: relative;
`;

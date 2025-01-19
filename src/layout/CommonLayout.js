import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/common/Header";

const CommonLayout = () => {
  return (
    <Common>
      <Header />
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
  position: relative;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

import styled from "styled-components";
import ContentList from "../components/ContentList";

const Home = () => {
  return (
    <>
      <HomeContainer>
        <ContentList />
      </HomeContainer>
    </>
  );
};

export default Home;

const HomeContainer = styled.div`
  margin-top: 4rem;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

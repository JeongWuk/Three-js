import styled from "styled-components";
import Header from "../components/Header";
import ContentList from "../components/ContentList";
// import Banner from "../components/Banner";

const Home = () => {
  return (
    <>
      <Header />
      <HomeContainer>
        {/* <Banner /> */}
        <ContentList />
      </HomeContainer>
    </>
  );
};

export default Home;

const HomeContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

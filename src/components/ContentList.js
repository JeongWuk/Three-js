import styled from "styled-components";
import data from "../data/list.json";
import { Link } from "react-router-dom";

const ContentList = () => {
  return (
    <ContentListContainer>
      {data.map((content) => (
        <Link key={content.id} to={content.link}>
          <Content>
            <ContentCategory>{content.category}</ContentCategory>
            <ContentImage src={content.imageUrl} alt="image" />
            <ContentDescContainer>
              <div>
                <h2>{content.title}</h2>
              </div>
              <ContentSubDescContainer>
                <h4>{content["sub-title"]}</h4>
                <div>조회수 : {content.click}</div>
              </ContentSubDescContainer>
            </ContentDescContainer>
          </Content>
        </Link>
      ))}
    </ContentListContainer>
  );
};

export default ContentList;

const ContentListContainer = styled.div`
  margin-top: 3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.1s linear;
  background-color: white;

  &:hover {
    scale: 1.05;
    background-color: gainsboro;
  }
`;

const ContentCategory = styled.div`
  font-family: "Pretendard";
  font-size: 2rem;
  font-weight: 900;
  padding: 0.5rem 0;
  color: black;
`;

const ContentImage = styled.img`
  width: 100%;
  height: auto;
`;

const ContentDescContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.5rem 1rem;
  color: black;
`;

const ContentSubDescContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: gray;
`;

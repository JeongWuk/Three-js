import styled from "styled-components";
import data from "../data/list.json";
import { Link } from "react-router-dom";

const ContentList = () => {
  return (
    <ContentListContainer>
      {data.map((content) => (
        <Content key={content.id}>
          <ContentCategory>{content.category}</ContentCategory>
          <Link to={content.link}>
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
          </Link>
        </Content>
      ))}
    </ContentListContainer>
  );
};

export default ContentList;

const ContentListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Content = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.1s linear;
  border-radius: 0.625rem;
`;

const ContentCategory = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-family: "Pretendard";
  font-size: 2rem;
  font-weight: 900;
  padding: 0.5rem 0;
  color: black;
  background-color: gainsboro;
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

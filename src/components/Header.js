import styled from "styled-components";

const Header = () => {
  return (
    <HeaderContainer>
      <Logo />
      <FeatureContainer>
        <Search />
        <Menu />
      </FeatureContainer>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  width: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  position: fixed;
  top: 0;
  background-color: lightgreen;
`;

const Logo = styled.div`
  width: 5rem;
  height: 100%;
  background-image: url(https://cdn.banggooso.com/assets/images/common/logo_2023.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

const FeatureContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const Search = styled.div`
  width: 2rem;
  height: 2rem;
  background-image: url(https://cdn.banggooso.com/assets/images/icons/icon-search_2.png);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const Menu = styled.div`
  width: 2rem;
  height: 2rem;
  background-image: url(https://cdn.banggooso.com/assets/images/icons/menu_2.png);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
`;

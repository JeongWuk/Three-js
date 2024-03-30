import { useEffect, useState } from "react";
import styled from "styled-components";

const images = [
  "https://img.freepik.com/free-photo/ultra-detailed-nebula-abstract-wallpaper-4_1562-749.jpg?size=626&ext=jpg",
  "https://img.freepik.com/free-photo/glowing-spaceship-orbits-planet-starry-galaxy-generated-by-ai_188544-9655.jpg",
  "https://t3.ftcdn.net/jpg/06/33/00/42/360_F_633004264_b6ZuRQZYAsZIEYfWdY15EAOiaG4ZJIbn.jpg",
];

const Banner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const autoplayInterval = setInterval(() => {
      nextImage();
    }, 3000);

    return () => {
      clearInterval(autoplayInterval);
    };
  }, []);

  return (
    <CarouselContainer>
      {images.map((image, index) => (
        <CarouselImage
          key={index}
          style={{ backgroundImage: `url(${image})` }}
          className={index === currentImageIndex ? "active" : ""}
        />
      ))}
    </CarouselContainer>
  );
};

export default Banner;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  margin: 0 auto;
  overflow: hidden;
`;

const CarouselImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;

  &.active {
    opacity: 1;
  }
`;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ListaDeConteudos from "../components/ListaDeConteudos";
import api from "../services/api";
import Footer from "../components/Footer";

const ROW_PADDING = '4rem';
const HERO_BLUE = '#1948c7';

const Home = () => {
  const navigate = useNavigate();
  const [bannerItem, setBannerItem] = useState(null);

  // Busca o primeiro filme de heróis para o banner
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await api.get('/filmes/herois/?page=1');
        if (res.data.results && res.data.results.length > 0) {
          setBannerItem(res.data.results[0]);
        }
      } catch (err) {
        console.error("Erro ao buscar banner:", err);
      }
    };
    fetchBanner();
  }, []);

  return (
    <HomeContainer>
      <HomeHeader>
        <Logo onClick={() => navigate("/home")}>HeroesFlix</Logo>
        <Nav>
          <NavLink onClick={() => navigate("/home")}>Início</NavLink>
          <NavLink onClick={() => navigate("/series")}>Séries</NavLink>
          <NavLink onClick={() => navigate("/filmes")}>Filmes</NavLink>
        </Nav>
      </HomeHeader>

      {bannerItem && (
        <Banner onClick={() => navigate(`/item/filmes/${bannerItem.id}`)}>
          <BannerImage src={`https://image.tmdb.org/t/p/original${bannerItem.backdrop_path}`} alt={bannerItem.title} />
          <BannerInfo>
            <h1>{bannerItem.title}</h1>
            <p>{bannerItem.overview}</p>
            <button>Assistir</button>
          </BannerInfo>
        </Banner>
      )}

      <ContentWrapper>
        <ListaDeConteudos titulo="Filmes de Heróis" endpoint="filmes/herois" tipo="filmes" />
        <ListaDeConteudos titulo="Séries de Heróis" endpoint="series/herois" tipo="series" />
        <ListaDeConteudos titulo="Filmes Marvel" endpoint="filmes/marvel" tipo="filmes" />
        <ListaDeConteudos titulo="Filmes DC" endpoint="filmes/dc" tipo="filmes" />
        <ListaDeConteudos titulo="Heroes Alternativos" endpoint="filmes/herois-alternativos" tipo="filmes" />
     </ContentWrapper>


      <Footer />
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  min-height: 100vh;
  background-color: #111;
  color: #fff;
  font-family: 'Roboto', Arial, sans-serif;
`;

const HomeHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 40px;
  background: rgba(20,20,20,0.95);
  position: relative;
  z-index: 10;
`;

const Logo = styled.h1`
  font-size: 2.5rem;
  font-style: italic;
  color: ${HERO_BLUE};
  cursor: pointer;
  user-select: none;
`;

const Nav = styled.nav`
  display: flex;
  gap: 32px;
`;

const NavLink = styled.div`
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 500;
  transition: color 0.2s;
  &:hover { color: ${HERO_BLUE}; }
`;

const Banner = styled.section`
  position: relative;
  width: 100%;
  height: 450px;
  cursor: pointer;
  overflow: hidden;
  margin-bottom: 32px;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.5);
  transition: transform 0.5s ease;
  ${Banner}:hover & {
    transform: scale(1.05);
  }
`;

const BannerInfo = styled.div`
  position: absolute;
  bottom: 50px;
  left: ${ROW_PADDING};
  max-width: 600px;
  z-index: 2;

  h1 {
    font-size: 2.8rem;
    margin-bottom: 12px;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 18px;
    line-height: 1.4rem;
  }

  button {
    background: #e50914;
    color: #fff;
    border: none;
    padding: 12px 32px;
    font-size: 1.1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
    &:hover { background: #b0060f; }
  }
`;

const ContentWrapper = styled.div`
  padding-top: 20px;
`;

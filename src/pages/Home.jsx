import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom"; // Importe useLocation
import ListaDeConteudos from "../components/ListaDeConteudos";
import api from "../services/api";

const ROW_PADDING = '4rem';
const HERO_BLUE = '#1948c7';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bannerItem, setBannerItem] = useState(null);
  const [profileName, setProfileName] = useState("Perfil"); // Estado para o nome do perfil
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para o pop-up do menu

  // Busca o nome do perfil do state de navegação ou local storage
  useEffect(() => {
    // 1. Tenta pegar do state de navegação (após a seleção na tela /Perfil)
    if (location.state && location.state.profileName) {
        setProfileName(location.state.profileName);
        localStorage.setItem('currentProfileName', location.state.profileName);
    } 
    // 2. Se não estiver no state, tenta pegar do localStorage
    else {
        const storedName = localStorage.getItem('currentProfileName');
        if (storedName) {
            setProfileName(storedName);
        }
    }
  }, [location.state]);

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

  // FUNÇÕES DE AÇÃO DO MENU
  const handleSignOut = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('currentProfileName');
    navigate('/Login');
  };

  const handleChangeProfile = () => {
    navigate('/Perfil');
  };

  return (
    <HomeContainer>
      <HomeHeader>
        <Logo onClick={() => navigate("/home")}>HeroesFlix</Logo>
        <Nav>
          <NavLink onClick={() => navigate("/home")}>Início</NavLink>
          <NavLink onClick={() => navigate("/series")}>Séries</NavLink>
          <NavLink onClick={() => navigate("/filmes")}>Filmes</NavLink>
        </Nav>
        
        {/* NOVO: CONTAINER DO PERFIL E POP-UP */}
        <ProfileContainer onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <ProfileName>{profileName}</ProfileName>
            {isMenuOpen && (
                <ProfileMenu>
                    <ProfileMenuItem onClick={handleChangeProfile}>
                        Alterar Perfil
                    </ProfileMenuItem>
                    <ProfileMenuItem onClick={handleSignOut}>
                        Sair da Conta
                    </ProfileMenuItem>
                </ProfileMenu>
            )}
        </ProfileContainer>
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


      {/* REMOVIDO: <Footer /> */}
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
  z-index: 100; /* Aumentado para garantir que o menu fique visível */
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
  flex-grow: 1; /* Permite que a navegação ocupe o espaço central */
  margin-left: 50px;
`;

const NavLink = styled.div`
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 500;
  transition: color 0.2s;
  &:hover { color: ${HERO_BLUE}; }
`;

// ======================= NOVOS ESTILOS PARA O PERFIL =======================

const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  padding: 8px;
  border-radius: 4px;
  transition: background 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ProfileName = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  margin-right: 15px;
`;

const ProfileMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: #141414;
  border: 1px solid #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  z-index: 101;
  min-width: 180px;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 5px;
`;

const ProfileMenuItem = styled.button`
  display: block;
  width: 100%;
  padding: 10px 15px;
  background: none;
  border: none;
  color: #fff;
  text-align: left;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${HERO_BLUE};
  }
`;

// ======================= FIM NOVOS ESTILOS =======================

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
import React from "react";
import styled from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ListaDeConteudos from "../components/ListaDeConteudos";
import bannerUrl from "../assets/Heroes-image.webp";
import Footer from "../components/Footer";

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const profileName = location.state?.profileName || "Visitante";

    return (
        <HomeContainer>
            <HomeHeader>
                <Logo onClick={() => navigate("/home")}> HeroesFlix </Logo>
                <Nav>
                    <StyledLink to="/home">Início</StyledLink>
                    <StyledLink to="/series">Séries</StyledLink>
                    <StyledLink to="/filmes">Filmes</StyledLink>
                </Nav>
                <Profile>
                    Bem-vindo, <strong>{profileName}</strong>
                </Profile>
            </HomeHeader>

            {/* <Banner>
                <img src={bannerUrl} alt="Banner" />
                <BannerInfo>
                    <h1>O Herói da Meia-Noite</h1>
                    <p>O melhor dos heróis com superpoderes e ação ininterrupta!</p>
                    <button>Assistir</button>
                </BannerInfo>
            </Banner> */}

            <ContentWrapper>
                {/* Seção de Filmes e Séries de Heróis com scroll infinito */}
                <ListaDeConteudos titulo="Filmes de Heróis" endpoint="filmes/herois" />
                <ListaDeConteudos titulo="Séries de Heróis" endpoint="series/herois" />

                {/* Outras seções opcionais, como populares, top 10 e ação */}
                <ListaDeConteudos titulo="Filmes Marvel" endpoint="filmes/marvel" />
                <ListaDeConteudos titulo="Filmes DC" endpoint="filmes/dc" />
                <ListaDeConteudos titulo="Heroes Alternativos" endpoint="filmes/herois-alternativos" />
            </ContentWrapper>

            <Footer />
        </HomeContainer>
    );
};

export default Home;

// =================== ESTILOS ===================

const HomeContainer = styled.div`
    min-height: 100vh;
    background: linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url(${bannerUrl});
    background-size: cover;
    background-position: center;
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
    color: #1948c7ff;
    cursor: pointer;
    user-select: none;
`;  

const Nav = styled.nav`
    display: flex;
    gap: 32px;
`;

const StyledLink = styled(Link)`
    color: #fff;
    text-decoration: none;
    font-weight: 500;
    font-size: 1.1rem;
    transition: color 0.2s;
    &:hover {
        color: #1948c7ff;
    }
`;

const Profile = styled.div`
    font-size: 1.1rem;
    color: #fff;
    background: rgba(0,0,0,0.5);
    padding: 8px 18px;
    border-radius: 20px;
    font-weight: 500;
    letter-spacing: 0.5px;
`;

// const Banner = styled.section`
//     position: relative;
//     width: 100%;
//     height: 340px;
//     overflow: hidden;
//     margin-bottom: 32px;

//     img {
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//         filter: brightness(0.6);
//     }
// `;

const BannerInfo = styled.div`
    position: absolute;
    top: 40px;
    left: 60px;
    z-index: 2;

    h1 {
        font-size: 2.8rem;
        margin-bottom: 12px;
        color: #fff;
        text-shadow: 2px 2px 8px #000;
    }

    p {
        font-size: 1.3rem;
        margin-bottom: 18px;
        color: #fff;
        text-shadow: 1px 1px 6px #000;
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

        &:hover {
            background: #b0060f;
        }
    }
`;

const ContentWrapper = styled.div`
    padding-top: 20px;
`;

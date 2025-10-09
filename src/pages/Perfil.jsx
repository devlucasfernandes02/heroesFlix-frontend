import React, { useState } from "react";
import styled from "styled-components";
import bannerUrl from "../assets/Heroes-image.webp";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../components/Footer";

const user = {
    profiles: [
        { name: "Lucas", avatar: "https://ui-avatars.com/api/?name=Lucas&background=FF5733&color=fff" },
        { name: "Família", avatar: "https://ui-avatars.com/api/?name=Familia&background=33FF57&color=fff" },
    ],
};

export default function Perfil() {
    const navigate = useNavigate();
    const [selectedProfile, setSelectedProfile] = useState(null);

    const handleProfileClick = (profile) => {
        setSelectedProfile(profile.name);
        // Envia o nome do perfil para a Home via state
        navigate("/home", { state: { profileName: profile.name } });
    };

    return (
        <Container>
            <HeaderPlaceholder>
                <a href="/">HeroesFlix</a>
            </HeaderPlaceholder>
            <BoxWrapper>
                <Box>
                    <Title>Quem está assistindo?</Title>
                    <Profiles>
                        {user.profiles.map((profile, idx) => (
                            <ProfileBtn key={idx} onClick={() => handleProfileClick(profile)}>
                                <Avatar src={profile.avatar} alt={profile.name} />
                                <Name>{profile.name}</Name>
                            </ProfileBtn>
                        ))}
                    </Profiles>
                    <Actions>
                        <EditBtn to="/editar-perfil">Editar Perfis</EditBtn>
                        <LogoutBtn to="/logout">Sair</LogoutBtn>
                    </Actions>
                </Box>
            </BoxWrapper>
            <Footer />
        </Container>
    );
}

// =================== ESTILOS ===================

const Container = styled.div`
  min-height: 100dvh;
  background: linear-gradient(rgba(0, 0, 0, 0.83), rgba(0, 0, 0, 0.83)), url(${bannerUrl});
  background-size: cover;
  background-position: center;
  font-family: sans-serif;
  color: #fff;
  display: flex;
  flex-direction: column;
`;

const HeaderPlaceholder = styled.div`
  padding: 20px 10%;
  font-size: 3.5rem;
  font-style: italic;
  font-weight: bold;
  z-index: 10;
  position: relative;
  & a {
    text-decoration: none;
    color: #1948c7ff;
  }
`;

const BoxWrapper = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 50px;
`;

const Box = styled.div`
  max-width: 480px;
  padding: 40px 68px;
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  position: relative;
  z-index: 5;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.4rem;
  font-weight: bold;
  margin-bottom: 28px;
  text-align: center;
`;

const Profiles = styled.div`
    display: flex;
    gap: 32px;
    justify-content: center;
    margin-bottom: 32px;
`;

const ProfileBtn = styled.button`
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.2s;
    &:hover {
        transform: scale(1.08);
    }
`;

const Avatar = styled.img`
    width: 90px;
    height: 90px;
    border-radius: 50%;
    margin-bottom: 12px;
    border: 3px solid #fff;
    box-shadow: 0 2px 12px rgba(0,0,0,0.3);
`;

const Name = styled.span`
    color: #fff;
    font-size: 1.1rem;
    font-weight: 500;
`;

const Actions = styled.div`
    margin-top: 24px;
    display: flex;
    gap: 16px;
    justify-content: center;
`;

const EditBtn = styled(Link)`
    background: #fff;
    color: #141414;
    padding: 8px 20px;
    border-radius: 8px;
    font-weight: 500;
    text-decoration: none;
    transition: background 0.2s;
    &:hover {
        background: #e50914;
        color: #fff;
    }
`;

const LogoutBtn = styled(Link)`
    background: transparent;
    color: #fff;
    border: 2px solid #fff;
    padding: 8px 20px;
    border-radius: 8px;
    font-weight: 500;
    text-decoration: none;
    transition: background 0.2s, color 0.2s;
    &:hover {
        background: #fff;
        color: #e50914;
    }
`;
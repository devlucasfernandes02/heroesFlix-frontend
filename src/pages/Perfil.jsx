import React from "react";
import { Link } from "react-router-dom";
const user = {
    name: "Lucas Fernandes",
    email: "lucas@email.com",
    avatar: "https://ui-avatars.com/api/?name=Lucas+Fernandes&background=0D8ABC&color=fff",
    profiles: [
        { name: "Lucas", avatar: "https://ui-avatars.com/api/?name=Lucas&background=FF5733&color=fff" },
        { name: "Família", avatar: "https://ui-avatars.com/api/?name=Familia&background=33FF57&color=fff" },
    ],
};

export default function Perfil() {
    return (
        <Bg>
            <Container>
                <Title>Quem está assistindo?</Title>
                <Profiles>
                    {user.profiles.map((profile, idx) => (
                        <ProfileLink to={`/home?profile=${profile.name}`} key={idx}>
                            <Avatar src={profile.avatar} alt={profile.name} />
                            <Name>{profile.name}</Name>
                        </ProfileLink>
                    ))}
                </Profiles>
                <Actions>
                    <EditBtn to="/editar-perfil">Editar Perfis</EditBtn>
                    <LogoutBtn to="/logout">Sair</LogoutBtn>
                </Actions>
            </Container>
        </Bg>
    );
}

import styled from "styled-components";

const Bg = styled.div`
    min-height: 100vh;
    background: linear-gradient(120deg, #141414 60%, #232323 100%);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    background: rgba(20, 20, 20, 0.95);
    border-radius: 16px;
    padding: 40px 32px;
    box-shadow: 0 4px 32px rgba(0,0,0,0.7);
    text-align: center;
    min-width: 350px;
`;

const Title = styled.h1`
    color: #fff;
    font-size: 2rem;
    margin-bottom: 32px;
    font-weight: 600;
`;

const Profiles = styled.div`
    display: flex;
    gap: 32px;
    justify-content: center;
    margin-bottom: 32px;
`;

const ProfileLink = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
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
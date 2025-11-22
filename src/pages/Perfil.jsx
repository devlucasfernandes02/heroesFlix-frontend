import React, { useState, useEffect } from "react";
import styled from "styled-components";
import bannerUrl from "../assets/Heroes-image.webp";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../components/Footer";
import { getProfiles, createProfile, deleteProfile } from "../services/userService"; 
import { Plus, X } from "lucide-react"; 
import Button from "../components/Button"; 

export default function Perfil() {
    const navigate = useNavigate();
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false); 
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [newProfileName, setNewProfileName] = useState(''); 
    const MAX_PROFILES = 5;

    // Função principal para buscar perfis
    const fetchProfiles = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            navigate("/Login");
            return;
        }

        try {
            setLoading(true);
            const res = await getProfiles(userId);
            setProfiles(res.data);
        } catch (err) {
            console.error("Erro ao carregar perfis:", err);
            setError("Não foi possível carregar os perfis. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfiles();
    }, [navigate]);

    // Lógica para selecionar o perfil e ir para a Home
    const handleProfileClick = (profile) => {
        if (!isEditing) {
            navigate("/home", { state: { profileName: profile.name } });
        }
    };
    
    // FUNÇÃO PARA CRIAR PERFIS (Disparada pelo Modal)
    const handleCreateProfileSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        
        if (!newProfileName) return;

        try {
            await createProfile(userId, newProfileName);
            alert(`Perfil '${newProfileName}' criado com sucesso!`);
            setNewProfileName(''); // Limpa o campo
            setIsModalOpen(false); // Fecha o modal
            fetchProfiles(); // Recarrega a lista

        } catch (error) {
            const errorMsg = error.response?.data?.limite || "Erro ao criar perfil.";
            alert(`Erro: ${errorMsg}`);
        }
    };

    // NOVO: FUNÇÃO PARA DELETAR PERFIL
    const handleDeleteProfile = async (profileId, profileName) => {
        if (!window.confirm(`Tem certeza que deseja excluir o perfil "${profileName}"?`)) {
            return;
        }
        
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        try {
            await deleteProfile(userId, profileId);
            alert(`Perfil ${profileName} excluído com sucesso.`);
            fetchProfiles(); // Recarrega a lista
        } catch (error) {
            alert("Erro ao excluir perfil. Tente novamente.");
        }
    };
    
    const handleLogout = () => {
        localStorage.removeItem('userId');
        navigate("/Login");
    };

    if (loading) {
        return <LoadingScreen>Carregando Perfis...</LoadingScreen>;
    }

    return (
        <Container>
            <HeaderPlaceholder>
                <Link to="/">HeroesFlix</Link>
            </HeaderPlaceholder>
            <BoxWrapper>
                <Box>
                    <Title>{isEditing ? "Gerenciar Perfis" : "Quem está assistindo?"}</Title>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    
                    <Profiles>
                        {profiles.map((profile) => (
                            <ProfileBtn key={profile.id} onClick={() => handleProfileClick(profile)}>
                                <Avatar 
                                    src={`https://ui-avatars.com/api/?name=${profile.avatar_url}&background=1948c7ff&color=fff&size=90&bold=true`} 
                                    alt={profile.name} 
                                />
                                {isEditing && (
                                    <DeleteIcon onClick={(e) => {
                                        e.stopPropagation(); // Impede que o clique acione handleProfileClick
                                        handleDeleteProfile(profile.id, profile.name);
                                    }}>
                                        <X size={20} color="#fff" />
                                    </DeleteIcon>
                                )}
                                <Name>{profile.name}</Name>
                            </ProfileBtn>
                        ))}
                        
                        {/* BOTÃO DE CRIAÇÃO VISÍVEL APENAS SE NÃO ESTIVER EDITANDO E SE HOUVER ESPAÇO */}
                        {!isEditing && profiles.length < MAX_PROFILES && (
                            <ProfileBtn onClick={() => setIsModalOpen(true)}>
                                <CreateAvatar>
                                    <Plus size={40} color="#fff" />
                                </CreateAvatar>
                                <Name>Adicionar Perfil</Name>
                            </ProfileBtn>
                        )}
                        
                    </Profiles>
                    
                    {profiles.length === 0 && !loading && (
                        <p style={{color: '#a8a8a8', marginTop: '-15px', marginBottom: '20px'}}>
                            Crie seu primeiro perfil de Herói!
                        </p>
                    )}

                    <Actions>
                        {isEditing ? (
                            <EditBtn as="button" onClick={() => setIsEditing(false)}>Concluir</EditBtn>
                        ) : (
                            <EditBtn as="button" onClick={() => setIsEditing(true)}>Gerenciar Perfis</EditBtn>
                        )}
                        <LogoutBtn as="button" onClick={handleLogout}>Sair</LogoutBtn>
                    </Actions>
                </Box>
            </BoxWrapper>
            
            {/* NOVO: MODAL DE CRIAÇÃO DE PERFIL */}
            {isModalOpen && (
                <ModalOverlay onClick={() => setIsModalOpen(false)}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <CloseButton onClick={() => setIsModalOpen(false)}><X size={24} /></CloseButton>
                        <ModalTitle>Criar Novo Perfil</ModalTitle>
                        <form onSubmit={handleCreateProfileSubmit}>
                            <ModalInput
                                type="text"
                                placeholder="Nome do Perfil"
                                value={newProfileName}
                                onChange={(e) => setNewProfileName(e.target.value)}
                                required
                            />
                            <Button type="submit">Criar Perfil</Button>
                        </form>
                        <ModalInfo>Limite de {MAX_PROFILES} perfis por conta.</ModalInfo>
                    </ModalContent>
                </ModalOverlay>
            )}
            
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
  max-width: 600px;
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
    flex-wrap: wrap; 
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
    position: relative; 
    &:hover {
        transform: scale(1.08);
    }
`;

const Avatar = styled.img`
    width: 90px;
    height: 90px;
    border-radius: 50%;
    margin-bottom: 12px;
    border: 3px solid transparent;
    box-shadow: 0 2px 12px rgba(0,0,0,0.3);
    transition: border 0.2s;

    ${ProfileBtn}:hover & {
        border: 3px solid #1948c7ff;
    }
`;

const DeleteIcon = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    background-color: #e50914; 
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid #141414;
    cursor: pointer;
    z-index: 15;
    
    &:hover {
        background-color: #b0060f;
    }
`;


const CreateAvatar = styled.div`
    width: 90px;
    height: 90px;
    border-radius: 50%;
    margin-bottom: 12px;
    background-color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid #fff;
    transition: background-color 0.2s;

    ${ProfileBtn}:hover & {
        background-color: #1948c7ff;
        border: 3px solid #1948c7ff;
    }
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
        background: #1948c7ff;
        color: #fff;
    }
`;

const LogoutBtn = styled.button`
    background: transparent;
    color: #fff;
    border: 2px solid #fff;
    padding: 8px 20px;
    border-radius: 8px;
    font-weight: 500;
    text-decoration: none;
    transition: background 0.2s, color 0.2s;
    cursor: pointer;

    &:hover {
        background: #fff;
        color: #1948c7ff;
    }
`;

const LoadingScreen = styled.div`
  color: #fff;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100dvh;
  background-color: #111;
`;

const ErrorMessage = styled.p`
  color: #E50914;
  margin-bottom: 20px;
  font-weight: 500;
`;

// =================== ESTILOS DO MODAL ===================

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background-color: #141414;
    padding: 40px;
    border-radius: 10px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
    position: relative;
    text-align: center;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    opacity: 0.7;
    &:hover {
        opacity: 1;
    }
`;

const ModalTitle = styled.h3`
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: #fff;
`;

const ModalInput = styled.input`
    width: 100%;
    padding: 12px 15px;
    margin-bottom: 20px;
    background-color: #333;
    border: 1px solid #444;
    border-radius: 4px;
    color: #fff;
    font-size: 1rem;
    box-sizing: border-box;
    &:focus {
        border-color: #1948c7ff;
        outline: none;
    }
`;

const ModalInfo = styled.p`
    font-size: 0.9rem;
    color: #a8a8a8;
    margin-top: 15px;
`;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import styled from "styled-components";

const Detalhes = () => {
  const { tipo, id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await api.get(`/item/${tipo}/${id}/`);
        setItem(res.data);
      } catch (err) {
        console.error("Erro ao buscar item:", err);
        setErro(true);
      } finally { setLoading(false); }
    };
    fetchItem();
  }, [tipo, id]);

  if (loading) return <Loading>Carregando...</Loading>;
  if (erro || !item) return <Error>Item não encontrado.</Error>;

  return (
    <Container>
      <Button onClick={() => navigate(-1)}>← Voltar</Button>
      {item.banner && <Banner src={item.banner} alt={item.titulo} />}
      <Content>
        <Title>{item.titulo}</Title>
        {item.capa && <Cover src={item.capa} alt={item.titulo} />}
        <Description>{item.descricao}</Description>
        {item.genero && <Info><strong>Gênero:</strong> {item.genero}</Info>}
        {item.ano && <Info><strong>Ano:</strong> {item.ano}</Info>}
      </Content>
    </Container>
  );
};

export default Detalhes;

// =================== Styled Components ===================
const Container = styled.div`
  color: #fff;
  font-family: 'Roboto', sans-serif;
  padding: 2rem;
  background-color: #111;
  min-height: 100vh;
`;
const Loading = styled.p`color: #fff;`;
const Error = styled.p`color: red;`;
const Button = styled.button`
  background: #1948c7;
  color: #fff;
  border: none;
  padding: 8px 16px;
  margin-bottom: 1rem;
  cursor: pointer;
  border-radius: 4px;
  font-weight: 500;
  &:hover { background: #0f3270; }
`;
const Banner = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  margin-bottom: 2rem;
  border-radius: 8px;
`;
const Content = styled.div`max-width: 800px;`;
const Title = styled.h1`font-size: 2.5rem; margin-bottom: 1rem;`;
const Cover = styled.img`width: 300px; border-radius: 8px; margin-bottom: 1rem;`;
const Description = styled.p`font-size: 1.1rem; margin-bottom: 1rem; line-height: 1.5rem;`;
const Info = styled.p`font-size: 1rem; margin-bottom: 0.5rem;`;

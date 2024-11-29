import { Image, Alert, Text } from 'react-native';
import React, { useState } from 'react';
import { Wrapper, Container, Form, TextContainer, TextBlack, TextLink, TextLinkContainer } from './styles';
import BGTop from '../../assets/BGTop.png';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import { Button } from '../../components/Button';
import api from '../../services/api';

export default function FormScreen({ navigation }) {
  // Definindo os estados para armazenar os valores dos campos
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false); // Estado para controle de carregamento

  // Função para enviar os dados para a API e criar a conta
  const handleRegister = async () => {
    if (!nome || !email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      setLoading(true); // Inicia o carregamento
      const response = await api.post('/registrar', {
        nome,
        email,
        senha,
      });

      if (response.status === 201) {
        // Cadastro bem-sucedido, podemos redirecionar o usuário
        Alert.alert('Sucesso', 'Conta criada com sucesso!');
        navigation.navigate('Login'); // Redireciona para a tela de login após o sucesso
      }
    } catch (error) {
      console.error('Erro ao criar conta:', error);
      Alert.alert('Erro', 'Não foi possível criar a conta. Tente novamente.');
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  return (
    <Wrapper>
      <Image source={BGTop} />

      <Container>
        <Form>
          <Logo />
          <Input
            label="Nome"
            placeholder="Digite seu nome"
            value={nome}
            onChangeText={setNome}
          />
          <Input
            label="E-mail"
            placeholder="Digite seu e-mail"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            label="Senha"
            placeholder="Digite sua senha"
            value={senha}
            onChangeText={setSenha}
          />

          {/* Aqui ajustamos o botão para mostrar o texto de acordo com o estado de carregamento */}
          <Button
            title={loading ? 'Cadastrando...' : 'Criar Conta'}
            noSpacing={true}
            variant="primary"
            onPress={handleRegister}
            disabled={loading} // Desabilita o botão enquanto estiver carregando
          />

          <TextContainer>
            <TextBlack>Já tem uma conta?</TextBlack>
            <TextLinkContainer onPress={() => navigation.navigate('Login')}>
              <TextLink>Faça seu login.</TextLink>
            </TextLinkContainer>
          </TextContainer>
        </Form>
      </Container>
    </Wrapper>
  );
}

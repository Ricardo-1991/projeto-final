import React, { useState, useEffect, useContext } from 'react'; 
import { Image, FlatList, View, Text } from 'react-native';
import { Wrapper,Container, ListContainer, TextVagas } from './styles';
import BGTop from '../../assets/BGTop.png';
import Logo from '../../components/Logo';
import VagaCard from '../../components/VagaCard';
import api from '../../services/api';
import { Button } from '../../components/Button';
import { AuthContext } from '../../context/auth.context';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '../../utils/Types';
import { NavBar } from '../../components/NavBar';


export default function List() {

  const [vagas, setVagas] = useState<any[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 
  const {user, logout} = useContext(AuthContext);
  
  const navigation = useNavigation< RootNavigationProp>();

  useEffect(() => {
   
    const fetchVagas = async () => {
      try {
        const response = await api.get('/vagas'); 
      } catch (error) {
        console.error('Erro ao carregar as vagas:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchVagas(); 
  }, []); 


    const DATA = [
        {
          "id": 1,
          "titulo": "Desenvolvedor Front-end",
          "data_cadastro": "2024-06-21",
          "empresa": "Tech Solutions"
        },
        {
          "id": 2,
          "titulo": "Analista de Dados",
          "data_cadastro": "2024-06-18",
          "empresa": "Data Insights"
        },
        {
          "id": 3,
          "titulo": "Gerente de Projetos",
          "data_cadastro": "2024-06-15",
          "empresa": "Project Masters"
        },
        {
          "id": 4,
          "titulo": "Gerente de Projetos",
          "data_cadastro": "2024-06-15",
          "empresa": "Project Masters"
        },
        {
          "id": 5,
          "titulo": "Gerente de Projetos",
          "data_cadastro": "2024-06-15",
          "empresa": "Project Masters"
        },
        {
          "id": 6,
          "titulo": "Gerente de Projetos",
          "data_cadastro": "2024-06-15",
          "empresa": "Project Masters"
        },
        {
          "id": 7,
          "titulo": "Gerente de Projetos",
          "data_cadastro": "2024-06-15",
          "empresa": "Project Masters"
        }
      ]

    const handleLogout = () => {
        logout();
        navigation.navigate('LoginScreen')
    }
    return (
        <Wrapper>
            <Image source={BGTop} style={{maxHeight: 86}}/>
            <NavBar handleOnPress={handleLogout} userName={user?.name} />
            <Container>
                <Logo />
                <TextVagas>{DATA.length} vagas encontradas!</TextVagas>
                <ListContainer>
                    <FlatList
                        data={DATA}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => 
                            <VagaCard
                                id={item.id}
                                title={item.titulo} 
                                dataCreated={item.data_cadastro}
                                company={item.empresa}
                            />
                        }
                        showsVerticalScrollIndicator={true}
                        ListEmptyComponent={() => (
                            <View>
                                <Text>
                                    Você ainda não tem tarefas cadastradas
                                </Text>
                                <Text>
                                    Crie tarefas e organize seus itens a fazer.
                                </Text>
                            </View>
                        )}
                    />
                </ListContainer>

            </Container>
        </Wrapper>
    );
}

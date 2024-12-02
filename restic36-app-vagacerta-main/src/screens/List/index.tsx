import React, { useState, useEffect, useContext } from 'react'; 
import { Image, FlatList, View, Text } from 'react-native';
import { Wrapper,Container, ListContainer, TextVagas } from './styles';
import BGTop from '../../assets/BGTop.png';
import Logo from '../../components/Logo';
import VagaCard from '../../components/VagaCard';
import api from '../../services/api';
import { AuthContext } from '../../context/auth.context';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '../../utils/Types';
import { NavBar } from '../../components/NavBar';
interface JobProps{
  id: string;
  titulo: string;
  descricao: string
  telefone: string;
  status: string;
  data_cadastro: string;
  empresa: string;
}

export default function List() {

  const [vagas, setVagas] = useState<JobProps[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 
  const {user, logout} = useContext(AuthContext);
  
  const navigation = useNavigation< RootNavigationProp>();

  useEffect(() => {
   
    const fetchVagas = async () => {
      try {
        const response = await api.get('vagas'); 
        setVagas(response.data);
      } catch (error) {
        console.error('Erro ao carregar as vagas:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchVagas(); 
  }, []); 
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
                <TextVagas>{vagas.length} vagas encontradas!</TextVagas>
                <ListContainer>
                    <FlatList
                        data={vagas}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => 
                            <VagaCard
                                id={item.id}
                                title={item.titulo} 
                                description={item.descricao}
                                dataCreated={item.data_cadastro}
                                phoneNumber={item.telefone}
                                company={item.empresa}
                                status={item.status}
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

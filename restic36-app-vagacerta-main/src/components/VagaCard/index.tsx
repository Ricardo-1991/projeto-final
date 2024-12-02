import { useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Container, Content, OpenButton, Title, Data, Company } from './styles';
import { Feather } from '@expo/vector-icons';

import { RootNavigationProp, RootStackParamList } from '../../utils/Types';

interface Data{
    id: string;
    title: string;
    description: string
    phoneNumber: string;
    status: string;
    dataCreated: string;
    company: string;
  }


type Props = NativeStackScreenProps<RootStackParamList>;

export default function VagaCard({id, title, dataCreated, company, phoneNumber, status, description}: Data) {
    const navigation = useNavigation<RootNavigationProp>();
    
    return (
        <Container onPress={() => navigation.navigate('DetailsScreen', { id })}>
            <Content>
                <Title numberOfLines={1}>{title}</Title>
                <Data>{dataCreated}</Data>
                <Company numberOfLines={1}>{company}</Company>
            </Content>
            <OpenButton>
                <Feather name="chevron-right" size={24} color={'#3D6CB9'} />
            </OpenButton>
        </Container>
    );
}

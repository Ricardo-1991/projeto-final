import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { 
    Wrapper,
    Container, 
    Header, 
    HeaderButtonContainer, 
    ButtonIcon, 
    ButtonText,
    ContentContainer,
    Title,
    Description,
    Subtitle
} from '../Details/styles';
import Logo from '../../components/Logo';
import theme from '../../theme';
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '../../utils/Types';
import api from '../../services/api';
import { formatDate } from '../../utils/formate-date';
import { Alert, Linking } from 'react-native';

interface JobProps {
    id: string;
    titulo: string;
    descricao: string;
    telefone: string;
    status: string;
    data_cadastro: string;
    empresa: string;
}

interface RouteParams {
    params: {
        id: string;
    };
}

export default function Details({ route }: { route: RouteParams }) {
    const navigation = useNavigation<RootNavigationProp>();
    const [details, setDetails] = useState<JobProps | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { id } = route.params;

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await api.get<JobProps>(`vagas/${id}`);
                setDetails(response.data);
            } catch (err: any) {
                console.error(err);
                setError('Erro ao carregar os detalhes da vaga.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    const DescriptionItem = ({
        label,
        value,
    }: {
        label: string;
        value: string | undefined;
    }) => (
        <Description>
            <Subtitle>{label}:</Subtitle> {value || 'Não informado'}
        </Description>
    );

    if (isLoading) {
        return (
            <Wrapper>
                <Container>
                    <Title>Carregando...</Title>
                </Container>
            </Wrapper>
        );
    }

    if (error) {
        return (
            <Wrapper>
                <Container>
                    <Title>Erro</Title>
                    <Description>{error}</Description>
                    <Button
                        title="Tentar novamente"
                        variant="secondary"
                        onPress={() => {
                            setError(null);
                            setIsLoading(true);
                            setDetails(null);
                        }}
                    />
                </Container>
            </Wrapper>
        );
    }

    const handleSendMessage = (telefone: string, mensagem: string) => {
        try {
            const formatedNumber = telefone.replace(/\D/g, '');

            const codedMensage = encodeURIComponent(mensagem);

            const whatsappUrl = `https://wa.me/${formatedNumber}?text=${codedMensage}`;
    
            Linking.openURL(whatsappUrl).catch(() => {
                Alert.alert('Erro', 'Não foi possível abrir o WhatsApp.');
            });
        } catch (err) {
            Alert.alert('Erro', 'Ocorreu um erro ao tentar enviar a mensagem.');
            console.error(err);
        }
    };
    

    return (
        <Wrapper>
            <Header>
                <HeaderButtonContainer onPress={() => navigation.navigate('HomeScreen')}>
                    <ButtonIcon>
                        <Feather
                            size={16}
                            name="chevron-left"
                            color={theme.COLORS.BLUE}
                        />
                    </ButtonIcon>
                    <ButtonText>Voltar</ButtonText>
                </HeaderButtonContainer>
                <Logo />
            </Header>

            <Container>
                <ContentContainer>
                    <Title>{details?.titulo}</Title>
                    <DescriptionItem label="Descrição da vaga" value={details?.descricao} />
                    <DescriptionItem label="Telefone" value={details?.telefone} />
                    <DescriptionItem label="Empresa" value={details?.empresa} />
                    <DescriptionItem label="Data do cadastro" value={formatDate(details?.data_cadastro)} />
                    <DescriptionItem label="Status da vaga" value={details?.status} />
                </ContentContainer>
                {details?.status === 'Aberta' && (
                    <Button
                        title="Entrar em contato"
                        noSpacing={true}
                        variant="primary"
                        onPress={() =>
                            handleSendMessage(
                                details?.telefone || '',
                                `Olá! Estou interessado na vaga: ${details?.titulo}.`
                            )
                        }
                    />
                )}
            </Container>
        </Wrapper>
    );
}

import React from 'react';
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
    Description
} from '../Details/styles';
import Logo from '../../components/Logo';
import theme from '../../theme';
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '../../utils/Types';;

export default function Details({route }) {
    const navigation = useNavigation< RootNavigationProp>();
    const {id} = route.params;

    return (
        <Wrapper>
            <Header>
                <HeaderButtonContainer onPress={() => navigation.goBack()}>
                    <ButtonIcon>
                        <Feather size={16} name="chevron-left" color={theme.COLORS.BLUE} />
                    </ButtonIcon>
                    <ButtonText>
                        Voltar
                    </ButtonText>
                </HeaderButtonContainer>
                <Logo />
            </Header>

            <Container>
                <ContentContainer>
                    <Title>{JSON.stringify(id)}</Title>
                    <Description>Com este id é possível ir no endpoint da API buscar o restante da informação.</Description>
                </ContentContainer>

                <Button 
                    title="Entrar em contato" 
                    noSpacing={true} 
                    variant='primary'
                    />
            </Container>
        </Wrapper>
    );
}

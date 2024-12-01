import React, { useContext } from 'react'; 
import { useForm, Controller } from 'react-hook-form';
import { Feather } from '@expo/vector-icons'; 
import {  
    Wrapper, 
    Container,  
    Header,  
    HeaderButtonContainer,  
    ButtonIcon,  
    ButtonText, 
    ContentContainer, 
} from '../Profile/styles'; 
import Logo from '../../components/Logo'; 
import theme from '../../theme'; 
import Input from '../../components/Input' 
import { Button } from '../../components/Button'; 
import { AuthContext } from '../../context/auth.context'; 
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '../../utils/Types';
import { Alert } from 'react-native';
 
interface userProps {
    id?: string;
    name: string;
    email: string;
    password?: string;
}
 
export default function Profile() { 
    const {user, update} = useContext(AuthContext); 
    const { control, handleSubmit } = useForm({
        defaultValues: {
            name: user.name,
            email: user.email,
            password: ''
        }
    });

    const navigation = useNavigation <RootNavigationProp>()

    const onSubmit = async (data: userProps) => {
       const updatedUser = {...user, ...data}

        try {
            await api.put(`/usuarios/${updatedUser.id}`, updatedUser);
            update(updatedUser)
            Alert.alert('Alterado com sucesso!')
            
            navigation.navigate('HomeScreen')
        }catch {

        }
    };

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
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <Input label='Nome' value={value} onChangeText={onChange} placeholder='digite seu nome'/>
                        )}
                    />
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <Input label='E-mail' value={value} onChangeText={onChange} placeholder='digite seu e-mail'/>
                        )}
                    />
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <Input label='Senha' value={value} onChangeText={onChange} placeholder='digite sua senha'/>
                        )}
                    /> 
                </ContentContainer> 
 
                <Button  
                    title="Salvar informações"  
                    noSpacing={true}  
                    variant='primary'
                    onPress={handleSubmit(onSubmit)}
                /> 
            </Container> 
        </Wrapper> 
    ); 
}
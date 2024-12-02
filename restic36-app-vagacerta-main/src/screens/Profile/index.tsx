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
import Input from '../../components/Input'; 
import { Button } from '../../components/Button'; 
import { AuthContext } from '../../context/auth.context'; 
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '../../utils/Types';
import { Alert, Text, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';
 
interface userProps {
    id?: string;
    name: string;
    email: string;
    password?: string;
}
 
export default function Profile() { 
    const { user, update } = useContext(AuthContext); 
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: user.name,
            email: user.email,
            password: '',
        }
    });

    const navigation = useNavigation<RootNavigationProp>();

    const onSubmit = async (data: userProps) => {
        const updatedUser = { ...user, ...data };
        try {
            await api.put(`/usuarios/${updatedUser.id}`, updatedUser);
            update(updatedUser);
            Alert.alert('Alterado com sucesso!');
            navigation.navigate('HomeScreen');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    Alert.alert('Erro', error.response.data.message || 'Verifique os dados enviados.');
                } else {
                    Alert.alert('Erro', error.message || 'Ocorreu um erro ao enviar os dados.');
                }
            } else {
                Alert.alert('Erro inesperado', 'Ocorreu um erro inesperado. Tente novamente mais tarde.');
            }
        }
    };

    return ( 
        <Wrapper> 
            <Header> 
                <HeaderButtonContainer 
                    onPress={() => navigation.goBack()} 
                    accessibilityLabel="Voltar para a tela anterior"
                > 
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
                        rules={{
                            required: 'O nome é obrigatório.',
                            minLength: {
                                value: 3,
                                message: 'O nome deve ter pelo menos 3 caracteres.',
                            },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <Input label="Nome" value={value} onChangeText={onChange} placeholder="Digite seu nome" />
                        )}
                    />
                    {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: 'O e-mail é obrigatório.',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Digite um e-mail válido.',
                            },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <Input label="E-mail" value={value} onChangeText={onChange} placeholder="Digite seu e-mail" />
                        )}
                    />
                    {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
                    <Controller
                        control={control}
                        name="password"
                        rules={{
                            required: 'A senha é obrigatória.',
                            minLength: {
                                value: 8,
                                message: 'A senha deve ter pelo menos 8 caracteres.',
                            },
                            validate: {
                                hasUpperCase: (value) =>
                                    /[A-Z]/.test(value) || 'A senha deve conter pelo menos uma letra maiúscula.',
                                hasNumber: (value) =>
                                    /\d/.test(value) || 'A senha deve conter pelo menos um número.',
                                hasSpecialChar: (value) =>
                                    /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                                    'A senha deve conter pelo menos um caractere especial.',
                            },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={[styles.input, errors.password && styles.errorInput]}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Digite sua senha"
                                secureTextEntry
                            />
                        )}
                    />
                    {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
                </ContentContainer> 
 
                <Button  
                    title="Salvar informações"  
                    noSpacing={true}  
                    variant="primary"
                    onPress={handleSubmit(onSubmit)}
                /> 
            </Container> 
        </Wrapper> 
    ); 
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
    },
});

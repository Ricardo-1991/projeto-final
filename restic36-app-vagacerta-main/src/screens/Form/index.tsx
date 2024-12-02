import React from 'react';
import { Image, Alert, StyleSheet } from 'react-native';
import { View, Text, TextInput, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import api from '../../services/api';
import axios from 'axios';
import BGTop from '../../assets/BGTop.png';
import { Wrapper, Container } from './styles';
import { RootNavigationProp } from '../../utils/Types';
import { useNavigation } from '@react-navigation/native';

interface FormData {
    name: string;
    email: string;
    password: string;
}

const MyForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const navigation = useNavigation<RootNavigationProp>();

    const onSubmit = async (data: FormData) => {
        try {
            await api.post('usuarios/create', data);
            Alert.alert('Cadastro realizado com sucesso!');
            navigation.navigate('LoginScreen');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    Alert.alert('Erro', error.response.data.message || 'Verifique os dados enviados.');
                } else {
                    Alert.alert('Erro', error.message || 'Ocorreu um erro ao enviar os dados.');
                }
            }
        }
    };

    return (
        <Wrapper>
            <Image source={BGTop} />
            <Container>
                <View style={styles.container}>
                    <Text style={styles.label}>Nome:</Text>
                    <Controller
                        control={control}
                        name="name"
                        rules={{
                            required: 'O nome é obrigatório.',
                            validate: (value) => value.trim() !== '' || 'O nome não pode estar vazio.',
                        }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={[styles.input, errors.name && styles.errorInput]}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Digite seu nome"
                            />
                        )}
                    />
                    {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

                    <Text style={styles.label}>E-mail:</Text>
                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: 'O e-mail é obrigatório.',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'E-mail inválido.',
                            },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={[styles.input, errors.email && styles.errorInput]}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Digite seu e-mail"
                                keyboardType="email-address"
                            />
                        )}
                    />
                    {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

                    <Text style={styles.label}>Senha:</Text>
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
                    <Button title="Enviar" onPress={handleSubmit(onSubmit)} />
                </View>
            </Container>
        </Wrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
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

export default MyForm;

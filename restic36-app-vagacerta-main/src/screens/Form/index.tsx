import React, { useState } from 'react';
import { Image } from 'react-native';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import BGTop from '../../assets/BGTop.png';
import Logo from '../../components/Logo';
import {Wrapper, Container} from './styles';


// Definir o tipo do estado de erros
interface FormErrors {
    nome?: string;
    email?: string;
    senha?: string;
}

const MyForm = () => {
    // Estados para gerenciar os campos do formulário
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});

    // Validação dos campos
    const validateFields = () => {
        const newErrors: FormErrors = {};
    
        if (!nome || typeof nome !== 'string' || nome.trim() === '') {
            newErrors.nome = 'O nome é obrigatório.';
        }
    
        if (!email || typeof email !== 'string' || !/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'E-mail inválido.';
        }
    
        // Validação de senha
        if (!senha || typeof senha !== 'string' || senha.length < 8) {
            newErrors.senha = 'A senha deve ter pelo menos 8 caracteres.';
        } else if (!/[A-Z]/.test(senha)) {
            newErrors.senha = 'A senha deve conter pelo menos uma letra maiúscula.';
        } else if (!/\d/.test(senha)) {
            newErrors.senha = 'A senha deve conter pelo menos um número.';
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
            newErrors.senha = 'A senha deve conter pelo menos um caractere especial.';
        }
    
        return newErrors;
    };

    // Enviar os dados para a API com axios
    const sendDataToAPI = async (formData: { nome: string, email: string, senha: string }) => {
        const apiUrl = 'http://10.0.2.2:3000/api/usuarios/create';
        
        console.log('Dados enviados para a API:', formData); // Adicionando log aqui
    
        try {
            const response = await axios.post(apiUrl, formData);
            console.log('Resposta da API:', response); // Verifique a resposta
    
            if (response.status === 200) {
                Alert.alert('Sucesso', 'Dados enviados com sucesso!');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    console.log('Erro 422: ', error.response.data); // Verifique a resposta de erro
                    Alert.alert('Erro', `Erro 422: ${error.response.data.message || 'Verifique os dados enviados.'}`);
                } else {
                    Alert.alert('Erro', error.message || 'Ocorreu um erro ao enviar os dados.');
                }
            } else {
                console.error(error);
            }
        }
    };

    // Lidar com a submissão do formulário
    const handleSubmit = () => {
        const validationErrors = validateFields();
    
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors); // Se houver erros, exibe-os
        } else {
            setErrors({}); // Limpa os erros
    
            // Verifique os valores de nome, email e senha antes de enviar
            console.log('Enviando dados:', { nome, email, senha });
    
            // Verifique se os dados são válidos antes de enviar
            if (!nome || !email || !senha) {
                Alert.alert('Erro', 'Preencha todos os campos corretamente.');
                return;
            }
    
            const formData = { nome, email, senha };
            sendDataToAPI(formData); // Envia os dados para a API
        }
    };

    return (
      <Wrapper>
      <Image source={BGTop} />
      <Container>
        <View style={styles.container}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput
                style={[styles.input, errors.nome && styles.errorInput]}
                value={nome}
                onChangeText={setNome}
                placeholder="Digite seu nome"
            />
            {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}

            <Text style={styles.label}>E-mail:</Text>
            <TextInput
                style={[styles.input, errors.email && styles.errorInput]}
                value={email}
                onChangeText={setEmail}
                placeholder="Digite seu e-mail"
                keyboardType="email-address"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <Text style={styles.label}>Senha:</Text>
            <TextInput
                style={[styles.input, errors.senha && styles.errorInput]}
                value={senha}
                onChangeText={setSenha}
                placeholder="Digite sua senha"
                secureTextEntry
            />
            {errors.senha && <Text style={styles.errorText}>{errors.senha}</Text>}

            <Button title="Enviar" onPress={handleSubmit} />
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

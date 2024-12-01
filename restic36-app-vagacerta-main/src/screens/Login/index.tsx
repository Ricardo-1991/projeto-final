import { Alert, Image } from 'react-native';
import { useContext, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Wrapper,
  Container,
  Form,
  TextContainer,
  TextBlack,
  TextLink,
  TextLinkContainer,
} from './styles';

import BGTop from '../../assets/BGTop.png';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import { Button } from '../../components/Button';
import { AuthContext } from '../../context/auth.context';
import {useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '../../utils/Types';

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function Login() {
    const {login, isAuthenticated} = useContext(AuthContext);
    const navigation = useNavigation<RootNavigationProp>();

    useEffect(() => {
        if (isAuthenticated) {
          Alert.alert("Bem vindo à plataforma VagaCerta!");
          navigation.navigate('HomeScreen');
        }
      }, [isAuthenticated, navigation]);

      const onSubmit = async (data: LoginFormInputs) => {
        try {
          await login(data.email, data.password);
          Alert.alert("Bem vindo à plataforma VagaCerta!");
          navigation.navigate('HomeScreen');
        } catch (error) {
          console.error('Erro ao realizar login:', error);
        }
      };

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        defaultValues: {
        email: '',
        password: '',
        },
    });

  return (
    <Wrapper>
      <Image source={BGTop} />

      <Container>
        <Form>
          <Logo />
          {/* Campo de E-mail */}
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: 'O e-mail é obrigatório.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Digite um e-mail válido.',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                label="E-mail"
                placeholder="Digite seu e-mail"
                onChangeText={onChange}
                value={value}
                error={errors.email?.message}
              />
            )}
          />

          {/* Campo de Senha */}
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: 'A senha é obrigatória.',
              minLength: {
                value: 6,
                message: 'A senha deve ter pelo menos 6 caracteres.',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Senha"
                placeholder="Digite sua senha"
                onChangeText={onChange}
                value={value}
                secureTextEntry
                error={errors.password?.message}
              />
            )}
          />
          <Button
            title="Entrar"
            noSpacing={true}
            variant="primary"
            onPress={handleSubmit(onSubmit)}
          />
          <TextContainer>
            <TextBlack>Não tem uma conta?</TextBlack>
            <TextLinkContainer onPress={() => navigation.navigate('HomeScreen')}>
              <TextLink>Crie agora mesmo.</TextLink>
            </TextLinkContainer>
          </TextContainer>
        </Form>
      </Container>
    </Wrapper>
  );
}

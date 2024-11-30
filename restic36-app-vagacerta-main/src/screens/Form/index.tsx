import React from 'react';
import { Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
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

// Schema de validação com Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatório'),
  password: Yup.string()
    .required('A senha é obrigatória')
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .matches(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .matches(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
    .matches(/[0-9]/, 'A senha deve conter pelo menos um número')
    .matches(/[\W_]/, 'A senha deve conter pelo menos um caractere especial'),
});

export default function FormScreen({ navigation }) {
  return (
    <Wrapper>
      <Image source={BGTop} />

      <Container>
      <Formik
  initialValues={{ name: '', email: '', password: '' }}
  validationSchema={validationSchema}
  onSubmit={(values) => {
    console.log('Form Values:', values);
  }}
>
  {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
    <Form>
      <Logo />
      <Input
        label="Nome"
        placeholder="Digite seu nome"
        value={values.name}
        onChangeText={handleChange('name')}
        onBlur={handleBlur('name')}
        error={touched.name && errors.name} // Exibe o erro se o campo foi tocado
      />
      <Input
        label="E-mail"
        placeholder="Digite seu e-mail"
        value={values.email}
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        error={touched.email && errors.email}
      />
      <Input
        label="Senha"
        placeholder="Digite sua senha"
        secureTextEntry
        value={values.password}
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        error={touched.password && errors.password}
      />
      <Button
        title="Entrar"
        noSpacing
        variant="primary"
        onPress={() => handleSubmit()}
      />
      <TextContainer>
        <TextBlack>Já tem uma conta?</TextBlack>
        <TextLinkContainer onPress={() => navigation.navigate('Login')}>
          <TextLink>Faça seu login.</TextLink>
        </TextLinkContainer>
      </TextContainer>
    </Form>
  )}
</Formik>

      </Container>
    </Wrapper>
  );
}
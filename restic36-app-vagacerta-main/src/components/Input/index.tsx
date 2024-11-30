import { TextInputProps } from "react-native";
import { Container, Label, Field, ErrorMessage } from './styles';

interface FieldProps extends TextInputProps {
  label: string;
  placeholder?: string;
  name?: string;
  error?: string; // Mensagem de erro
}

export default function Input({ label, placeholder, name, error, ...rest }: FieldProps) {
  return (
    <Container>
      <Label>{label}</Label>
      <Field 
        placeholder={placeholder}
        value={name} 
        placeholderTextColor="#2D767F" 
        {...rest} 
        style={error ? { borderColor: 'red', borderWidth: 1 } : {}}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
}

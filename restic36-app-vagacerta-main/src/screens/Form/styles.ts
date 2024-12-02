import { styled } from 'styled-components/native';

export const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  width: 100%;
  padding: 16px;
  gap: 16px;
  background-color: ${({theme})=>theme.COLORS.WHITE};
`;

export const Container2 = styled.View`
  align-items: left;
  width: 100%;
  gap: 4px;
`;

export const Form = styled.View`
  flex: 1;
  gap: 16px;
  width: 100%;
  align-items: center;
`;

export const TextContainer = styled.View`
  flex-direction: row;
  gap: 8px;
  width: max-content;
`;

export const TextBlack = styled.Text`
  font-size: ${({theme})=>theme.FONT_SIZE.SM}px;
  font-weight: 700;
  text-align: center;
  color: ${({theme})=>theme.COLORS.BLACK};
`;

export const TextLinkContainer = styled.TouchableOpacity`
  width: auto;
`;

export const TextLink = styled.Text`
  font-size: ${({theme})=>theme.FONT_SIZE.SM}px;
  font-weight: 700;
  text-align: center;
  color: ${({theme})=>theme.COLORS.GRAY_03};
`;


export const Label = styled.Text`
  font-size: 14px;
  font-weight: bold;
  line-height: 16px;
  text-align: left;
  color: ${({theme})=>theme.COLORS.GREEN};
`;

export const Field = styled.TextInput`
    border: 1px solid ${({theme})=>theme.COLORS.GRAY_02};
    border-radius: 8px;
    padding: 16px;
    background-color: ${({theme})=>theme.COLORS.GRAY_01};
    width: 100%;
`;

export const ButtonText = styled.Text`
  position: absolute;
  font-weight: 700;
  font-size: 18px;
  text-align: center;
  color: ${({theme})=>theme.COLORS.BLUE};
  border-radius: 8px;
  padding: 12px;
  margin: 5px;
  left: 25px;
  top: 225px;

  /*font-size: ${({theme})=>theme.FONT_SIZE.SM}px;
  font-weight: 700;
  text-align: center;
  padding: 12px;
  margin: 5px;
  background-color: ${({theme})=>theme.COLORS.WHITE};
  border-radius: 8px;
  color: ${({theme})=>theme.COLORS.BLUE};
  margin-top: 10px;
  left: 10px;*/
  
`;
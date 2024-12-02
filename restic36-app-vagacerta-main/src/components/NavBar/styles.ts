import styled from "styled-components/native";

export const NavBarApp = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding: 5px 16px;
  align-items: center;
  gap: 10px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({theme})=>theme.COLORS.GREEN};
`;
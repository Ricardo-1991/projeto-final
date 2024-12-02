import { Text, TouchableOpacity } from "react-native";
import { Button } from "../Button";
import { NavBarApp } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationProp } from "../../utils/Types";

interface NavBarAppProps {
  userName: string
  handleOnPress: () => void
}

export function NavBar({userName, handleOnPress}: NavBarAppProps) {
    const navigation = useNavigation<RootNavigationProp>();
    return (
      <NavBarApp>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <Text style={{fontWeight: 'bold'}}>Bem-vindo, {userName}! (Editar Perfil)</Text>
        </TouchableOpacity>
        <Button
          title="logout"
          variant="primary"
          noSpacing
          onPress={handleOnPress}
        />
      </NavBarApp>
    );
}
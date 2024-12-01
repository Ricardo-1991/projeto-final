import { StackNavigationProp } from "@react-navigation/stack";

export type TaskProps = {
    id: number;
    title: String;
    date: String;
    company: String;
};

// Define as rotas e seus parâmetros
export type RootStackParamList = {
    LoginScreen: undefined;
    FormScreen: undefined;
    HomeScreen: undefined;
    ProfileScreen: undefined;
    DetailsScreen: {id: number};
};

export type RootNavigationProp = StackNavigationProp<RootStackParamList>;



import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import List from './List';
import MyForm from './Form';
import Details from './Details';
import Profile from './Profile';


const Stack = createNativeStackNavigator();

export function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginScreen" component={Login} />
        <Stack.Screen name="HomeScreen" component={List} />
        <Stack.Screen name="FormScreen" component={MyForm} />
        <Stack.Screen name="DetailsScreen" component={Details} />
        <Stack.Screen name="ProfileScreen" component={Profile} />
    </Stack.Navigator>
  );
}

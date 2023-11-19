import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import TabNavigation from './TabNavigation';
import Register from '../screens/Register';
import Login from '../screens/Login';
import Comments from '../screens/Comments';
import UserProfile from '../screens/UserProfile';
import MyProfile from '../screens/MyProfile';
import AgregarFoto from '../screens/AgregarFoto';

const Stack = createNativeStackNavigator();

export default function MainNavigaton(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                name= 'Register'
                component={Register}
                options={{
                    headerShown: false
                }} 
                />
                <Stack.Screen
                name= 'Login'
                component={Login}
                options={{
                    headerShown: false
                }} 
                />
                <Stack.Screen
                name= 'TabNavigation'
                component={TabNavigation}
                options={{
                    headerShown: false
                }} 
                />
                <Stack.Screen
                name= 'Comments'
                component={Comments} 
                />
                <Stack.Screen
                 name='UserProfile'
                component={UserProfile}
                />
                <Stack.Screen
                name='MyProfile'
                component={MyProfile}
                />
                <Stack.Screen
                name='AgregarFoto'
                component={AgregarFoto}
                options={{
                    headerShown: false
                  }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}
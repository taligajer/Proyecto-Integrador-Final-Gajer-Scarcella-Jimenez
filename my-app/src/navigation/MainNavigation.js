import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import TabNavigation from './TabNavigation';
import Register from '../screens/Register';
import Login from '../screens/Login';
import Comments from '../screens/Comments';
import UserProfile from '../screens/UserProfile';

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
                name= 'Profile'
                component={UserProfile} 
                />


            </Stack.Navigator>
        </NavigationContainer>
    )
}
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import TabNavigation from './TabNavigation';
import Register from '../screens/Register';
import Login from '../screens/Login';
import Comments from '../screens/Comments';

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
            </Stack.Navigator>
        </NavigationContainer>
    )
}
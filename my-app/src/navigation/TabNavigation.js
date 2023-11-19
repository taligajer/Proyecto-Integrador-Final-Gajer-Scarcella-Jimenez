import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { FontAwesome5 } from '@expo/vector-icons';
import Home from '../screens/Home'
import Profile from '../screens/MyProfile'
import Search from '../screens/Search'
import NewPost from '../screens/NewPost'

const Tab = createBottomTabNavigator();

export default function TabNavigaton(){
    return(
        <Tab.Navigator>
            <Tab.Screen
            name='Home'
            component={Home}
            options={{
                headerShown: false,
                tabBarIcon: ()=> <FontAwesome5 name='home' size={20} color="#002454" />
                
            }}
            />
            <Tab.Screen
            name='Profile'
            component={Profile}
            options={{
                headerShown: false,
                tabBarIcon: () => <FontAwesome5 name='user' size={20} color= "#002454" />

            }}
            />
            <Tab.Screen
            name='Search'
            component={Search}
            options={{
                headerShown: false,
                tabBarIcon: () => <FontAwesome5 name='search' size={20} color="#002454" />
            }}
            />
            <Tab.Screen
            name='NewPost'
            component={NewPost}
            options={{
                headerShown: false,
                tabBarIcon: () => <FontAwesome5 name='camera' size={20} color="#002454" />
            }}
            />
        </Tab.Navigator>
    )
}
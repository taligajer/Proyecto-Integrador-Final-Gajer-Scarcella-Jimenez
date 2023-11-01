import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'
import Profile from '../screens/Profile'
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
                headerShown: false
            }}
            />
            <Tab.Screen
            name='Profile'
            component={Profile}
            options={{
                headerShown: false
            }}
            />
            <Tab.Screen
            name='Search'
            component={Search}
            options={{
                headerShown: false
            }}
            />
            <Tab.Screen
            name='NewPost'
            component={NewPost}
            options={{
                headerShown: false
            }}
            />
        </Tab.Navigator>
    )
}
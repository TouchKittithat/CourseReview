import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Register from './Screens/Register';
import Detail from './Screens/Detail';
import Login from './Screens/Login';
import Profile from './Screens/Profile';
import Home from './Screens/Home';
import Review from './Screens/Review';
import ForgetPW from './Screens/FogetPW';
import MyReview from './Screens/MyReview';

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        
        <Stack.Screen 
          name='Login' 
          component={Login} 
        />
        <Stack.Screen 
          name='Home' 
          component={Home} 
        />
        
        <Stack.Screen 
          name='Register' 
          component={Register} 
        />
        <Stack.Screen 
          name='Detail'
          component={Detail}
        />
        <Stack.Screen 
          name='Profile'
          component={Profile}
        />
        
        <Stack.Screen 
          name='ForgetPW' 
          component={ForgetPW} 
        />
         <Stack.Screen 
          name='Review' 
          component={Review} 
        />
        <Stack.Screen 
          name='MyReview' 
          component={MyReview} 
        />
        
        
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}


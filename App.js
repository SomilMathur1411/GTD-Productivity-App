//import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import InboxScreen from './src/screens/InboxScreen';
import NextActionsScreen from './src/screens/NextActionsScreen';
import ProjectsScreen from './src/screens/ProjectsScreen';
import ProcessScreen from './src/screens/ProcessScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigator for Inbox flow
function InboxStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="InboxMain" 
        component={InboxScreen} 
        options={{ title: 'Inbox' }}
      />
      <Stack.Screen 
        name="Process" 
        component={ProcessScreen} 
        options={{ title: 'Process Item' }}
      />
    </Stack.Navigator>
  );
}

// Main tab navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Inbox') {
            iconName = focused ? 'mail' : 'mail-outline';
          } else if (route.name === 'NextActions') {
            iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
          } else if (route.name === 'Projects') {
            iconName = focused ? 'folder' : 'folder-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Inbox" component={InboxStack} />
      <Tab.Screen 
        name="NextActions" 
        component={NextActionsScreen}
        options={{ title: 'Next Actions' }}
      />
      <Tab.Screen name="Projects" component={ProjectsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
}
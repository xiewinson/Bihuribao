import { AppRegistry } from 'react-native';
import MainScreen from './src/pages/MainScreen';
import DetailScreen from './src/pages/DetailScreen';
import { StackNavigator } from 'react-navigation';

const App = StackNavigator({
    Main: { screen: MainScreen },
    Detail: { screen: DetailScreen },
});
AppRegistry.registerComponent('Bihuribao', () => App);

import React from 'react';
import { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  NativeModules,
  ToastAndroid,
} from 'react-native';
import { timeFormats, colors, dimens, urls } from '../component/constants';
import ZhihuItemView from '../component/ZhihuItemView';
interface Props {

}

interface DailyItem {
  id: number;
  type: number;
  title: string;
  ga_prefix: string;
  images: string[];
}

interface State {
  dailyList: DailyItem[];
  dailyListRefreshing: boolean;
  currentDate: string;
}
export default class MainScreen extends Component<Props, State> {

  static navigationOptions = {
    title: "首页"
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      dailyList: [],
      dailyListRefreshing: false,
      currentDate: ""
    }
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.dailyList}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          renderItem={({ item, index }) =>
            <ZhihuItemView
              title={item.title}
              iconUrl={item.images[0]}
            />
          }
          onRefresh={
            () => {
              this.loadDailyList(true);
            }
          }
          onEndReached={
            (distanceFromEnd) => {
              this.loadDailyList(false)
            }
          }
          onEndReachedThreshold={0.5}
          refreshing={this.state.dailyListRefreshing}
          ItemSeparatorComponent={() => <View style={styles.listDivider} />}
        />
      </View >
    );
  }
  componentDidMount() {
    this.loadDailyList(true);
  }

  loadDailyList(useRefresh: boolean) {
    if (useRefresh) {
      this.setState({ dailyListRefreshing: true })
    }
    fetch(useRefresh ? urls.dailyListLatest : urls.dailyListBefore + this.state.currentDate)
      .then(value => value.json())
      .then(result => {
        this.setState({
          dailyList: useRefresh ? result.stories : [...this.state.dailyList, ...result.stories],
          currentDate: result.date,
          dailyListRefreshing: false
        })
      })
      .catch(error => {
        alert(error);
        this.setState({ dailyListRefreshing: false })
      });
  }
}

const styles = StyleSheet.create({
  listDivider: {
    width: "100%",
    paddingLeft: dimens.paddingL,
    paddingRight: dimens.paddingL,
    height: 1,
    backgroundColor: colors.grayLight
  }
});

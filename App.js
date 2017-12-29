import React from 'react';
import Header from './Header'
import Footer from './Footer'
import { StyleSheet, Text, View, Platform } from 'react-native';

export default class App extends React.Component {
  state = {
    value: "",
    items: []
  }

  handleAddItem = () => {

  }

  render() {
    return (
      <View style={styles.container}>
        <Header value={this.state.value} onAddItem={this.handleAddItem}/>
        <View>
          <Text style={styles.content}>content.</Text>
        </View>
        <Footer/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebf9ff',
    ...Platform.select({
      android: {
        paddingTop: 40
      }
    })
  },
  content: {
    color: "#f9f9f9"
  }
});

import React from 'react';
import Header from './Header'
import Footer from './Footer'
import { StyleSheet, Text, View, Platform } from 'react-native';

export default class App extends React.Component {
  state = {
    value: "",
    items: [],
    allComplete: false
  }

  handleAddItem = () => {
    if(!this.state.value) return;
    const newItems = [
      ... this.state.items,
      {
        key: Date.now(),
        text: this.state.value,
        complete: false
      }
    ]

    this.setState({
      items: newItems,
      value: ""
    })
  }

  HandleToggleAllComplete() {
    const complete = !this.state.allComplete
    const newItems = this.state.items.map((item) => ({
      ... item,
      complete
    }))

    this.setState({
      items: newItems,
      allComplete: complete
    })

    console.table(this.state.items)
  }

  render() {
    return (
      <View style={styles.container}>
        <Header 
          value={this.state.value} 
          onAddItem={this.handleAddItem} 
          onChange={(value)=>this.setState({ value })}
          onToggleAllComplete={this.HandleToggleAllComplete}/>
        <View>
          <Text style={styles.content}>content</Text>
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

import React from 'react';
import Header from './Header'
import Footer from './Footer'
import { StyleSheet, Text, View, Platform, ListView, Keyboard } from 'react-native'
import Row from './Row'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class App extends React.Component {
  state = {
    value: "",
    items: [],
    allComplete: false,
    dataSource: ds.cloneWithRows([])
  }

  setSource(items, itemsDataSource, otherState = {}){
    this.setState({
      items,
      dataSource: this.state.dataSource.cloneWithRows(itemsDataSource),
      ... otherState
    })
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
    this.setSource(newItems,newItems, { value : "" } )
  }

  HandleToggleAllComplete() {
    console.log(this.state.allComplete);

    const complete = !this.state.allComplete;
    const newItems = this.state.items.map((item) => ({
      ... item,
      complete
    }))

    this.setSource(newItems, newItems, { allComplete: complete })

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
        <View style={styles.content}>
          <ListView 
            style={styles.list}
            enableEmptySections
            dataSource={this.state.dataSource}
            onScroll={() => Keyboard.dismiss()}
            renderRow={({ key, ... value}) =>  {
              return (
                <Row 
                  key={key}
                  {... value}
                />
              )
            } }
            renderSeparator={(sectionId, rowId) => {
              return (
                <View key={rowId} style={styles.separator}/>
              )
            }}
          />
        </View>
        <Footer/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    ...Platform.select({
      android: {
        paddingTop: 40
      }
    })
  },
  content: {
    flex: 1
  },
  list: {
    backgroundColor: "#FFF"
  },
  separator: {
    borderWidth: 1,
    borderColor: "#F5F5F5"
  }
});
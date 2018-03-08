import React from 'react';
import Header from './Header'
import Footer from './Footer'
import { StyleSheet, Text, View, Platform, ListView, Keyboard } from 'react-native'
import Row from './Row'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const filterItems = (filter, items) => {
  return items.filter( item => {
    if(filter === "ALL") return true;
    if(filter === "COMPLETED") return item.complete;
    if(filter === "ACTIVE") return !item.complete;
  })
}

export default class App extends React.Component {
  state = {
    filter: "ALL",
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

  handleToogleComplete = (key, complete) => {
    console.log(key, complete)
    const newItems = this.state.items.map( item => {
      if(item.key !== key) return item;
      return {
        ... item,
        complete
      }
    })
    this.setSource(newItems, filterItems(this.state.filter, newItems))
  }

  handleFilter = (filter) => {
    this.setSource(this.state.items, filterItems(filter, this.state.items), {filter})
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

  handleRemoveItem = (key) => {
    const newItems = this.state.items.filter( item => {
      return item.key !== key
    })
    this.setSource(newItems, filterItems(this.state.filter, newItems))
  }

  HandleToggleAllComplete = () => {
    console.log(this.state.allComplete);

    const complete = !this.state.allComplete;
    const newItems = this.state.items.map((item) => ({
      ... item,
      complete
    }))

    this.setSource(newItems, filterItems(this.state.filter, newItems), { allComplete: complete })
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
                  onRemove={() => this.handleRemoveItem(key)}
                  onComplete={(complete) => this.handleToogleComplete(key, complete)}
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
        <Footer filter={this.state.filter} onFilter={this.handleFilter}/>
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
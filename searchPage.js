'use strict';

import React, { Component } from 'react';


import {debounce} from 'throttle-debounce'
import axios from 'axios'
import OfflineComponent from './offlineComponent'

import {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    ListView,
    Text,
    TextInput,
    FlatList,
    ActivityIndicator,
    Modal,
    WebView,
    Dimensions
} from 'react-native';

import {
    List,
    ListItem,
    SearchBar,
    Button,
    Icon
} from 'react-native-elements'

const searchUrl = 'https://api.github.com/search/repositories'

var {height, width} = Dimensions.get('window');
class searchPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            searchString: '',
            page: 1,
            isLoading: false,
            sorting: false,
            sort: '',
            order: 'desc',
            dataSource: [],
            modalVisible: false
        }
        this.search = debounce(300, this.search)
    }


    onSearchStringChange(text){
        this.setState({
            searchString: text,
        })
        if(!!this.state.searchString && !!this.state.searchString.length > 0){
            this.search()
        }
        
    }

    clearData(event){
        this.setState({
            searchString: '',
            dataSource: [],
            sorting: false,
            sort:'',
            order: 'desc'
        })
    }

    search(){
            this.setState({
                isLoading: true
            })

            axios.get(searchUrl,{
                params:{
                    q:this.state.searchString,
                    sort: this.state.sorting ? this.state.sort : '',
                    order: this.state.sorting ? this.state.order : '',
                    per_page: 15,
                    page: this.state.page
                }
            })
            .then(response=> {
                console.log(response)
                this.setState({
                    isLoading:false,
                    dataSource: this.state.page === 1 ?  response.data.items : [...this.state.dataSource, ...response.data.items]
                })
                console.log(this.state.dataSource)
            })
            .catch(error =>{
                console.warn(error)
                this.setState({
                    isLoading:false,
                    dataSource: []
                })
            })
    }

    sortingByStars= () =>{
        this.setState({
            sorting: true,
            sort: 'stars',
            order: this.state.order === 'desc'? 'asc' : 'desc'
        })
        console.log(this.state)
        this.search()
    }

    sortingByForks= () =>{
        this.setState({
            sorting: true,
            sort: 'forks',
            order: this.state.order === 'desc'? 'asc' : 'desc'
        })
        console.log(this.state)
        this.search()
    }


    loadMore =  () =>{
       
        if(!!this.state.searchString && !!this.state.searchString.length > 0 && this.state.dataSource.length > 0){
            this.setState({
                page: this.state.page + 1
            })
            this.search()
              
        }
        
    }

    _renderHeader = () => {
        return <SearchBar 
        placeholder="Type Here..."
        onChangeText={this.onSearchStringChange.bind(this)}
        onClearText={this.clearData.bind(this)}
        value={this.state.searchString}
        icon={{ type: 'font-awesome', name: 'search' }}
        lightTheme
        clearIcon
        round={false} />;
    
      };

      _renderFooter = () => {
        if (!this.state.isLoading) return null;
    
        return (
          <View
            style={{
              paddingVertical: 0,
              borderTopWidth: 1,
              borderColor: "#CED0CE"
            }}
          >
            <ActivityIndicator animating size="large" />
          </View>
        );
      };

      _renderFilters(){
          if(this.state.dataSource.length > 0){
              return (
                <View style={{flex: 2, width}}
                visible={this.state.dataSource.length > 0}>
                    <Button 
                        style={{marginBottom: 15}}
                        borderRadius={4}
                        backgroundColor={'green'}
                        fontSize={14}
                        onPress={this.loadMore.bind(this)}
                        title='Load more'
                    />
                
                    <View style={styles.buttonWrap}>
                    <Button
                        borderRadius={4}
                        backgroundColor={this.state.sort === 'stars'? 'green' :''}
                        onPress={this.sortingByStars.bind(this)}
                        fontSize={14}
                        icon={ this.state.order === 'asc' && this.state.sort === 'stars'? {name: 'arrow-upward'} : {name: 'arrow-downward'}}
                        title='Stars' />
                    <Button
                        fontSize={14}
                        onPress={this.sortingByForks.bind(this)}
                        borderRadius={4}
                        backgroundColor={this.state.sort === 'forks'? 'green' :''}
                        icon={ this.state.order === 'asc' && this.state.sort === 'forks' ? {name: 'arrow-upward'} : {name: 'arrow-downward'}}
                        title='Forks' />
                        </View>
                </View>
              );
          }else{
              return null;
          }
      }


    render(){
        return(
            <View style={styles.container}>
              <OfflineComponent/>
            <List
             containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 , flex: 8, paddingBottom: 20}} >
            <FlatList
            contentContainerStyle={{top: -20}}
            style={{top:0, paddingTop:0,
                 marginTop: 0,
                  borderTopWidth: 0,
                     width}}
                bounces={false}
                data={this.state.dataSource}
                ListHeaderComponent={this._renderHeader}
                ListFooterComponent={this._renderFooter}
                stickyHeaderIndices={[0]}
                renderItem={({ item }) => (
                    <ListItem
                    automaticallyAdjustContentInsets={false}
                      roundAvatar
                      onPress={()=>{this.setState({modalVisible: true, repoUrl: item.html_url})}}
                      title={`${item.full_name}`}
                      subtitle={'stars : ' + item.stargazers_count + ' / forks: ' + item.forks}
                      avatar={{ uri: item.owner.avatar_url }}
                    />
                  )}
                //   onEndReached={this.loadMore}
                //   onEndThreshold={0}
                  />
          
            </List>
           
           {this._renderFilters()}

            <Modal
            animationType = {"slide"} transparent = {true}
            visible={this.state.modalVisible}
    
            >
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                <View style={{
                        width: '80%',
                        borderRadius: 5,
                        backgroundColor: '#fff',
                        padding: 5,
                        height: '80%'}}>
                        <View style={styles.alignRightWrap}>
                    
                       <Icon
                            name='clear'
                            onPress={()=>{this.setState({modalVisible: false, repoUrl:''})}}
                            color='#000' />
                            </View>
                        
                        
                <WebView
                source={{uri: this.state.repoUrl}}/>
                </View>
            </View>
                
                
            </Modal>
            </View>
    
        );


        };
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 0,
        marginTop: 0,
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 20
    
    },
    listWrapper:{
           flex: 1,
           flexDirection: 'column',
            alignItems: 'flex-start'
        },
    wrap:{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
      },
      alignRightWrap:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        alignSelf: 'stretch',
        marginBottom: 5
      },
      buttonWrap:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        alignSelf: 'stretch'
      }
})

module.exports = searchPage;
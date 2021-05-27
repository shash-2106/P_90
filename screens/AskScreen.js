import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,TextInput, KeyboardAvoidingView, ScrollView, Modal } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import {RFValue} from 'react-native-responsive-fontsize';
import Animation from '../Components/Animation';
import { render } from 'react-dom';

export default class AskScreen extends React.Component{
    constructor(){
        super();
        this.state ={
          userId : firebase.auth().currentUser.email,
          question:"",
          topic:"",
          requestId:"",
      userDocId:"",
      isBookRequestActive:"",
      showFlatlist:false
        }
      }
    
      createUniqueId(){
        return Math.random().toString(36).substring(7);
      }
    
    componentDidMount(){
      this.getBookRequest();
      this.getIsBookRequestActive();
    }
    getQuestion=()=>{
      var bookRequest = db.collection("questions").where("user_id","==",this.state.userId).get().then((snapshot)=>{snapshot.forEach((doc)=>{
       
         
          this.setState({
            requestId:doc.data().request_id,
            requestedBookName:doc.data().book_name,
            bookStatus:doc.data().book_status,
            docId:doc.id
          })
        })})
    }
    getIsBookRequestActive=()=>{
        db.collection("users").where("email_id","==",this.state.userId).onSnapshot((snapshot)=>{snapshot.forEach((doc)=>{this.setState({
          isBookRequestActive:doc.data().isBookRequestActive,
          userDocId:doc.id
        })})})
      }
    addQuestion = async(question,topic)=>{
        var userId = this.state.userId
        var randomRequestId = this.createUniqueId()
            
        db.collection('questions').add({
            "user_id": userId,
            "question":question,
            "topic":topic,
            "request_id"  : randomRequestId,           
            "date":firebase.firestore.FieldValue.serverTimestamp(),
           
        })
        await this.getBookRequest()
          db.collection("users").where("email_id","==",userId).get().then().then((snapshot)=>{
            snapshot.forEach((doc)=>{db.collection("users").doc(doc.id).update({
              isBookRequestActive:true
            })})
          })
        
    
        this.setState({
            question :'',
            topic : '',
            requestId:randomRequestId
        })
    
        return Alert.alert("Question asked successfully");
      }

     
    render(){
    
  
      return(
        <View style={{flex:1}}>
            <Text>Ask</Text>
            <View>
            <TextInput
             
              placeholder={"enter question"}
                   onChangeText={(text)=>{
                       this.setState({
                           question:text
                       })
                   }}      
              value={this.state.bookName}
            />
           
            <View>
            <TextInput
              style ={{height:300}}
                            numberOfLines ={8}
              placeholder={"topic"}
              onChangeText ={(text)=>{
                  this.setState({
                      topic:text
                  })
              }}
              value ={this.state.topic}
            />
           
            <TouchableOpacity
             
              onPress={()=>{this.addRequest(this.state.question,this.state.topic)}}
              >
              <Text>Ask</Text>
            </TouchableOpacity>
            </View>
            
      </View>
      </View>
  
      )
    
        
        
    }
}
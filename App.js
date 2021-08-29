import React , {useState} from 'react';
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons , AntDesign } from '@expo/vector-icons';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  const [items, setItems] = useState([
    {
      content: 'Item 1',
      time: '10:50 PM'
    },
    {
      content: 'Item 2',
      time: '11:30 PM'
    },
    {
      content: 'Item 3',
      time: '11:45 PM'
    },
    {
      content: 'Item 4',
      time: '00:00 PM'
    },
    {
      content: 'Item 5',
      time: '00:32 PM'
    },
    {
      content: 'Item 6',
      time: '10:50 PM'
    },
    {
      content: 'Item 7',
      time: '11:30 PM'
    },
    {
      content: 'Item 8',
      time: '11:45 PM'
    },
    {
      content: 'Item 9',
      time: '00:00 PM'
    },
    {
      content: 'Item 10',
      time: '00:32 PM'
    }
  ]);
  
  const [title, setTitle] = useState(null);

  const submitNote = async () => {
    setItems([...items, {content: title, time: getTime()}]);
  }

  function Track({content, time}) {
    const [selected, setSelected] = useState(false)

    return (
      <TouchableOpacity onPress={() => {setSelected(!selected)}} style={[styles.touchable, {backgroundColor: selected? '#afd4e4' : '#fff'}]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{width: '80%', fontSize: 15, opacity: 0.6}}>{content + '\n' + time}</Text>
            <TouchableOpacity style={{width: '10%', marginLeft: '6%'}}>
              <AntDesign name="edit" size={30} color="#A0A0A0" />
            </TouchableOpacity>
          </View>
      </TouchableOpacity>
    )
  }

  function getTime() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDay();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if (hours > 11) {
      return month + '/' + day + '/' + year + ', ' + hours + ':' + minutes + ' PM';
    } else {
      return month + '/' + day + '/' + year + ', ' + hours + ':' + minutes + ' AM'
    }
  }

  return (
      <View style={styles.container}>
        <Text style={styles.title}>may 5, 2021, 10:51 PM</Text>
        <View style={{width: '100%', flexDirection: 'row', marginBottom: 20}}>
          <TextInput placeholder={'Pesquisar...'} style={styles.text_input}></TextInput>
          <TouchableOpacity
          onPress={() => {setModalVisible(true)}}
          style={{width: '10%', marginLeft: '5%'}}>
            <Ionicons name="add-circle-outline" size={35} color="green" />
          </TouchableOpacity>
          <TouchableOpacity style={{width: '10%'}}>
            <Ionicons name="trash-outline" size={35} color="red" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={items}
          style={{width: '100%'}}
          renderItem={( {item } ) => (
            <Track
              content = {item.content}
              time = {item.time}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        
        <Modal
        visible={modalVisible}
        animationType='slide'>
          <View style={styles.modal}>
            <TouchableOpacity style={{alignSelf: 'flex-end', paddingRight: 10}} onPress={() => {setModalVisible(false)}}>
              <Ionicons name="close-circle-outline" size={30} color="red" />
            </TouchableOpacity>
            <TextInput
            onChangeText={(text) => {setTitle(text)}}
            placeholder='Título'
            style={{width: '90%', borderBottomWidth: 0.5, fontSize: 30}}
            />
            <View
            onPress={() => {setFocus(true)}}
            style={{height: '75%', width: '90%', alignItems: 'center', marginVertical: 20, backgroundColor: 'white'}}>
              <TextInput
              multiline
              placeholder={'Comece a escrever'}
              style={{width: '100%', fontSize: 18}}>

              </TextInput>
            </View>
            <TouchableOpacity
            style={{height: 40, width: '90%', borderRadius: 5, alignItems: 'center', justifyContent: 'center', backgroundColor: 'green'}}
            onPress={submitNote}>
              <Text style={{fontSize: 18, color: 'white'}} >Salvar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50
  },
  title: {
    width: '50%',
    fontSize: 15,
    fontWeight: 'bold',
    opacity: 0.5,
    marginLeft: '5%',
    marginBottom: 10
  },
  text_input: {
    height: 40,
    width: '60%',
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: '7%',
    borderWidth: 1,
    borderColor: '#C8C8C8'
  },
  touchable: {
    width: '90%',
    height: 80,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: '2%',
    borderBottomWidth: 1,
    borderBottomColor: '#C8C8C8'
  },
  modal: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10
  }
});

import React, {useEffect, useState} from 'react';
import {addTodo, selectCurrentTodo, selectTodos, unSetCurrentTodo, updateTodo} from '../store/todoSlice';
import {useDispatch, useSelector} from 'react-redux';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import TodoItem from '../components/todoItem';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from '@rneui/base';
const TodoList: React.FC = () => {
  const [newTodo, setNewTodo] = useState('');
  const todos = useSelector(selectTodos);
  const currentTodo = useSelector(selectCurrentTodo);
  const dispatch = useDispatch();
  const handleAddTodo = () => {
    console.log(newTodo, currentTodo);
    if (newTodo.trim()) {
        if(currentTodo){
            dispatch(updateTodo({id: currentTodo.id, name: newTodo}));
            setNewTodo('');
            dispatch(unSetCurrentTodo())
        }else{
            dispatch(addTodo(newTodo));
            setNewTodo('');
        }
    }
  };
  useEffect(()=>{
    if(currentTodo){
        setNewTodo(currentTodo.name);
    }else{
        setNewTodo("");
    }
  },[currentTodo])
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Bienvenu dans Todo App
        <Icon name="rocket" size={30} color="#900" />
      </Text>
      <View style={styles.inputContainer}>
        <View style={{flex: 4}}>
        <Input
          placeholder="Ajouter une nouvelle tache"
          leftIcon={{type: 'font-awesome', name: 'list'}}
          onChangeText={value => setNewTodo(value)}
          value={newTodo}
        />
        </View>

        <View>
        <Button radius={'sm'} type="solid" style={{flex: 1}} onPress={handleAddTodo}>
          Save
          <Icon name="save" color="white" />
        </Button>
        </View>
        
       
        {/* <TextInput style={styles.input} 
                placeholder="Ajouter une nouvelle tache"
                value={newTodo}
                onChangeText={setNewTodo} /> */}
        {/* <TouchableOpacity style={styles.addButton} 
                onPress={handleAddTodo}>
                    <Text style={{color: "white"}}>Ajouter</Text>
                </TouchableOpacity> */}
      </View>
      <FlatList
        data={todos}
        keyExtractor={item => item.id + ''}
        renderItem={({item}) => <TodoItem item={item} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TodoList;

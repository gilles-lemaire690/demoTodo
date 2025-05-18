import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Todo from "../models/todo";
import { deleteTodo, setCurrentTodo, toggleTodo } from "../store/todoSlice";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon  from "react-native-vector-icons/FontAwesome";
import { Button, Dialog, ListItem } from "@rneui/base";

interface TodoItemProps{
    item: Todo
}

const TodoItem:React.FC<TodoItemProps>=({item})=>{
    const dispatch = useDispatch();
    const [showDialog, setShowDialog] = useState(false);
    const handleToggle = () => {
        dispatch(toggleTodo(item.id))
    }
    const setTodo=(t:Todo)=>{
        dispatch(setCurrentTodo(t));
    }
    const handleDelete = () => {
        dispatch(deleteTodo(item.id))
    }
    return(
        <>
        <ListItem.Swipeable bottomDivider
        leftContent={(reset) => (
            <Button
              title="Edit"
              onPress={() => setTodo(item)}
              icon={{ name: 'edit', color: 'white' }}
              buttonStyle={{ minHeight: '100%' }}
            />
          )}
          rightContent={(reset) => (
            <Button
              title="Delete"
              onPress={()=>setShowDialog(true)}
              icon={{ name: 'delete', color: 'white' }}
              buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
            />
          )}
        >
           <ListItem.CheckBox
             // Use ThemeProvider to change the defaults of the checkbox
             iconType="material-community"
             checkedIcon="checkbox-marked"
             uncheckedIcon="checkbox-blank-outline"
             checked={item.status}
             onPress={handleToggle}
           />
           <ListItem.Content>
             <ListItem.Title  style={{flex: 1, textDecorationLine: item.status? "line-through" : "none"}}>
                <Text style={styles.statusButton}>{item.name}</Text>
            </ListItem.Title>
             <ListItem.Subtitle>#{item.id}</ListItem.Subtitle>
           </ListItem.Content>
         </ListItem.Swipeable>
         <Dialog
      isVisible={showDialog}
      onBackdropPress={()=>setShowDialog(false)}
    >
      <Dialog.Title title="Suppression de tache" titleStyle={{color: "white"}} />
      <Text style={{color: "white"}}>Souhaitez-vous vraiment supprimer cette tache ?</Text>
      <Dialog.Actions >
        <Dialog.Button buttonStyle={{marginLeft: 10}} title="Supprimer" onPress={handleDelete} color="error"  />
        <Dialog.Button title="Annuler" onPress={() => setShowDialog(false)} />
      </Dialog.Actions>
    </Dialog>

         {/* <View style={styles.todoItem} >
            <TouchableOpacity onPress={handleToggle} 
            style={styles.statusButton}>
                <Text>{item.status? "Fait" : "En cours"}</Text>
            </TouchableOpacity>
            <Text style={{flex: 1, textDecorationLine: item.status? "line-through" : "none"}}>
                {item.name}
            </Text>
            <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                <Icon name="trash" color="red" size={25}/>
            </TouchableOpacity>
        
        </View> */}
        </>
        
    )
}

const styles = StyleSheet.create({
    todoItem:{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee"
    },
    deleteButton:{
        paddingHorizontal: 10,
    },
    statusButton:{
        paddingHorizontal: 10,
        marginRight: 10
    }
})

export default TodoItem;

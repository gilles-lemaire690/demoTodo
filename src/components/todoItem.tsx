import React from "react";
import { useDispatch } from "react-redux";
import Todo from "../models/todo";
import { deleteTodo, toggleTodo } from "../store/todoSlice";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TodoItemProps{
    item: Todo
}

const TodoItem:React.FC<TodoItemProps>=({item})=>{
    const dispatch = useDispatch();
    const handleToggle = () => {
        dispatch(toggleTodo(item.id))
    }
    const handleDelete = () => {
        dispatch(deleteTodo(item.id))
    }
    return(
        <View style={styles.todoItem} >
            <TouchableOpacity onPress={handleToggle} 
            style={styles.statusButton}>
                <Text>{item.status? "Fait" : "En cours"}</Text>
            </TouchableOpacity>
            <Text style={{flex: 1, textDecorationLine: item.status? "line-through" : "none"}}>
                {item.name}
            </Text>
            <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                <Text style={{color: "red"}}>Supprimer</Text>
            </TouchableOpacity>
        </View>
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
import React, { useState } from "react";
import { addTodo, selectTodos } from "../store/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import TodoItem from "../components/todoItem";

const TodoList: React.FC=()=> {
    const [newTodo, setNewTodo] = useState("");
    const todos = useSelector(selectTodos);
    const dispatch = useDispatch()
    const handleAddTodo = ()=>{
        if (newTodo.trim()) {
            dispatch(addTodo(newTodo))
            setNewTodo("")
        }
    }
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title} >Bienvenu dans Todo App</Text>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} 
                placeholder="Ajouter une nouvelle tache"
                value={newTodo}
                onChangeText={setNewTodo} />
                <TouchableOpacity style={styles.addButton} 
                onPress={handleAddTodo}>
                    <Text style={{color: "white"}}>Ajouter</Text>
                </TouchableOpacity>
            </View>
            <FlatList data={todos} 
            keyExtractor={(item)=>item.id+""}
            renderItem={({item})=><TodoItem item={item}/>} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
        backgroundColor: "#f0f0f0"
    },
    title:{
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center"
    },
    inputContainer:{
        flexDirection: "row",
        marginBottom: 15,
    },
    input:{
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginRight: 10,
        borderRadius: 5
    },
    addButton:{
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default TodoList;
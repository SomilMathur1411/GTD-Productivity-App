import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useTaskStore from '../store/taskStore';
import TaskItem from '../components/TaskItem';

const InboxScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const { addTask, getInboxTasks } = useTaskStore();
  const inboxTasks = getInboxTasks();

  const handleAddTask = () => {
    if (title.trim()) {
      addTask(title.trim(), description.trim());
      setTitle('');
      setDescription('');
    }
  };

  const handleTaskPress = (task) => {
    navigation.navigate('Process', { task });
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.inputSection}>
        <Text style={styles.sectionTitle}>Quick Capture</Text>
        <TextInput
          style={styles.titleInput}
          placeholder="What's on your mind?"
          value={title}
          onChangeText={setTitle}
          multiline
        />
        <TextInput
          style={styles.descriptionInput}
          placeholder="Additional notes (optional)"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
        />
        <TouchableOpacity 
          style={[styles.addButton, !title.trim() && styles.addButtonDisabled]}
          onPress={handleAddTask}
          disabled={!title.trim()}
        >
          <Ionicons name="add" size={20} color="white" />
          <Text style={styles.addButtonText}>Capture</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listSection}>
        <Text style={styles.sectionTitle}>
          Inbox ({inboxTasks.length})
        </Text>
        <FlatList
          data={inboxTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem 
              task={item} 
              onPress={handleTaskPress}
              showContext={false}
            />
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              Your inbox is empty. Add some tasks above!
            </Text>
          }
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  inputSection: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  listSection: {
    flex: 1,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    maxHeight: 100,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginBottom: 12,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  addButtonDisabled: {
    backgroundColor: '#ccc',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 32,
    paddingHorizontal: 32,
  },
});

export default InboxScreen;
//import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TaskItem = ({ task, onPress, onComplete, showContext = true, showProject = false }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.taskContent} 
        onPress={() => onPress && onPress(task)}
      >
        <Text style={styles.title}>{task.title}</Text>
        {task.description && (
          <Text style={styles.description}>{task.description}</Text>
        )}
        <View style={styles.metadata}>
          {showContext && task.context && (
            <Text style={styles.context}>{task.context}</Text>
          )}
          {showProject && task.projectId && (
            <Text style={styles.project}>Project Task</Text>
          )}
        </View>
      </TouchableOpacity>
      
      {onComplete && (
        <TouchableOpacity 
          style={styles.completeButton}
          onPress={() => onComplete(task.id)}
        >
          <Ionicons name="checkmark-circle-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  taskContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  metadata: {
    flexDirection: 'row',
    marginTop: 8,
  },
  context: {
    fontSize: 12,
    color: '#2196F3',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 8,
  },
  project: {
    fontSize: 12,
    color: '#FF9800',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  completeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 12,
  },
});

export default TaskItem;
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProjectItem = ({ project, taskCount = 0, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => onPress && onPress(project)}
    >
      <View style={styles.content}>
        <Text style={styles.name}>{project.name}</Text>
        {project.description && (
          <Text style={styles.description}>{project.description}</Text>
        )}
        <Text style={styles.taskCount}>{taskCount} tasks</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
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
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  taskCount: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});

export default ProjectItem;
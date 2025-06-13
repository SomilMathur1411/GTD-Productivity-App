import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import useTaskStore from '../store/taskStore';
import { CONTEXTS, TASK_STATUS } from '../utils/constants';

const ProcessScreen = ({ route, navigation }) => {
  const { task } = route.params;
  const [selectedContext, setSelectedContext] = useState('@computer');
  const [selectedProject, setSelectedProject] = useState('');
  
  const { updateTask, projects, deleteTask } = useTaskStore();

  const handleMakeNextAction = () => {
    updateTask(task.id, {
      status: TASK_STATUS.NEXT_ACTION,
      context: selectedContext,
      projectId: selectedProject || null,
    });
    
    Alert.alert(
      'Success',
      'Task moved to Next Actions!',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  const handleMakeProject = () => {
    // For simplicity, we'll just mark it as a project
    // In a full implementation, you might want a separate flow
    updateTask(task.id, {
      status: TASK_STATUS.PROJECT,
    });
    
    Alert.alert(
      'Success',
      'Task marked as project!',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteTask(task.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.taskInfo}>
        <Text style={styles.title}>{task.title}</Text>
        {task.description && (
          <Text style={styles.description}>{task.description}</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What is it?</Text>
        <Text style={styles.sectionDescription}>
          Decide what this item is and what action, if any, is required.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Make it a Next Action</Text>
        <Text style={styles.sectionDescription}>
          If this is a single, actionable task, assign it a context:
        </Text>
        
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedContext}
            onValueChange={setSelectedContext}
            style={styles.picker}
          >
            {CONTEXTS.map((context) => (
              <Picker.Item key={context} label={context} value={context} />
            ))}
          </Picker>
        </View>

        {projects.length > 0 && (
          <>
            <Text style={styles.label}>Assign to Project (optional):</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedProject}
                onValueChange={setSelectedProject}
                style={styles.picker}
              >
                <Picker.Item label="No Project" value="" />
                {projects.map((project) => (
                  <Picker.Item 
                    key={project.id} 
                    label={project.name} 
                    value={project.id} 
                  />
                ))}
              </Picker>
            </View>
          </>
        )}

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleMakeNextAction}
        >
          <Text style={styles.actionButtonText}>Make Next Action</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Make it a Project</Text>
        <Text style={styles.sectionDescription}>
          If this requires multiple steps, it's a project.
        </Text>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.projectButton]}
          onPress={handleMakeProject}
        >
          <Text style={styles.actionButtonText}>Make Project</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  taskInfo: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  section: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
  },
  picker: {
    height: 50,
  },
  actionButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  projectButton: {
    backgroundColor: '#FF9800',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProcessScreen;
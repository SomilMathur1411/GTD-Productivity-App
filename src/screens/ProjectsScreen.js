import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useTaskStore from '../store/taskStore';
import ProjectItem from '../components/ProjectItem';

const ProjectsScreen = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  
  const { projects, addProject, getTasksByProject } = useTaskStore();

  const handleAddProject = () => {
    if (projectName.trim()) {
      addProject(projectName.trim(), projectDescription.trim());
      setProjectName('');
      setProjectDescription('');
      setShowAddForm(false);
    }
  };

  const handleProjectPress = (project) => {
    const projectTasks = getTasksByProject(project.id);
    Alert.alert(
      project.name,
      `This project has ${projectTasks.length} tasks.\n\n${project.description}`,
      [{ text: 'OK' }]
    );
  };

  const renderAddForm = () => (
    <View style={styles.addForm}>
      <TextInput
        style={styles.input}
        placeholder="Project name"
        value={projectName}
        onChangeText={setProjectName}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Project description (optional)"
        value={projectDescription}
        onChangeText={setProjectDescription}
        multiline
        numberOfLines={3}
      />
      <View style={styles.formButtons}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => {
            setShowAddForm(false);
            setProjectName('');
            setProjectDescription('');
          }}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.addButton]}
          onPress={handleAddProject}
        >
          <Text style={styles.addButtonText}>Add Project</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>
          Projects ({projects.length})
        </Text>
        <TouchableOpacity
          style={styles.addProjectButton}
          onPress={() => setShowAddForm(true)}
        >
          <Ionicons name="add" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {showAddForm && renderAddForm()}
      
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProjectItem 
            project={item}
            taskCount={getTasksByProject(item.id).length}
            onPress={handleProjectPress}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No projects yet. Create your first project above!
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  addProjectButton: {
    backgroundColor: '#2196F3',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addForm: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  textArea: {
    textAlignVertical: 'top',
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  addButton: {
    backgroundColor: '#2196F3',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 32,
    paddingHorizontal: 32,
  },
});

export default ProjectsScreen;
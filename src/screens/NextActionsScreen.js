import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import useTaskStore from '../store/taskStore';
import TaskItem from '../components/TaskItem';
import { CONTEXTS } from '../utils/constants';

const NextActionsScreen = () => {
  const [selectedContext, setSelectedContext] = useState('all');
  
  const { getNextActions, getTasksByContext, completeTask } = useTaskStore();
  
  const tasks = selectedContext === 'all' 
    ? getNextActions() 
    : getTasksByContext(selectedContext);

  const handleCompleteTask = (taskId) => {
    completeTask(taskId);
  };

  const renderContextFilter = () => (
    <View style={styles.filterContainer}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={[{ value: 'all', label: 'All' }, ...CONTEXTS.map(c => ({ value: c, label: c }))]}
        keyExtractor={(item) => item.value}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedContext === item.value && styles.filterButtonActive
            ]}
            onPress={() => setSelectedContext(item.value)}
          >
            <Text style={[
              styles.filterButtonText,
              selectedContext === item.value && styles.filterButtonTextActive
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {renderContextFilter()}
      
      <Text style={styles.sectionTitle}>
        Next Actions ({tasks.length})
      </Text>
      
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem 
            task={item}
            onComplete={handleCompleteTask}
            showContext={selectedContext === 'all'}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No next actions found. Process some items from your inbox!
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
  filterContainer: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  filterButtonActive: {
    backgroundColor: '#2196F3',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666',
  },
  filterButtonTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    margin: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 32,
    paddingHorizontal: 32,
  },
});

export default NextActionsScreen;
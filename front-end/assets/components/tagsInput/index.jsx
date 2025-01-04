import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const TagInput = ({ tags, setTags }) => {
  const handleTextChange = (text) => {
    // Verifica se o texto termina com espaço
    if (text.endsWith(' ')) {
      // Se terminar com espaço, remove o espaço e adiciona a vírgula
      text = text.trim(); // Remove espaços extras
      const newTags = text + ', '; // Adiciona uma vírgula e um espaço
      setTags(newTags); // Atualiza as tags
    } else {
      setTags(text); // Se não for espaço, só atualiza o valor
    }
  };

  return (
    <>
      <Text style={styles.selectedText}>Tags: {tags}</Text>
      <TextInput
        style={styles.input}
        placeholder="Adicionar tags"
        placeholderTextColor="#888"
        value={tags} // O valor agora vem das props
        onChangeText={handleTextChange} // Atualiza as tags ao digitar
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingLeft: 10,
    marginBottom: 20,
  },
  selectedText: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 5,
  },
});

export default TagInput;

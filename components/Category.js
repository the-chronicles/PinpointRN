import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { RadioButton } from 'react-native-paper'; // Import RadioButton from react-native-paper

const Category = ({
  isVisible,
  onClose,
  options,
  selectedOption,
  onSelectOption,
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.filtercontainer}>
            <Text style={styles.modalTitle}>Category</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.clear}>Clear</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.optionsRow}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => onSelectOption(option)}
              >
                <View style={styles.radioContainer}>
                  <RadioButton
                    value={option}
                    status={selectedOption === option ? 'checked' : 'unchecked'}
                    onPress={() => onSelectOption(option)}
                  />
                  <Text style={styles.optionText}>{option}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Show Result</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  option: {
    padding: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#1FB28A",
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#175594",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  filtercontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  clear: {
    color: "#175594",
    fontSize: 16,
    fontWeight: "bold",
  },
  optionsRow: {
    marginVertical: 10,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Category;

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";

const PartnerType = ({
  isVisible,
  onClose,
  options,
  onApply,
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
            <Text style={styles.modalTitle}>Partner Type</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.clear}>Clear</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.optionsRow}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.option,
                  selectedOption === option ? styles.selectedOption : null,
                ]}
                onPress={() => onSelectOption(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.button} onPress={onApply}>
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
  optionsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    gap: 8,
  },
  option: {
    padding: 10,
    alignItems: "center",
    // flexDirection: "row",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
  },
  selectedOption: {
    backgroundColor: "#e8eef5",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#175594",
  },
  optionText: {
    fontSize: 16,
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
});

export default PartnerType;

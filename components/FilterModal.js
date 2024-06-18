import { MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  TextInput,
} from "react-native";
import PartnerType from "./PartnerType";
import Category from "./Category";
import SubSearch from "./SubSearch";
import { Checkbox } from "react-native-paper";

const FilterModal = ({
  isVisible,
  onClose,
  selectedFilters,
  onFilterSelect,
  onApply,
  distance,
  setDistance,
}) => {
  const [partnerType, setPartnerType] = useState("");
  const [category, setCategory] = useState("");
  const [subSearch, setSubSearch] = useState("");
  const [onlineDelivery, setOnlineDelivery] = useState(false);
  const [deliveryAvailable, setDeliveryAvailable] = useState(false);
  const [acceptBooking, setAcceptBooking] = useState(false);
  const [isPartnerTypeModalVisible, setPartnerTypeModalVisible] =
    useState(false);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [isSubSearchModalVisible, setSubSearchModalVisible] = useState(false);

  const partnerTypeOptions = ["Food & Drinks", "Retail", "Services"];
  const allCategoryOptions = {
    "Food & Drinks": ["Restaurant", "Cafe", "Bar"],
    Retail: ["Clothing", "Electronics", "Groceries"],
    Services: ["Cleaning", "Plumbing", "Gardening"],
  };

  const handlePartnerTypeSelect = (option) => {
    setPartnerType(option);
    setCategory("");
  };

  const handleCategorySelect = (option) => {
    setCategory(option);
    setCategoryModalVisible(false);
  };

  const handleClear = () => {
    setPartnerType("");
    setCategory("");
    setSubSearch("");
    setOnlineDelivery(false);
    setDeliveryAvailable(false);
    setAcceptBooking(false);
    setDistance(0);
  };

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
            <Text style={styles.modalTitle}>Filter</Text>
            <TouchableOpacity onPress={handleClear}>
              <Text style={styles.clear}>Clear</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Distance</Text>
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="#175594"
            maximumTrackTintColor="#d1ddea"
            thumbTintColor="#175594"
            step={1}
            value={distance}
            onValueChange={setDistance}
          />
          <Text>{distance} Miles</Text>

          <TouchableOpacity
            style={styles.container}
            onPress={() => setPartnerTypeModalVisible(true)}
          >
            <Text style={styles.sectionTitle2}>Partner Type</Text>

            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </TouchableOpacity>

          <View style={styles.optionsRow}>
            <Text style={styles.selectedOption}>{partnerType}</Text>
          </View>

          <TouchableOpacity
            style={styles.container}
            onPress={() => setCategoryModalVisible(true)}
          >
            <Text style={styles.sectionTitle2}>Category</Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </TouchableOpacity>

          {partnerType ? (
            <View style={styles.optionsRow}>
              <Text style={styles.selectedOption}>{category}</Text>
            </View>
          ) : (
            <Text style={styles.subText}>
              Select a "Partner type" to choose category!
            </Text>
          )}

          <TouchableOpacity
            style={styles.container}
            onPress={() => setSubSearchModalVisible(true)}
          >
            <Text style={styles.sectionTitle2}>Sub Search</Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <Text style={styles.subText}>
            Select a "Partner type" and "Category" to choose category!
          </Text>

          {/* {partnerType && category ? (
            <TouchableOpacity
              style={styles.container}
              onPress={() => setSubSearchModalVisible(true)}
            >
              <Text style={styles.sectionTitle2}>Sub Search</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          ) : (
            <Text style={styles.subText}>
              Select a "Partner type" and "Category" to choose category!
            </Text>
          )} */}

          <View style={styles.checkboxContainer}>
            <Text style={styles.sectionTitle2}>Online Delivery</Text>
            <Checkbox
              status={onlineDelivery ? "checked" : "unchecked"}
              onPress={() => setOnlineDelivery(!onlineDelivery)}
              color="#175594"
            />
          </View>

          <View style={styles.checkboxContainer}>
            <Text style={styles.sectionTitle2}>Delivery Available</Text>
            <Checkbox
              status={deliveryAvailable ? "checked" : "unchecked"}
              onPress={() => setDeliveryAvailable(!deliveryAvailable)}
              color="#175594"
            />
          </View>

          <View style={styles.checkboxContainer}>
            <Text style={styles.sectionTitle2}>Accept Booking</Text>
            <Checkbox
              status={acceptBooking ? "checked" : "unchecked"}
              onPress={() => setAcceptBooking(!acceptBooking)}
              color="#175594"
            />
          </View>

          <View>
            <TouchableOpacity style={styles.button} onPress={onApply}>
              <Text style={styles.buttonText}>Show Result</Text>
            </TouchableOpacity>
          </View>
        </View>

        <PartnerType
          isVisible={isPartnerTypeModalVisible}
          onClose={() => setPartnerTypeModalVisible(false)}
          options={partnerTypeOptions}
          selectedOption={partnerType}
          onSelectOption={(option) => {
            handlePartnerTypeSelect(option);
            setPartnerTypeModalVisible(false);
          }}
        />

        <Category
          isVisible={isCategoryModalVisible}
          onClose={() => setCategoryModalVisible(false)}
          options={allCategoryOptions[partnerType] || []}
          selectedOption={category}
          onSelectOption={handleCategorySelect}
        />

        <SubSearch
          isVisible={isSubSearchModalVisible}
          onClose={() => setSubSearchModalVisible(false)}
        />
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
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
  sectionTitle2: {
    fontSize: 16,
    fontWeight: "bold",
  },
  filtercontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignItems: "center",
  },
  selectedOption: {
    color: "#175594",
  },
  optionText: {
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    justifyContent: "space-between",
  },
  label: {
    // marginLeft: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#175594",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  clear: {
    color: "#175594",
    fontSize: 16,
    fontWeight: "bold",
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subText: {
    color: "#727272",
    fontSize: 12,
  },
});

export default FilterModal;

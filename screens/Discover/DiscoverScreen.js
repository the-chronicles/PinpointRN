import React, {
  useEffect,
  useMemo,
  useRef,
  useCallback,
  useState,
} from "react";
import {
  EvilIcons,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import { Colors, Sizes, Fonts } from "../../constants/styles";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { markers, mapDarkStyle, mapStandardStyle } from "../../model/mapData";
import { useTheme } from "@react-navigation/native";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Slider from "@react-native-community/slider";
import { AirbnbRating } from "react-native-ratings";
import FilterModal from "../../components/FilterModal";

const { width } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;

function DiscoverScreen({ navigation }) {
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [radius, setRadius] = useState(15);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const nearByRestaurantsList = [
    {
      id: "1",
      restaurantName: "Marine Rise Restaurant!",
      ratedPeopleCount: 198,
      restaurantAddress: "1124, Old Chruch Street, New york, USA",
      rating: 4.3,
      time: "5:00pm",
    },
    {
      id: "2",
      restaurantName: "Sliver Leaf Restaurant",
      ratedPeopleCount: 170,
      restaurantAddress: "1124, Old Chruch Street, New york, USA",
      rating: 4.0,
      time: "5:00pm",
    },
    {
      id: "3",
      restaurantName: "Johson Foods",
      ratedPeopleCount: 130,
      restaurantAddress: "1124, Old Chruch Street, New york, USA",
      rating: 3.5,
      time: "5:00pm",
    },
    {
      id: "4",
      restaurantName: "Leopord Cafe",
      ratedPeopleCount: 100,
      restaurantAddress: "1124, Old Chruch Street, New york, USA",
      rating: 3.0,
      time: "5:00pm",
    },
    {
      id: "5",
      restaurantName: "King Of Foods",
      ratedPeopleCount: 80,
      restaurantAddress: "1124, Old Chruch Street, New york, USA",
      rating: 2.0,
      time: "5:00pm",
    },
  ];

  useEffect(() => {
    setFilteredRestaurants(nearByRestaurantsList);
  }, []);

  const applyFilters = (filters) => {
    const { distance, partnerType, category, onlineDelivery, deliveryAvailable, acceptBooking } = filters;
    let filteredList = nearByRestaurantsList.filter((restaurant) => {
      // Implement your filtering logic based on the selected filters
      if (distance && restaurant.distance > distance) return false;
      if (partnerType && restaurant.partnerType !== partnerType) return false;
      if (category && restaurant.category !== category) return false;
      if (onlineDelivery && !restaurant.onlineDelivery) return false;
      if (deliveryAvailable && !restaurant.deliveryAvailable) return false;
      if (acceptBooking && !restaurant.acceptBooking) return false;
      return true;
    });
    setFilteredRestaurants(filteredList);
  };

  const theme = useTheme();
  const sheetRef = useRef(null);

  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const snapPoints = useMemo(() => ["3%", "25%", "50%", "75%"], []);

  const handleSheetChange = useCallback((index) => {
    setState((state) => ({ ...state, sheetindex: index }));
  }, []);

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const handleSearchInputPress = () => {
    setShowBottomSheet(true);
  };

  const handleSliderChange = (sliderValue) => {
    setRadius(sliderValue);
    const newRegion = {
      ...state.region,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    };
    setState((prevState) => ({ ...prevState, region: newRegion }));
  };

  const handleDirectionPress = () => {};

  const handleFavoritePress = () => {};

  const handleCartPress = () => {};

  const handleFilterPress = () => {
    setFilterModalVisible(true);
  };

  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
    ),
    []
  );

  const renderItemPartners = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.push("RestaurantDetail", { id: item.id })}
      style={styles.nearByRestaurantsWrapStyle}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <View style={styles.nearByRestaurantsIconWrapStyle}>
            <Image
              source={require("../../assets/images/icons/restaurant_icon.png")}
              style={{
                width: "100%",
                height: "100%",
                flex: 1,
                resizeMode: "contain",
              }}
            />
          </View>
          <View style={{ flex: 1, marginLeft: Sizes.fixPadding }}>
            <Text style={{ ...Fonts.blackColor12SemiBold }}>
              {item.restaurantName}
            </Text>
            <Text
              style={{
                // marginLeft: Sizes.fixPadding - 10.0,
                ...Fonts.grayColor10Medium,
              }}
            >
              {item.restaurantAddress}
            </Text>
            <Text
              style={{
                // marginLeft: Sizes.fixPadding - 10.0,
                ...Fonts.greenColor10Medium,
              }}
            >
              Open till {item.time}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <AirbnbRating
            count={5}
            defaultRating={item.rating}
            size={14}
            showRating={false}
            isDisabled={true}
            selectedColor="#175594"
          />

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => handleDirectionPress(item)}>
              <FontAwesome5
                name="directions"
                size={24}
                color={Colors.blackColor}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleFavoritePress(item)}>
              <MaterialIcons
                name="favorite-outline"
                size={24}
                color={item.isFavorite ? Colors.redColor : Colors.blackColor}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCartPress(item)}>
              <Ionicons
                name="bag-outline"
                size={24}
                color={Colors.blackColor}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const initialMapState = {
    markers,
    categories: [
      {
        id: "filter",
        name: "",
        icon: (
          <TouchableOpacity onPress={handleFilterPress}>
            <MaterialIcons
              style={styles.chipsIcon}
              name="filter-list"
              size={20}
            />
          </TouchableOpacity>
        ),
      },
      {
        id: "radius",
        name: `${radius} Miles`,
        // icon: <MaterialCommunityIcons style={styles.chipsIcon} name="radius" size={18} />,
      },
      {
        id: "address",
        name: "Partner Type",
        // icon: <MaterialCommunityIcons style={styles.chipsIcon} name="city" size={18} />,
      },
      {
        id: "category",
        name: "Category",
        // icon: <MaterialIcons name="category" style={styles.chipsIcon} size={18} />,
      },
      {
        id: "booking",
        name: "Accept Booking",
        // icon: <MaterialIcons name="book-online" style={styles.chipsIcon} size={18} />,
      },
      {
        id: "catering",
        name: "Catering",
        // icon: <MaterialIcons name="fastfood" style={styles.chipsIcon} size={18} />,
      },
    ],
    region: {
      latitude: 22.62938671242907,
      longitude: 88.4354486029795,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
    search: null,
    showCustomDialog: false,
    selectedCustomProductName: null,
    selectedCustomProductAmount: 0,
    sheetindex: 0,
  };

  const [state, setState] = React.useState(initialMapState);
  // const [filterState, setFilterState] = React.useState("open_now");
  const [filterState, setFilterState] = React.useState("radius");
  const [value, setValue] = React.useState(0);
  const { search } = state;

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= state.markers.length) {
        index = state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinate } = state.markers[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  });

  const interpolations = state.markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp",
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }
    if (_scrollView.current) {
      _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
    }

    setShowBottomSheet(true);
  };

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  const handleOptionPress = (option) => {
    setSelectedFilters((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    );
  };

  return (
    // <View style={styles.container}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FilterModal
        isVisible={isFilterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        applyFilters={applyFilters}
      />
      <MapView
        ref={_map}
        initialRegion={state.region}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={theme.dark ? mapDarkStyle : mapStandardStyle}
      >
        {state.markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              onPress={(e) => onMarkerPress(e)}
            >
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require("../../assets/images/truckMarker.png")}
                  style={[styles.marker]}
                  resizeMode="cover"
                />
              </Animated.View>
            </Marker>
          );
        })}
      </MapView>

      {/* <GestureHandlerRootView style={{ flex: 1 }}> */}
      {/* {showBottomSheet && ( */}

      {/* main */}
       <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        onChange={(index) => {
          updateState({ sheetindex: index });
        }}
        detached={true}
      >
        <View style={{ height: 40 }}>
          <BottomSheetScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.contentContainer}
            style={{ marginLeft: 15 }}
          >
            {state.categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={
                  filterState === category.id
                    ? styles.ActivechipsItem
                    : styles.chipsItem
                }
                onPress={() => {
                  setFilterState(category.id);
                }}
              >
                {category.icon}
                <Text
                  style={
                    filterState === category.id
                      ? { color: Colors.whiteColor }
                      : { color: Colors.blackColor }
                  }
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </BottomSheetScrollView>
        </View>

        {filterState === "radius" && (
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor="#175594"
              maximumTrackTintColor="#d1ddea"
              // onValueChange={setValue}
              onValueChange={handleSliderChange}
              step={1}
              thumbTintColor="#175594"
              value={radius}
            />

            <View style={styles.search}>
              <TextInput
                style={styles.textInput}
                value={search}
                // onTouchStart={() => handleSnapPress(1)}
                onTouchStart={() => handleSearchInputPress()}
                onChangeText={(text) => updateState({ search: text })}
              />
            </View>
          </View>
        )}

        <View
          style={{
            marginVertical: Sizes.fixPadding * 0.5,
            backgroundColor: Colors.grayColor,
            height: 1.0,
          }}
        />
        <BottomSheetFlatList
          listKey="nearByRestaurants"
          data={nearByRestaurantsList}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItemPartners}
          contentContainerStyle={styles.contentContainer}
        />
      </BottomSheet>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={() => {
          setFilterModalVisible(!isFilterModalVisible);
        }}
      >
        <FilterModal
          selectedFilters={selectedFilters}
          onFilterSelect={(filter) => {
            if (selectedFilters.includes(filter)) {
              setSelectedFilters(selectedFilters.filter((f) => f !== filter));
            } else {
              setSelectedFilters([...selectedFilters, filter]);
            }
          }}
          onApply={() => {
            setFilterModalVisible(false);
            // Add logic to apply filters
          }}
          onCancel={() => setFilterModalVisible(false)}
          distance={radius}
          setDistance={setRadius}
        />
      </Modal>

      {/* end of main */}
      {/* )} */}


      
    </GestureHandlerRootView>
    // </View>
  );
}

export default DiscoverScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 30,
    position: "relative",
    flexDirection: "column",
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    height: 85,
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    zIndex: 1,
  },
  search: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    padding: 8,
    alignItems: "center",
    borderColor: "#808080",
  },
  searchIcon: {
    marginHorizontal: 10,
  },
  textInput: {
    flex: 1,
  },
  searchBox: {
    // position: 'absolute',
    marginTop: Platform.OS === "ios" ? 5 : 0,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    // borderRadius: 5,
    padding: 5,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    top: Platform.OS === "ios" ? 90 : 10,
    // paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderColor: Colors.lightGrayColor,
    borderWidth: 1.0,
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    height: 30,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    marginVertical: 5,
  },

  ActivechipsItem: {
    flexDirection: "row",
    backgroundColor: Colors.primaryColor,
    borderWidth: 1.0,
    borderColor: Colors.primaryColor,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginHorizontal: 5,
    marginVertical: 5,
    height: 30,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },

  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },

  contentContainer: {
    backgroundColor: "white",
  },

  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 20,
    height: 30,
  },
  button: {
    alignItems: "center",
    marginTop: 5,
  },
  signIn: {
    width: "100%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: "bold",
  },
  nearByRestaurantsWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 1.0,
    padding: Sizes.fixPadding,
  },
  nearByRestaurantsIconWrapStyle: {
    width: 35.0,
    height: 35.0,
    backgroundColor: "#E6E6E6",
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: "center",
    justifyContent: "center",
    padding: Sizes.fixPadding - 6.0,
  },
  searchInfoWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    padding: Sizes.fixPadding + 1.0,
    elevation: 2.0,
  },
  searchFieldStyle: {
    height: 30.0,
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
  },
  sliderContainer: {
    // height: 60,
    alignItems: "center",
    justifyContent: "center",
    // flex: 1,
    flexDirection: "row",
  },
  slider: {
    width: 300,
    height: 40,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
});

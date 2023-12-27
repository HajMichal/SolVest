import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Icon } from "@rneui/themed";
import { useAuth } from "../../context/authContext";
import OptionButton from "./OptionButton";

export default function HomeModal() {
  const [modalVisible, setModalVisible] = useState(false);
  const { onLogout, userData } = useAuth();
  return (
    <View>
      <TouchableOpacity
        style={{ marginRight: 15 }}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Icon name="user" type="feather" color={"black"} />
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ fontFamily: "OrkneyBold", marginBottom: 30 }}>
              Hello {userData?.name}
            </Text>

            <OptionButton
              iconName="arrow-up-left"
              onPress={() => setModalVisible(false)}
              title="Back to App"
              color="green"
            />
            <OptionButton
              iconName="settings"
              onPress={() => setModalVisible(false)}
              title="Settings"
            />
            <OptionButton
              iconName="log-out"
              onPress={onLogout}
              title="Log Out"
              color="red"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

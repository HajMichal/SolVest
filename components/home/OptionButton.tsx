import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";

interface CustomTouchableProps extends TouchableOpacityProps {
  title: string;
  iconName: string;
  color?: string;
}

const OptionButton: React.FC<CustomTouchableProps> = ({
  color = "black",
  title,
  iconName,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "50%",
        margin: 10,
      }}
      {...props}
    >
      <Icon name={iconName} type="feather" color={color} />
      <Text style={{ width: 80 }}>{title}</Text>
    </TouchableOpacity>
  );
};
export default OptionButton;

const styles = StyleSheet.create({});

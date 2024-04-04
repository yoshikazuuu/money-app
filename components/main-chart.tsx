import { StyleSheet } from "react-native";
import { ScrollView, Text, View } from "tamagui";
import PieChart from "react-native-pie-chart";

export function Chart() {
  const widthAndHeight = 270;
  const series = [123, 321, 123, 789, 537];
  const sliceColor = ["#fbd203", "#ffb300", "#ff9100", "#ff6c00", "#ff3c00"];

  return (
    <View>
      <PieChart
        widthAndHeight={widthAndHeight}
        series={series}
        sliceColor={sliceColor}
        coverRadius={0.9}
        coverFill={"#00000000"}
      />
    </View>
  );
}

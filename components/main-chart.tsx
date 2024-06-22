import { StyleSheet } from "react-native";
import { ScrollView, Text, View } from "tamagui";
import PieChart from "react-native-pie-chart";

export function Chart({
  budget = 1,
  usedBudget = 1,
}: {
  budget: number;
  usedBudget: number;
}) {
  const widthAndHeight = 270;
  const leftOver = budget - usedBudget < 0 ? 1 : budget - usedBudget;
  const series = [usedBudget, leftOver];
  const sliceColor = ["#60a34b", "#d64747"];

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

import { BarChart, Grid, LineChart, YAxis } from "react-native-svg-charts";
import { View } from "tamagui";

export default function DailyChart() {
  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

  const contentInset = { top: 20, bottom: 20 };

  return (
    <View style={{ height: 100, width: 150, flexDirection: "row" }}>
      <YAxis
        data={data}
        contentInset={contentInset}
        svg={{
          fill: "grey",
          fontSize: 5,
        }}
        numberOfTicks={10}
        formatLabel={(value) => `${value} K`}
      />
      <LineChart
        style={{ flex: 1, marginLeft: 16 }}
        data={data}
        svg={{ stroke: "#e6bb12" }}
        contentInset={contentInset}
      >
        <Grid />
      </LineChart>
    </View>
  );
}

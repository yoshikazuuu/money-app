import { Text, View, H4 } from "tamagui";
import { formatter } from "../lib/currency";
import { AmountProps } from "../lib/types";
import { useFocusEffect } from "expo-router";

export function Card({ amount, description }: AmountProps) {
  return (
    <View
      backgroundColor={"rgba(255,255,255,0.1)"}
      flex={1}
      flexDirection="row"
      marginBottom={20}
      padding={10}
      borderRadius={10}
      alignItems="center"
      justifyContent="space-between"
    >
      <View>
        <H4 color="$red10Dark">- {formatter.format(parseInt(amount))}</H4>
        <Text style={{ color: "#FFFFFF80" }}>{description}</Text>
      </View>
    </View>
  );
}

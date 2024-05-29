import {
  Button,
  H4,
  ScrollView,
  styled,
  Text,
  View,
  XStack,
  YStack,
} from "tamagui";
import { AmountProps, CardProps } from "../../lib/types";
import { expenseCards, notificationCards } from "../../lib/dummy";
import { Link, router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatter } from "../../lib/currency";
import { Card } from "../../components/card-amount";

const StyledView = styled(View, {
  paddingHorizontal: 30,
  paddingTop: 40,
  backgroundColor: "#00162B",
  width: "100%",
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  height: "100%",
  alignItems: "center",
});

export default function Expense() {
  const [data, setData] = useState<AmountProps[]>([]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("expenses");
      if (jsonValue != null) {
        setData(JSON.parse(jsonValue));
      }
    } catch (e) {
      // error reading value
    }
  };

  const clearData = async () => {
    try {
      await AsyncStorage.removeItem("expenses");
      await getData().then(() => {
        setData([]);
      });
    } catch (e) {
      // remove error
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, []) // Remove the semicolon and add a closing parenthesis here
  );

  return (
    <View
      width="100%"
      style={{
        padding: 30,
      }}
    >
      <XStack flexDirection="row" gap="$2">
        <Link href="/add-expense" asChild>
          <Button flex={1} marginBottom={20} themeInverse>
            Add Expense
          </Button>
        </Link>
        <Button
          flex={1}
          marginBottom={20}
          onPress={clearData}
          variant="outlined"
        >
          Clear Data
        </Button>
      </XStack>

      <ScrollView width="100%" showsVerticalScrollIndicator={false}>
        <YStack flex={1}>
          {data.map((card, idx) => (
            <Card key={idx} {...card} />
          ))}
        </YStack>
      </ScrollView>
    </View>
  );
}

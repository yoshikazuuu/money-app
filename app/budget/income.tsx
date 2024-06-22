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
import { CardProps } from "../../lib/types";
import { Link, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatter } from "../../lib/currency";

interface AmountProps {
  amount: string;
  description: string;
}

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

export default function Income() {
  const [data, setData] = useState<AmountProps[]>([]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("incomes");
      if (jsonValue != null) setData(JSON.parse(jsonValue));
    } catch (e) {
      // error reading value
    }
  };

  const clearData = async () => {
    try {
      await AsyncStorage.removeItem("incomes");
      setData([]);
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
        <Link href="/add-income" asChild>
          <Button flex={1} marginBottom={20} themeInverse>
            Add Income
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

function Card({ amount, description }: AmountProps) {
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
        <H4 color="$green10Dark">+ {formatter.format(parseInt(amount))}</H4>
        <Text style={{ color: "#FFFFFF80" }}>{description}</Text>
      </View>
    </View>
  );
}

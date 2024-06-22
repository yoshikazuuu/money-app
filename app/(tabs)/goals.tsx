import {
  Button,
  H1,
  H4,
  H5,
  ScrollView,
  styled,
  Text,
  View,
  XStack,
  YStack,
} from "tamagui";
import { LinearGradient } from "@tamagui/linear-gradient";
import { Link, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { formatter } from "../../lib/currency";

interface GoalProps {
  category: string;
  amount: string;
  description: string;
  reached_by: string;
  is_reached: boolean;
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

export default function GoalScreen() {
  const [goals, setGoals] = useState<GoalProps[]>([]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("goals");
      if (jsonValue != null) setGoals(JSON.parse(jsonValue));
    } catch (e) {
      // error reading value
    }
  };

  const clearData = async () => {
    try {
      await AsyncStorage.removeItem("goals");
      setGoals([]);
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
    <LinearGradient
      colors={["#00264A", "#0D3B3D"]}
      gap="$5"
      flex={1}
      paddingTop={70}
      alignItems="center"
    >
      <XStack flexDirection="row" gap="$2">
        <Button
          themeInverse
          size="$2"
          style={{ borderRadius: 100, paddingHorizontal: 20 }}
        >
          Goals
        </Button>
      </XStack>

      <StyledView>
        <XStack gap="$2">
          <Link href="/set-goals" asChild>
            <Button flex={1} marginBottom={20} themeInverse>
              Set Goal
            </Button>
          </Link>
          <Button
            variant="outlined"
            flex={1}
            marginBottom={20}
            onPress={clearData}
          >
            Clear Goals
          </Button>
        </XStack>

        <ScrollView width="100%" showsVerticalScrollIndicator={false}>
          <YStack flex={1}>
            {goals.map((card, idx) => (
              <Card key={idx} data={card} />
            ))}
          </YStack>
        </ScrollView>
      </StyledView>
    </LinearGradient>
  );
}

function Card({ data }: { data: GoalProps }) {
  return (
    <View
      backgroundColor={
        data.is_reached ? "rgba(0,255,0,0.2)" : "#rgba(255,0,0,0.5)"
      }
      flex={1}
      flexDirection="row"
      marginBottom={20}
      padding={10}
      borderRadius={10}
      alignItems="center"
      justifyContent="space-between"
    >
      <View>
        <H4>{data.category}</H4>
        <Text style={{ color: "#FFFFFF80" }}>{data.description}</Text>
      </View>
      <View>
        <H5 textAlign="right">{formatter.format(parseInt(data.amount))}</H5>
        <Text textAlign="right" style={{ color: "#FFFFFF80" }}>
          {data.reached_by}
        </Text>
      </View>
    </View>
  );
}

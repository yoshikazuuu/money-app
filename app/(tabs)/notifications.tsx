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
import { Check, Cross, X } from "@tamagui/lucide-icons";
import { Pressable } from "react-native";

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

export default function NotificationScreen() {
  const [goals, setGoals] = useState<GoalProps[]>([]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("goals");
      if (jsonValue != null) setGoals(JSON.parse(jsonValue));
    } catch (e) {
      // error reading value
    }
  };

  const saveData = async (updatedGoals: GoalProps[]) => {
    try {
      const jsonValue = JSON.stringify(updatedGoals);
      await AsyncStorage.setItem("goals", jsonValue);
      setGoals(updatedGoals);
    } catch (e) {
      // saving error
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

  const handleMarkAsReached = (goal: GoalProps) => {
    const updatedGoals = goals.map((g) =>
      g.description === goal.description ? { ...g, is_reached: true } : g
    );
    saveData(updatedGoals);
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
          Notification
        </Button>
      </XStack>

      <StyledView>
        <ScrollView width="100%" showsVerticalScrollIndicator={false}>
          <YStack flex={1}>
            {goals
              .filter((goal) => !goal.is_reached)
              .map((card, idx) => (
                <Card
                  key={idx}
                  data={card}
                  onMarkAsReached={handleMarkAsReached}
                />
              ))}
          </YStack>
        </ScrollView>
      </StyledView>
    </LinearGradient>
  );
}

function Card({
  data,
  onMarkAsReached,
}: {
  data: GoalProps;
  onMarkAsReached: (goal: GoalProps) => void;
}) {
  // Parse the date string into a Date object
  const dateParts = data.reached_by.split("/");
  const inputDate = new Date(
    Number(dateParts[2]),
    Number(dateParts[0]) - 1,
    Number(dateParts[1])
  );
  const currentDate = new Date();
  const differenceInMillis = inputDate.getTime() - currentDate.getTime();
  const differenceInDays = Math.ceil(
    differenceInMillis / (1000 * 60 * 60 * 24)
  );
  const days_to_reach =
    differenceInDays > 0
      ? `${differenceInDays} days to go`
      : `Late by ${Math.abs(differenceInDays)} days`;

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
        <H4>{data.description}</H4>
        <Text style={{ color: "#FFFFFF80" }}>{days_to_reach}</Text>
      </View>
      <View flex={0} flexDirection="row" gap={5}>
        <View
          width={40}
          height={40}
          flex={0}
          justifyContent="center"
          alignItems="center"
          backgroundColor="$white025"
          borderRadius={100}
        >
          <Pressable onPress={() => onMarkAsReached(data)}>
            <Check size={20} color="#00f241" />
          </Pressable>
        </View>
        <View
          width={40}
          height={40}
          flex={0}
          justifyContent="center"
          alignItems="center"
          backgroundColor="$white025"
          borderRadius={100}
        >
          <Pressable>
            <X size={20} color="#f20004" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

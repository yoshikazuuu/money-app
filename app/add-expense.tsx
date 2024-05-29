import {
  Button,
  H1,
  H4,
  H5,
  Input,
  ScrollView,
  styled,
  Text,
  View,
  XStack,
  YStack,
} from "tamagui";
import { LinearGradient } from "@tamagui/linear-gradient";

import {
  Coins,
  MoreHorizontal,
  PiggyBank,
  Tag,
  TentTree,
} from "@tamagui/lucide-icons";
import { Pressable } from "react-native";
import { useState, useEffect } from "react";
import { Link, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StyledView = styled(View, {
  padding: 30,
  backgroundColor: "#00162B",
  width: "80%",
  borderRadius: 30,
  height: "80%",
  justifyContent: "center",
  flex: 1,
  gap: "$5",
});

const TextSelection = styled(Text, {
  fontWeight: "600",
  fontSize: 24,
  gap: "$2",
});

const ViewSelection = styled(View, {
  flexDirection: "row",
  gap: "$5",
  alignItems: "center",
});

const IconView = styled(View, {
  backgroundColor: "#E3B53C",
  padding: 10,
  borderRadius: 100,
});

export default function AddExpense() {
  const [data, setData] = useState({
    amount: "",
    description: "",
  });

  const saveGoal = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("expenses");
      let currentGoals = jsonValue != null ? JSON.parse(jsonValue) : [];

      // Append new data to the top
      currentGoals.unshift(data);

      await AsyncStorage.setItem("expenses", JSON.stringify(currentGoals)).then(
        () => router.back()
      );
    } catch (e) {
      console.error("Error saving value", e);
    }
  };

  return (
    <LinearGradient
      colors={["#00264A", "#0D3B3D"]}
      gap="$5"
      flex={1}
      paddingTop={70}
      alignItems="center"
    >
      <View flexDirection="row" gap="$2">
        <Text width="75%" fontSize={38} fontWeight="900" textAlign="center">
          Add your expenses
        </Text>
      </View>

      <StyledView>
        <>
          {goals_input.map((goal: any, idx: any) => (
            <YStack
              gap="$2"
              borderColor="$accentColor"
              borderWidth={1}
              padding={20}
              borderRadius={10}
              backgroundColor={"rgba(255,255,255,0.1)"}
              key={idx}
            >
              <Text>{goal.title}</Text>
              <XStack alignItems="center">
                <Input
                  themeInverse
                  unstyled
                  flex={1}
                  size="$2"
                  placeholder={goal.placeholder}
                  color={"#fff"}
                  value={data[goal.type as keyof typeof data]}
                  onChangeText={(text) =>
                    setData({ ...data, [goal.type]: text })
                  }
                />
              </XStack>
              <View height={1} width="100%" backgroundColor="#E3B53C" />
            </YStack>
          ))}
          <Pressable>
            <Button themeInverse size="$3" marginBottom={20} onPress={saveGoal}>
              Set Goal
            </Button>
          </Pressable>
        </>
      </StyledView>
    </LinearGradient>
  );
}

const goals_input = [
  {
    title: "Amount",
    type: "amount",
    placeholder: "Enter the amount",
  },
  {
    title: "Description",
    type: "description",
    placeholder: "Enter the description",
  },
];

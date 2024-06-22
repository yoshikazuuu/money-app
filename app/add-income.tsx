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

export default function AddIncome() {
  const [data, setData] = useState({
    amount: "",
    description: "",
  });

  const [budget, setBudget] = useState({
    income: "0",
  });

  const getBudget = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("budget");
      if (jsonValue != null) {
        setBudget(JSON.parse(jsonValue));
      }
    } catch (e) {
      // error reading value
      console.error("Error reading budget:", e);
    }
  };

  const saveGoal = async () => {
    try {
      // Retrieve existing incomes from AsyncStorage
      const jsonValue = await AsyncStorage.getItem("incomes");
      let currentGoals = jsonValue != null ? JSON.parse(jsonValue) : [];

      // Perform calculations if budget is defined
      let newBudget = { ...budget };

      if (budget && budget.income) {
        // Initialize newIncome with the current income parsed as an integer
        let newIncome = parseInt(budget.income);

        // Ensure newIncome is a valid number
        if (isNaN(newIncome)) {
          newIncome = 0;
        }

        // Update the new budget amount by summing current budget and each goal amount
        currentGoals.forEach((goal: { amount: string }) => {
          const goalAmount = parseInt(goal.amount);

          // Ensure goalAmount is a valid number before adding
          if (!isNaN(goalAmount)) {
            newIncome += goalAmount;
          }
        });

        // Update newBudget with the new calculated income
        newBudget.income = newIncome.toString();
      }

      // Update the budget state with the new calculated budget
      setBudget(newBudget);

      // Append new data to the top of the current goals array
      currentGoals.unshift(data);

      // Save the updated budget and goals to AsyncStorage
      await AsyncStorage.setItem("budget", JSON.stringify(newBudget));
      await AsyncStorage.setItem("incomes", JSON.stringify(currentGoals));

      // Navigate back after saving
      router.back();
    } catch (e) {
      console.error("Error saving value", e);
    }
  };

  useEffect(() => {
    getBudget();
  }, []);

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
          Add your income
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

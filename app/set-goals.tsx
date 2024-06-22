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

export default function SetGoals() {
  const [data, setData] = useState({
    category: "Investment",
    amount: "100000",
    description: "Some description",
    reached_by: "11/11/2022",
  });

  const [isSelecting, setIsSelecting] = useState(true);
  const [goals, setGoals] = useState([]);

  const saveGoal = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("goals");
      let currentGoals = jsonValue != null ? JSON.parse(jsonValue) : [];

      // Append new data to the top
      currentGoals.unshift(data);

      await AsyncStorage.setItem("goals", JSON.stringify(currentGoals)).then(
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
          Choose your financial goals!
        </Text>
      </View>

      <StyledView>
        {isSelecting ? (
          goals_category.map((goal: any, idx: any) => (
            <Pressable
              key={idx}
              onPress={() => {
                setIsSelecting(!isSelecting);
                setData({ ...data, category: goal.title });
              }}
            >
              <ViewSelection>
                <IconView>{goal.icon}</IconView>
                <TextSelection>{goal.title}</TextSelection>
              </ViewSelection>
            </Pressable>
          ))
        ) : (
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
                    unstyled
                    flex={1}
                    size="$2"
                    placeholder=""
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
              <Button
                themeInverse
                size="$3"
                marginBottom={20}
                onPress={saveGoal}
              >
                Set Goal
              </Button>
            </Pressable>
          </>
        )}
      </StyledView>
    </LinearGradient>
  );
}

const goals_category = [
  {
    title: "Investment",
    icon: <Coins />,
  },
  {
    title: "Vacation",
    icon: <TentTree />,
  },
  {
    title: "Paying off debts",
    icon: <Tag />,
  },
  {
    title: "Savings",
    icon: <PiggyBank />,
  },
  {
    title: "Other",
    icon: <MoreHorizontal />,
  },
];

const goals_input = [
  {
    title: "Category",
    type: "category",
  },
  {
    title: "Amount",
    type: "amount",
  },
  {
    title: "Description",
    type: "description",
  },
  {
    title: "Reached by",
    type: "reached_by",
  },
];

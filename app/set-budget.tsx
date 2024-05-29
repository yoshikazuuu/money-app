import {
  Button,
  H1,
  H2,
  H3,
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
  Archive,
  Calendar,
  Coins,
  Moon,
  MoreHorizontal,
  PiggyBank,
  Tag,
  TentTree,
} from "@tamagui/lucide-icons";
import { Pressable } from "react-native";
import { useState, useEffect } from "react";
import { Link, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatter } from "../lib/currency";

const StyledView = styled(View, {
  padding: 30,
  backgroundColor: "#00162B",
  width: "80%",
  borderRadius: 30,
  justifyContent: "center",
  flex: 0,
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

export default function SetBudget() {
  const [data, setData] = useState({
    category: "Invesment",
    amount: "100000",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [goals, setGoals] = useState([]);

  const saveGoal = async () => {
    try {
      await AsyncStorage.setItem("budget", JSON.stringify(data)).then(() =>
        router.back()
      );
    } catch (e) {
      console.error("Error saving value", e);
    }
  };

  const calculateDaily = () => {
    const amountParsed = parseInt(data.amount);
    let daily = 0;

    if (data.category === goals_category[0].title) {
      daily = amountParsed;
    }
    if (data.category === goals_category[1].title) {
      daily = amountParsed / 7;
    }
    if (data.category === goals_category[2].title) {
      daily = amountParsed / 30;
    }
    setData({ ...data, amount: daily.toString() });

    return daily;
  };

  return (
    <LinearGradient
      colors={["#00264A", "#0D3B3D"]}
      gap="$5"
      flex={1}
      paddingTop={70}
      alignItems="center"
      justifyContent="center"
    >
      <View flexDirection="row" gap="$2">
        <Text width="75%" fontSize={38} fontWeight="900" textAlign="center">
          Set your {data.category.toLowerCase()} budget!
        </Text>
      </View>

      <StyledView>
        {currentPage === 1 &&
          goals_category.map((goal: any, idx: any) => (
            <Pressable
              key={idx}
              onPress={() => {
                setCurrentPage(2);
                setData({ ...data, category: goal.title });
              }}
            >
              <ViewSelection>
                <IconView>{goal.icon}</IconView>
                <TextSelection>{goal.title}</TextSelection>
              </ViewSelection>
            </Pressable>
          ))}

        {currentPage === 2 && (
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
                    placeholder="Set your budget here"
                    themeInverse
                    color={"#fff"}
                    onChangeText={(text) =>
                      setData({ ...data, [goal.type]: text })
                    }
                  />
                </XStack>
                <View height={1} width="100%" backgroundColor="#E3B53C" />
              </YStack>
            ))}
            <XStack gap="$3">
              <Button
                size="$3"
                flex={1}
                variant="outlined"
                onPress={() => setCurrentPage(1)}
              >
                Go Back
              </Button>

              <Button
                flex={1}
                themeInverse
                size="$3"
                onPress={() => {
                  calculateDaily();
                  setCurrentPage(3);
                }}
              >
                Next
              </Button>
            </XStack>
          </>
        )}

        {currentPage === 3 && (
          <View>
            <Text>Your {data.category.toLowerCase()} budget has been set!</Text>
            <H4>Your daily budget will be</H4>

            <H3 alignSelf="center" marginVertical={50}>
              {formatter.format(parseInt(data.amount))}
            </H3>

            <XStack gap="$3">
              <Button
                size="$3"
                flex={1}
                variant="outlined"
                onPress={() => setCurrentPage(2)}
              >
                Go Back
              </Button>

              <Button flex={1} themeInverse size="$3" onPress={saveGoal}>
                Set Goal
              </Button>
            </XStack>
          </View>
        )}
      </StyledView>
    </LinearGradient>
  );
}

const goals_category = [
  {
    title: "Daily",
    icon: <Calendar />,
  },
  {
    title: "Weekly",
    icon: <Archive />,
  },
  {
    title: "Monthly",
    icon: <Moon />,
  },
];

const goals_input = [
  {
    title: "Amount",
    type: "amount",
  },
];

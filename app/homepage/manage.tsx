import { Plus } from "@tamagui/lucide-icons";
import {
  Button,
  H1,
  H4,
  H5,
  ScrollView,
  styled,
  Text,
  View,
  YStack,
} from "tamagui";
import { Chart } from "../../components/main-chart";

import { Alert, Dimensions, Modal, Pressable } from "react-native";
import DailyChart from "../../components/daily-chart";
import { Link } from "expo-router";
import { notificationCards } from "../../lib/dummy";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { AmountProps } from "../../lib/types";
import { Card } from "../../components/card-amount";
import { formatter } from "../../lib/currency";

export function Manage() {
  const [seeAll, setSeeAll] = useState(false);

  const [data, setData] = useState<AmountProps[]>([]);
  const [budget, setBudget] = useState(1);
  const [usedBudget, setUsedBudget] = useState(1);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("expenses");
      if (jsonValue != null) {
        setData(JSON.parse(jsonValue));
      } else {
        setData([]);
      }
    } catch (e) {
      // error reading value
      console.error("Error reading expenses:", e);
    }
  };

  const getBudget = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("budget");
      if (jsonValue != null) {
        setBudget(
          parseInt(
            (
              Number(JSON.parse(jsonValue).amount) +
              Number(JSON.parse(jsonValue).income)
            ).toString()
          ) / 30
        );
      } else {
        setBudget(1);
      }
    } catch (e) {
      // error reading value
      console.error("Error reading budget:", e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        await getData();
        await getBudget();
      };

      fetchData();

      return () => {
        fetchData();
      };
    }, [])
  );

  useEffect(() => {
    setUsedBudget(
      budget -
        data
          .map((item) => parseInt(item.amount))
          .reduce((prev, next) => prev + next, 0)
    );
  }, [budget, data]);

  return (
    <>
      <View
        paddingTop={40}
        display={seeAll ? "none" : "flex"}
        flex={1}
        alignItems="center"
        justifyContent="center"
      >
        <Chart
          budget={budget <= 0 ? 1 : budget}
          usedBudget={usedBudget < 0 ? 1 : usedBudget}
        />
        <View
          style={{
            position: "absolute",
            top: 170,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link href="/set-budget" push asChild>
            <YStack alignItems="center">
              <Text>Daily Budget</Text>
              <H4>
                {formatter.format(usedBudget)} <Text fontSize="$4">of</Text>
              </H4>
              <H4>{formatter.format(budget)}</H4>
              <Link href="/set-budget" push asChild>
                <Button marginTop={10} fontSize={10} themeInverse size="$2">
                  Set Budget
                </Button>
              </Link>
            </YStack>
          </Link>
        </View>
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
            marginTop: 20,
          }}
        >
          <View>
            <Text style={{ marginBottom: 10, textAlign: "center" }}>
              Billing Reminder
            </Text>
            <Text style={{ color: "#FFFFFF80" }}>16/07 - BCA Credit Card</Text>
            <Text style={{ color: "#FFFFFF80" }}>16/07 - MEGA Credit Card</Text>
            <Text style={{ color: "#FFFFFF80" }}>16/07 - BRI Credit Card</Text>
            <Text style={{ color: "#FFFFFF80" }}>16/07 - House Rent</Text>
          </View>
          <View>
            <Text style={{ textAlign: "center" }}>Daily Spending</Text>
            <DailyChart />
          </View>
        </View> */}
      </View>

      <View
        style={{
          backgroundColor: "#093847",
          flex: 1,
          width: "100%",
          marginTop: seeAll ? 0 : 20,
          padding: 30,
          borderRadius: 30,
          height: seeAll ? "100%" : "auto",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: 10,
          }}
        >
          <H4>Today's Expense</H4>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Button unstyled onPress={() => setSeeAll(!seeAll)}>
              <Link href="/history" push>
                <Text>See all</Text>
              </Link>
            </Button>

            <Link href="/add-expense" asChild>
              <Button
                unstyled
                height="100%"
                backgroundColor="$background025"
                borderRadius={5}
              >
                <Plus />
              </Button>
            </Link>
          </View>
        </View>

        <ScrollView width="100%" showsVerticalScrollIndicator={false}>
          <YStack flex={1}>
            {data.map((card, idx) => (
              <Card key={idx} {...card} />
            ))}
          </YStack>
        </ScrollView>
      </View>
    </>
  );
}

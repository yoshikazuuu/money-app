import { Plus } from "@tamagui/lucide-icons";
import { H1, H4, H5, ScrollView, styled, Text, View, YStack } from "tamagui";
import { Chart } from "../../components/main-chart";

import { Dimensions } from "react-native";
import DailyChart from "../../components/daily-chart";

interface CardProps {
  title: string;
  date: string;
}

export function Manage() {
  return (
    <>
      <Chart />
      <View
        style={{
          position: "absolute",
          top: 130,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <H4>Daily Budget</H4>
        <H5>53,000</H5>
        <Text>of</Text>
        <H5>100,000</H5>
      </View>
      <View
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
      </View>

      <View
        style={{
          backgroundColor: "#093847",
          flex: 1,
          width: "100%",
          marginTop: 20,
          padding: 30,
          borderRadius: 30,
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
            <Text>See all</Text>
            <Plus />
          </View>
        </View>

        <ScrollView width="100%" showsVerticalScrollIndicator={false}>
          <YStack flex={1}>
            {cards.map((card, idx) => (
              <Card key={idx} {...card} />
            ))}
          </YStack>
        </ScrollView>
      </View>
    </>
  );
}

function Card({ title, date }: CardProps) {
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
        <H4>{title}</H4>
        <Text style={{ color: "#FFFFFF80" }}>Simple Text</Text>
      </View>
      <View>
        <Text>{date}</Text>
      </View>
    </View>
  );
}

const cards = [
  {
    title: "Notification Title",
    date: "11:20",
    href: "/cryptocurrency",
  },
  {
    title: "Notification Title",
    date: "11:20",
    href: "/stocks",
  },
  {
    title: "Notification Title",
    date: "11:20",
    href: "/bonds",
  },
  {
    title: "Notification Title",
    date: "11:20",
    href: "/real-estate",
  },
  {
    title: "Notification Title",
    date: "11:20",
    href: "/cryptocurrency",
  },
  {
    title: "Notification Title",
    date: "11:20",
    href: "/stocks",
  },
  {
    title: "Notification Title",
    date: "11:20",
    href: "/bonds",
  },
  {
    title: "Notification Title",
    date: "11:20",
    href: "/real-estate",
  },
  {
    title: "Notification Title",
    date: "11:20",
    href: "/bonds",
  },
  {
    title: "Notification Title",
    date: "11:20",
    href: "/real-estate",
  },
  {
    title: "Notification Title",
    date: "11:20",
    href: "/bonds",
  },
  {
    title: "Notification Title",
    date: "11:20",
    href: "/real-estate",
  },
];

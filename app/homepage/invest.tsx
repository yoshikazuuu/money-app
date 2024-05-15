import { LinearGradient } from "@tamagui/linear-gradient";
import {
  Button,
  H1,
  H4,
  Paragraph,
  ScrollView,
  SizableText,
  Text,
  View,
  XStack,
  YStack,
} from "tamagui";

interface CardProps {
  title: string;
  amount: number;
  href: string;
}

export function Invest() {
  return (
    <ScrollView
      marginTop={40}
      width="100%"
      showsVerticalScrollIndicator={false}
    >
      <YStack
        flex={1}
        style={{
          paddingHorizontal: 30,
        }}
      >
        {cards.map((card, idx) => (
          <Card key={idx} {...card} />
        ))}
      </YStack>
    </ScrollView>
  );
}

function Card({ title, amount, href }: CardProps) {
  return (
    <View
      backgroundColor={"rgba(255,255,255,0.1)"}
      flex={1}
      flexDirection="column"
      marginBottom={20}
      padding={10}
      borderRadius={10}
      width="100%"
      height="$12"
      alignItems="center"
      justifyContent="space-between"
    >
      <H4>{title}</H4>
      <Text fontSize={40} fontFamily="$body" fontWeight="100">
        IDR {amount}
      </Text>
      <Button
        style={{ borderRadius: 100 }}
        paddingHorizontal="$5"
        themeInverse
        size="$1"
      >
        Details
      </Button>
    </View>
  );
}

const cards = [
  {
    title: "Cryptocurrency",
    amount: 1000,
    href: "/cryptocurrency",
  },
  {
    title: "Stocks",
    amount: 1000,
    href: "/stocks",
  },
  {
    title: "Bonds",
    amount: 1000,
    href: "/bonds",
  },
  {
    title: "Real Estate",
    amount: 1000,
    href: "/real-estate",
  },
  {
    title: "Cryptocurrency",
    amount: 1000,
    href: "/cryptocurrency",
  },
  {
    title: "Stocks",
    amount: 1000,
    href: "/stocks",
  },
  {
    title: "Bonds",
    amount: 1000,
    href: "/bonds",
  },
  {
    title: "Real Estate",
    amount: 1000,
    href: "/real-estate",
  },
];

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

interface CardProps {
  title: string;
  date: string;
  href: string;
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
          style={{ borderRadius: "100%", paddingHorizontal: 20 }}
        >
          Notification
        </Button>
      </XStack>

      <StyledView>
        <ScrollView width="100%" showsVerticalScrollIndicator={false}>
          <YStack flex={1}>
            {cards.map((card, idx) => (
              <Card key={idx} {...card} />
            ))}
          </YStack>
        </ScrollView>
      </StyledView>
    </LinearGradient>
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
    title: "Goal Title",
    date: "11:20",
    href: "/cryptocurrency",
  },
  {
    title: "Goal Title",
    date: "11:20",
    href: "/stocks",
  },
  {
    title: "Goal Title",
    date: "11:20",
    href: "/bonds",
  },
  {
    title: "Goal Title",
    date: "11:20",
    href: "/real-estate",
  },
  {
    title: "Goal Title",
    date: "11:20",
    href: "/cryptocurrency",
  },
  {
    title: "Goal Title",
    date: "11:20",
    href: "/stocks",
  },
  {
    title: "Goal Title",
    date: "11:20",
    href: "/bonds",
  },
  {
    title: "Goal Title",
    date: "11:20",
    href: "/real-estate",
  },
  {
    title: "Goal Title",
    date: "11:20",
    href: "/bonds",
  },
  {
    title: "Goal Title",
    date: "11:20",
    href: "/real-estate",
  },
  {
    title: "Goal Title",
    date: "11:20",
    href: "/bonds",
  },
  {
    title: "Goal Title",
    date: "11:20",
    href: "/real-estate",
  },
];

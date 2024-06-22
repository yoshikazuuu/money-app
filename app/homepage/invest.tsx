import { useEffect, useState } from "react";
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
import { formatter } from "../../lib/currency";

interface CardProps {
  title: string;
  id: string;
}

export function Invest() {
  return (
    <ScrollView
      marginTop={40}
      width="100%"
      showsVerticalScrollIndicator={false}
    >
      <YStack flex={1} style={{ paddingHorizontal: 30 }}>
        {cards.map((card, idx) => (
          <Card key={idx} {...card} />
        ))}
      </YStack>
    </ScrollView>
  );
}

function Card({ title, id }: CardProps) {
  const [data, setData] = useState<{ [key: string]: any }>({});
  const [showDetails, setShowDetails] = useState(false);

  const getCrypto = async (id: string) => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=idr&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`,
      {
        headers: {
          "x-cg-demo-api-key": "CG-W1Q3hJBu4wjQDz83Fz887LaX",
        },
      }
    );
    const data = await response.json();
    setData(data);
    console.log("lmao", data);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  useEffect(() => {
    getCrypto(id);
  }, []);

  return (
    <View
      backgroundColor={"rgba(255,255,255,0.1)"}
      flex={1}
      flexDirection="column"
      marginBottom={20}
      padding={10}
      borderRadius={10}
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      gap="$2"
    >
      <H4>{title}</H4>
      <Text
        fontSize={30}
        fontFamily="$body"
        color={data[id]?.idr_24h_change > 0 ? "$green10" : "$red10"}
        fontWeight="900"
      >
        {formatter.format(data[id]?.idr)}
      </Text>

      {showDetails && (
        <View
          flex={1}
          width="100%"
          gap={1}
          borderWidth={1}
          padding={10}
          borderColor="#E3B53C"
          borderRadius={10}
          style={{
            opacity: 1,
            maxHeight: "1000px",
            overflow: "hidden",
            transition: "max-height 0.3s ease, opacity 0.3s ease",
          }}
        >
          <Text
            style={{ color: "#FFFFFF80" }}
            fontSize={14}
            fontFamily="$body"
            fontWeight="900"
          >
            Price Change: {data[id]?.idr_24h_change.toFixed(2) > 0 ? "+" : ""}{" "}
            {data[id]?.idr_24h_change.toFixed(2)}%
          </Text>
          <Text
            style={{ color: "#FFFFFF80" }}
            fontSize={14}
            fontFamily="$body"
            fontWeight="900"
          >
            Market Cap: {formatter.format(data[id]?.idr_market_cap)}
          </Text>
          <Text
            style={{ color: "#FFFFFF80" }}
            fontSize={14}
            fontFamily="$body"
            fontWeight="900"
          >
            Volume: {formatter.format(data[id]?.idr_24h_vol)}
          </Text>
          <Text
            style={{ color: "#FFFFFF80" }}
            fontSize={14}
            fontFamily="$body"
            fontWeight="900"
          >
            Last Updated:{" "}
            {new Date(data[id]?.last_updated_at * 1000).toLocaleString()}
          </Text>
        </View>
      )}

      <Button
        style={{ borderRadius: 100 }}
        paddingHorizontal="$5"
        themeInverse
        size="$1"
        onPress={toggleDetails}
      >
        {showDetails ? "Hide Details" : "Show Details"}
      </Button>
    </View>
  );
}

const cards = [
  { title: "Bitcoin", id: "bitcoin" },
  { title: "Ethereum", id: "ethereum" },
  { title: "Tether", id: "tether" },
  { title: "BNB", id: "binancecoin" },
  { title: "USD Coin", id: "usd-coin" },
  { title: "Ripple", id: "ripple" },
  { title: "Cardano", id: "cardano" },
  { title: "Dogecoin", id: "dogecoin" },
  { title: "Solana", id: "solana" },
  { title: "Tron", id: "tron" },
];

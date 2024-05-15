import { Button, H1, styled, Text, View, XStack } from "tamagui";
import { LinearGradient } from "@tamagui/linear-gradient";
import { useState } from "react";
import { Manage } from "../homepage/manage";
import { Invest } from "../homepage/invest";

const StyledView = styled(View, {
  backgroundColor: "#00162B",
  width: "100%",
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  height: "100%",
  alignItems: "center",
});

export default function TabOneScreen() {
  const [isManage, setIsManage] = useState(true);

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
          backgroundColor={isManage ? "white" : "rgba(255,255,255,0.2)"}
          color={isManage ? "black" : "white"}
          onPress={() => {
            setIsManage(true);
          }}
        >
          Manage
        </Button>
        <Button
          themeInverse
          size="$2"
          style={{ borderRadius: 100, paddingHorizontal: 20 }}
          backgroundColor={!isManage ? "white" : "rgba(255,255,255,0.2)"}
          color={!isManage ? "black" : "white"}
          onPress={() => {
            setIsManage(false);
          }}
        >
          Invest
        </Button>
      </XStack>

      <StyledView>{isManage ? <Manage /> : <Invest />}</StyledView>
    </LinearGradient>
  );
}

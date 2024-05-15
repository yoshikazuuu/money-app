import {
  Avatar,
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
import { Banknote, CreditCard, Landmark } from "@tamagui/lucide-icons";

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

export default function ProfileScreen() {
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
        >
          User Profile
        </Button>
      </XStack>

      <StyledView>
        <ScrollView width="100%" showsVerticalScrollIndicator={false}>
          <YStack flex={1}>
            <Profile />
          </YStack>
        </ScrollView>
      </StyledView>
    </LinearGradient>
  );
}

function Profile() {
  return (
    <>
      <View
        style={{
          backgroundColor: "rgba(255,255,255,0.1)",
          width: "100%",
          borderRadius: 20,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.2)",
          padding: 30,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View>
          <H4 marginBottom={10}>Stephen Hau</H4>
          <Text fontSize={15} style={{ color: "rgba(255, 255, 255, 0.5)" }}>
            +62 XXX XXXX XXXX
          </Text>
          <Text fontSize={15} style={{ color: "rgba(255, 255, 255, 0.5)" }}>
            stephen.hau@binus.ac.id
          </Text>
        </View>
        <View>
          <Avatar circular size="$6">
            <Avatar.Image src={require("./../../assets/images/avatar.jpeg")} />
            <Avatar.Fallback bc="red" />
          </Avatar>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "rgba(255,255,255,0.1)",
          height: "auto",
          width: "100%",
          marginTop: 30,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.2)",
          padding: 30,
        }}
      >
        <H4 marginBottom={10}>Payment Methods</H4>
        <View style={{ flexDirection: "row", gap: 30 }}>
          <View
            style={{
              width: 100,

              justifyItems: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <View
              style={{
                backgroundColor: "#00101fBF",
                borderRadius: 10,
                height: 100,
                width: 100,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Landmark size={50} />
            </View>
            <Text fontSize={10}>BANK BALANCE</Text>
          </View>
          <View
            style={{
              width: 100,
              justifyItems: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <View
              style={{
                backgroundColor: "#00101fBF",
                borderRadius: 10,
                height: 100,
                width: 100,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Banknote size={50} />
            </View>
            <Text fontSize={10}>PHYSICAL CASH</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "rgba(255,255,255,0.1)",
          width: "100%",
          marginTop: 30,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.2)",
          padding: 30,
        }}
      >
        <H4 marginBottom={10}>Cards</H4>
        <View style={{ flexDirection: "row", gap: 30 }}>
          <View
            style={{
              width: 100,

              justifyItems: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <View
              style={{
                backgroundColor: "#00101fBF",
                borderRadius: 10,
                height: 100,
                width: 100,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CreditCard size={50} />
            </View>
            <Text fontSize={10}>CREDIT CARD</Text>
          </View>
          <View
            style={{
              width: 100,
              justifyItems: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <View
              style={{
                backgroundColor: "#00101fBF",
                borderRadius: 10,
                height: 100,
                width: 100,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CreditCard size={50} />
            </View>
            <Text fontSize={10}>DEBIT CARD</Text>
          </View>
        </View>
      </View>
    </>
  );
}

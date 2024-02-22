import React, { useEffect } from "react";
import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
  ActionsheetDragIndicator,
  ActionsheetIcon,
  ActionsheetItem,
  ActionsheetItemText,
  Box,
  Center,
  Button,
  Text,
  Spinner,
} from "@gluestack-ui/themed";
import ScannedProfile from "./ScannedProfile";
import ErrorProfile from "./ErrorProfile";
import { postScan } from "../../hooks/endpoints";
import { useAuth } from "@clerk/clerk-expo";

export default function ScanDrawer({
  scanned,
  scanValue,
  eventId,
  resetState,
}: {
  scanned: boolean;
  scanValue: string;
  eventId: string;
  resetState: any;
}) {
  const { getToken } = useAuth();
  const [scannedUser, setScannedUser] = React.useState<{
    firstName: string;
    lastName: string;
    profilePicture: string;
  }>(null);
  const [scan, setScan] = React.useState<{
    accepted: boolean;
    createdAt: Date;
    eventId: string;
    id: string;
    inviteId: string;
    scannedBy: string;
    userId: string;
  }>(null);
  const [error, setError] = React.useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const scanData = await postScan(token, scanValue, eventId);
        setScannedUser(scanData.user);
        setScan(scanData.scan);
        console.log(scanData);
      } catch (error) {
        setError(true);
      }
    };

    if (scanValue !== null) {
      fetchData();
    }
  }, [scanValue]);

  function handleClose() {
    resetState();
    setError(false);
  }

  function getScanColor() {
    return scan?.accepted ? "#E6FFE0" : "#FFE0E0";
  }

  if (scannedUser?.profilePicture || error) {
    return (
      <Center>
        <Actionsheet isOpen={scanned} onClose={handleClose}>
          <ActionsheetContent bg={getScanColor()} h={"$3/4"}>
            <ActionsheetDragIndicatorWrapper
              mt={10}
              position="absolute"
              h={"$3/4"}
              zIndex={998}
            >
              <ActionsheetDragIndicator h={"$1.5"} w={"$1/4"} />
            </ActionsheetDragIndicatorWrapper>
            <ActionsheetItem>
              <Box
                h={"$1/2"}
                justifyContent="center"
                alignItems="center"
                w={"$full"}
                mb={"$20"}
              >
                <Box w="75%" px={4} justifyContent="center" bg={getScanColor()}>
                  {error ? (
                    <ErrorProfile user={scannedUser} scan={scan}/>
                  ) : (
                    <ScannedProfile user={scannedUser} scan={scan} />
                  )}
                </Box>
              </Box>
            </ActionsheetItem>
            <ActionsheetItem>
              <Box justifyContent="center" alignItems="center" w={"$full"}>
                <Button
                  bgColor={"white" /* scan?.accepted ? "green" : "red"*/}
                  onPress={handleClose}
                  borderRadius={"$full"}
                  w={"75%"}
                  h={"30%"}
                  zIndex={999}
                >
                  <Text bold color="black">
                    Scan next
                  </Text>
                </Button>
              </Box>
            </ActionsheetItem>
          </ActionsheetContent>
        </Actionsheet>
      </Center>
    );
  } else if (scanned){
    return <Spinner />;
  } else {
    return null
  }
}

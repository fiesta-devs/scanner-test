import React, { useState } from "react";
import { ScrollView, SafeAreaView, StyleSheet } from "react-native";
import {
  ArrowRightIcon,
  Box,
  Icon,
  Text,
  Input,
  InputField,
  SearchIcon,
} from "@gluestack-ui/themed";
import { useTabsContext } from "../context/TabsContext";

const sampleInvites = [
  {
    name: "Club Soccer Match",
    description:
      "Join us for an exciting soccer match between our club's teams. Open to all members!",
    date: "2024-03-15",
    organization: "Alpha Epsilon Pi",
    school: "University of Florida",
  },
  {
    name: "Tennis Tournament",
    description:
      "Compete in our annual tennis tournament and show off your skills on the court.",
    date: "2024-04-05",
    organization: "Beta Theta Pi",
    school: "University of California, Berkeley",
  },
  {
    name: "Yoga in the Park",
    description:
      "Relax and unwind with a morning yoga session in the park. Suitable for all levels.",
    date: "2024-04-20",
    organization: "Delta Tau Delta",
    school: "University of Texas at Austin",
  },
  {
    name: "Club BBQ",
    description:
      "Enjoy delicious food and great company at our club's annual BBQ event.",
    date: "2024-05-10",
    organization: "Sigma Chi",
    school: "University of Michigan",
  },
  {
    name: "Swim Meet",
    description:
      "Cheer on our swimmers as they compete in various swimming events.",
    date: "2024-06-01",
    organization: "Kappa Sigma",
    school: "Florida State University",
  },
  {
    name: "Golf Outing",
    description:
      "Tee off with fellow club members at our golf outing event. All skill levels welcome.",
    date: "2024-06-15",
    organization: "Phi Delta Theta",
    school: "University of Georgia",
  },
  {
    name: "Charity Run",
    description:
      "Participate in a charity run to support a good cause. Choose from different distances.",
    date: "2024-07-05",
    organization: "Sigma Alpha Epsilon",
    school: "University of Southern California",
  },
  {
    name: "Club Picnic",
    description:
      "Join us for a fun-filled day of games, food, and relaxation at our club picnic.",
    date: "2024-07-20",
    organization: "Alpha Tau Omega",
    school: "University of Alabama",
  },
  {
    name: "Dance Party",
    description:
      "Dance the night away at our club's dance party event. Music, lights, and fun guaranteed!",
    date: "2024-08-10",
    organization: "Lambda Chi Alpha",
    school: "University of Illinois at Urbana-Champaign",
  },
  {
    name: "Hiking Adventure",
    description:
      "Embark on a scenic hiking adventure with fellow club members. Explore nature and enjoy breathtaking views. We can't wait to see you here please come ready to party!",
    date: "2024-08-25",
    organization: "Pi Kappa Alpha",
    school: "University of South Carolina",
  },
];

export default function Home() {
  //const { invites } = useTabsContext();
  const [searchQuery, setSearchQuery] = useState("");
  const invites = sampleInvites
    .filter(
      (invite) =>
        invite.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invite.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invite.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invite.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (searchQuery === "") {
        //move this logic to backend asap
        //return (once we pull the data in the order we want it to show by default)
        return Date.parse(a.date) - Date.parse(b.date);
      }
      if (a.name.toLowerCase().includes(searchQuery.toLowerCase())) return -1;
      if (b.name.toLowerCase().includes(searchQuery.toLowerCase())) return 1;
      if (a.organization.toLowerCase().includes(searchQuery.toLowerCase()))
        return -1;
      if (b.organization.toLowerCase().includes(searchQuery.toLowerCase()))
        return 1;
      if (a.school.toLowerCase().includes(searchQuery.toLowerCase())) return -1;
      if (b.school.toLowerCase().includes(searchQuery.toLowerCase())) return 1;
      return 0;
    });

  if (invites?.length > 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#eeeeee" }}>
        <Box style={styles.pageTitleBox}>
          <Text style={styles.pageTitle}>Events</Text>
          <Box style={styles.queryBoxStyles}>
            <Input
              variant="rounded"
              size="md"
              style={styles.searchInputBoxStyles}
            >
              <Icon style={styles.searchIconStyles} as={SearchIcon} />
              <InputField
                style={styles.inputTextStyle}
                placeholder="Search by event, organization, school or description"
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
              />
            </Input>
          </Box>
        </Box>
        <ScrollView style={styles.scrollView}>
          {invites.map((invite, index) => {
            return (
              <Box key={index} style={styles.notificationCard}>
                <Text style={styles.notificationDate}>{invite.date}</Text>
                <Icon style={styles.arrowIconStyles} as={ArrowRightIcon} />
                <Box style={styles.notificationTitleBox}>
                  <Text style={styles.notificationTitle}>🎉 Party Invite</Text>
                </Box>
                <Box
                  style={{
                    height: 1,
                    backgroundColor: "#eeeeee",
                    marginVertical: 5,
                  }}
                />
                <Box style={styles.notificationDescriptionBox}>
                  <Text style={styles.notificationEventTitle}>
                    {invite.name}
                  </Text>
                  <Text
                    style={styles.notificationDescription}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {invite.description}
                  </Text>
                </Box>
                <Box
                  style={{
                    height: 1,
                    backgroundColor: "#eeeeee",
                    marginTop: 5,
                  }}
                />
                <Box style={styles.footerBox}>
                  <Text style={styles.footer}>View More</Text>
                </Box>
              </Box>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <Box style={styles.centeredBox}>
        <Text>{"No invites :("}</Text>
      </Box>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#eeeeee",
  },
  pageTitleBox: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  notificationCard: {
    padding: 16,
    margin: 16,
    marginTop: 0,
    backgroundColor: "#ffffff",
    elevation: 10,
    borderRadius: 20,
    justifyContent: "center",
  },
  notificationTitleBox: {
    padding: 8,
  },
  notificationTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FF025Bcc",
  },
  notificationDate: {
    fontSize: 14,
    color: "#999999",
    position: "absolute",
    right: 24,
    top: 24,
  },
  notificationDescriptionBox: {
    padding: 8,
  },
  notificationEventTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    paddingVertical: 8,
  },
  notificationDescription: {
    fontSize: 16,
    color: "#999999",
    overflow: "hidden",
    paddingVertical: 8,
    fontWeight: "400",
  },
  footerBox: {
    padding: 8,
  },
  footer: {
    fontSize: 16,
    color: "#333333",
    fontWeight: "600",
  },
  arrowIconStyles: {
    bottom: 24,
    right: 24,
    position: "absolute",
  },
  queryBoxStyles: {
    flexDirection: "row",
    margin: 16,
    marginBottom: 0,
  },
  searchInputBoxStyles: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  searchIconStyles: {
    marginLeft: 16,
  },
  inputTextStyle: {
    fontSize: 14,
    marginLeft: -8,
  },
  centeredBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
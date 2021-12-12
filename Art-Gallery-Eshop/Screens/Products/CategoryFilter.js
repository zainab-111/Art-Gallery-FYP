import React from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { ListItem, Badge, Text, Avatar } from "native-base";

const CategoryFilter = (props) => {
  const { categories, categoryFilter, setActive, productsCtg, active } = props;
  return (
    <ScrollView
      bounces={true}
      horizontal={true}
      style={{ backgroundColor: "#ffff" }}
    >
      <ListItem style={{ margin: 0, padding: 0, borderRadius: 0 }}>
        <TouchableOpacity
          key={1}
          onPress={() => {
            categoryFilter("all"), setActive(-1);
          }}
        >
          <Badge
            //rounded="999px"
            style={[
              styles.center,
              { margin: 5 },
              active == -1 ? styles.active : styles.inactive,
            ]}
          >
            <Text style={{ color: "white" }}>All</Text>
          </Badge>
        </TouchableOpacity>
        {categories.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                // console.log("id", item.id),
                categoryFilter(item.id), setActive(categories.indexOf(item));
              }}
            >
              <Badge
                //colorScheme="danger"
                rounded="1000px"
                style={[
                  styles.center,
                  { margin: 5 },
                  active == categories.indexOf(item)
                    ? styles.active
                    : styles.inactive,
                ]}
              >
                <Text style={{ color: "white" }}>{item.name}</Text>
              </Badge>
            </TouchableOpacity>
          );
        })}
      </ListItem>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: "#A6607C",
  },
  inactive: {
    backgroundColor: "#542F34",
  },
});

export default CategoryFilter;

const React = require("react-native");
const { Platform, Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  drawerCover: {
    alignSelf: "stretch",
    height: deviceHeight / 3.5,
    width: null,
    position: "relative",
    marginBottom: 10,
    backgroundColor: '#6200EE'
  },
  drawerImage: {
    position: "absolute",
    left: Platform.OS === "android" ? deviceWidth / 4 : deviceWidth / 9,
    top: Platform.OS === "android" ? deviceHeight / 13 : deviceHeight / 12,
    width: 100,
    height: 100
  },
  profile_pic:{
    position:"relative",
    height: 60,
    width: 60,
    borderRadius:100,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  profile_name:{
    color: "#fff",
    fontWeight: "400"
  },
  profile_email:{
    color: "#fff",
    fontSize: 13,
  }
  ,
  cover_content: {
    position:"relative",
    top: 40,
    left: 30,
    color: "#fff"
  },
  
  text: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 16,
    marginLeft: 20
  },
  badgeText: {
    fontSize: Platform.OS === "ios" ? 13 : 11,
    fontWeight: "400",
    textAlign: "center",
    marginTop: Platform.OS === "android" ? -3 : undefined
  },
  active_link:{
    color: '#6200EE',
  },
  list_item:{
    marginLeft: 0,
    paddingLeft: 20
  },
  dark_background:{
    backgroundColor : '#eee',

  }
};

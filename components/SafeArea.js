import { StyleSheet, Platform, StatusBar, SafeAreaView } from "react-native"

const style = StyleSheet.create({
    AndroidSafe : {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === "android" ?StatusBar.currentHeight :0
    }
})

export default SafeArea = (props) => (
    <SafeAreaView style={style.AndroidSafe}>
       {props.children}
    </SafeAreaView>
)
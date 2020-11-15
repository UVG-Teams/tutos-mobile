import { StyleSheet } from 'react-native'

export const blue1 = '#d1dfed'
export const darkBlue1 = '#146dc7'

export const theme = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        resizeMode: "cover",
        backgroundColor: blue1,
    },
    header: {
        backgroundColor: darkBlue1,
    },
    content: {
        padding: 15,
    },
    sidebarIcon: {
        color: darkBlue1,
    },
    headerIcon: {
        color: 'black',
    },
    errorText: {
        color: 'red',
    },
    dangerIcon:{
        color: 'red',
    }
})

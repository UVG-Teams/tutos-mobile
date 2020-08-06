import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
} from 'react-native'

export const RenderInput = ({ input, meta, type, placeholder }) => (
    <View style={{ width: '100%' }}>
        {
            meta.dirty && meta.error && (
                <Text style={ styles.textError }>
                    { meta.error }
                </Text>
            )
        }
        <TextInput 
            { ...input }
            type={ type }
            style={ styles.input }
            placeholder={ placeholder }
            secureTextEntry={ type == 'password' }
        />
    </View>
)

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderRadius: 4,
        backgroundColor: 'rgb(255,255,255)',
        paddingStart: 15,
        marginBottom: 10,
        elevation: 5,
    },
    textError: {
        color: 'red',
    }
})

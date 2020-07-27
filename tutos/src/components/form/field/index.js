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
            type={type}  
            style={ styles.input }
            placeholder={placeholder}
            secureTextEntry={type == 'password'}
        />
    </View>
)

const styles = StyleSheet.create({
    input: {
        height: 40, 
        width: '100%',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'rgb(255,255,255)',
        backgroundColor: 'rgb(255,255,255)',
        // padding: 20,
        paddingStart: 15,
        marginBottom: 10,
        shadowColor: 'rgb(200,200,200)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 5,
    },
    textError: {
        color: 'red',
    }
})

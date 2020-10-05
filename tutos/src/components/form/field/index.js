import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
} from 'react-native'
import { useCavy, hook, wrap } from 'cavy'

import { theme } from '../../../layout/themes'


export const RenderInput = ({ input, meta, type, placeholder, cavyName }) => {
    const generateTestHook = useCavy();
    const TestableTextInput = wrap(TextInput);

    return (
    <View style={{ width: '100%' }}>
        {
            meta.dirty && meta.error && (
                <Text style={ theme.textError }>
                    { meta.error }
                </Text>
            )
        }
        {/* <TestableTextInput */}
        <TextInput
            { ...input }
            type={ type }
            style={ styles.input }
            placeholder={ placeholder }
            autoCapitalize='none'
            secureTextEntry={ type == 'password' }
            ref={generateTestHook(cavyName)}
        />
    </View>
)}

export const RenderInputNumeric = ({ input, meta, type, placeholder, cavyName }) => {
    const generateTestHook = useCavy();
    const TestableTextInput = wrap(TextInput);

    return (
    <View style={{ width: '100%' }}>
        {
            meta.dirty && meta.error && (
                <Text style={ theme.textError }>
                    { meta.error }
                </Text>
            )
        }
        {/* <TestableTextInput */}
        <TextInput
            { ...input }
            type={ type }
            style={ styles.input }
            placeholder={ placeholder }
            autoCapitalize='none'
            secureTextEntry={ type == 'password' }
            keyboardType = 'numeric'
            ref={generateTestHook(cavyName)}
        />
    </View>
)}


const styles = StyleSheet.create({
    input: {
        height: 40,
        borderRadius: 4,
        backgroundColor: 'rgb(255,255,255)',
        paddingStart: 15,
        marginBottom: 10,
        elevation: 5,
        color:'black',
    },
})

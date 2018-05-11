import { Component } from "react";
import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { colors, dimens } from "./constants";

interface Props {
    title: string;
    iconUrl: string;
    content?: string;
    onPress?: (index: number) => void
}

export default class ZhihuItemView extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        const { title, iconUrl } = this.props;
        return (
            <View style={styles.container}>
                <Image
                    style={styles.icon}
                    source={
                        {
                            uri: iconUrl,
                            width: dimens.iconSiseM,
                            height: dimens.iconSiseM
                        }
                    }
                    resizeMode={'cover'}
                />
                <Text style={styles.title}>
                    {title}
                </Text>
            </View >
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        padding: dimens.paddingL,
    },
    icon: {
        width: dimens.iconSiseM,
        height: dimens.iconSiseM,
    },
    title: {
        marginLeft: dimens.paddingL,
        flex: 1,
        flexWrap: "wrap",
        fontSize: 18,
    }
});

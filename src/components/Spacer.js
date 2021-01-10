import React from 'react';
import { View, StyleSheet } from 'react-native';

const Spacer = ({
    children,
    style
}) => (
<View style={{ margin: 15, ...style }} >{children}</View>
);

export default Spacer;

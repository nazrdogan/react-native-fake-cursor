import React, { Component } from 'react';
import { Text, View, StyleSheet, Animated, Platform,Easing } from 'react-native';
export default class FakeCursorInput extends Component {
  constructor(props){
    super(props);
    this.blinkValue = new Animated.Value(0);
  }
  componentDidMount() {
    this.blink();
  }
  blink(){
    Animated.loop(
    Animated.sequence([
      Animated.timing(this.blinkValue, {
        toValue: 1,
        useNativeDriver: true,
        duration:400,
      }),
      Animated.timing(this.blinkValue, {
        toValue: 0,
        useNativeDriver: true,
        duration:400,
      })
    ])).start();
  }
  render() {
    const { isMasked } = this.props;
    return (
      <View style={{ width: '95%', alignSelf: 'center' }}>
        <View
          style={[
            {
              width: '100%',
              borderBottomWidth: 1,
              alignSelf: 'center',
              height: 55,
              paddingTop: 5,
              paddingBottom: 12,
            },
            this.props.style,
          ]}>
          <View style={{ marginTop: 20, flexDirection: 'row' }}>
            <View style={{ marginTop: 0, flexDirection: 'row' }}>
              <Text style={{ color: 'black', fontSize: 15 }}>
                {Array.from(this.props.value).map(item => {
                  return isMasked
                    ? Platform.OS === 'ios'
                      ? '\u{2219}'
                      : '\u{25CF}'
                    : item;
                })}
              </Text>
              <Animated.View style={[this.props.cursorStyle,{opacity:this.blinkValue}]}/>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

FakeCursorInput.defaultProps = {
  isMasked: false,
  value:"",
};

const styles = StyleSheet.create({
  box: {
    width: 1.5,
    height: 22,
    paddingBottom: 4,
    zIndex: 100000,
    backgroundColor: 'blue',
  },
});

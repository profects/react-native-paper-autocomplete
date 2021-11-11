import { Portal, Surface } from 'react-native-paper';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import * as React from 'react';
import { useKeyboard } from '@react-native-community/hooks';

function Popper({
  onPressOutside,
  children,
  surfaceStyle,
  outerRef,
  visible,
  inputLayout,
}: {
  onPressOutside: () => any;
  children: any;
  setPopperRef: any;
  attributes: any;
  styles: any;
  dropdownWidth: number;
  outerRef: any;
  surfaceStyle: any;
  maxHeight?: number;
  visible?: boolean;
  keyboardHeight?: number;
  hasValue?: boolean;
  inputLayout?: any;
}) {
  const { keyboardHeight } = useKeyboard();
  const windowConst = useWindowDimensions();
  const spaceBelow =
    windowConst.height -
    keyboardHeight -
    (inputLayout.y + inputLayout.height || 0);
  return (
    <Portal>
      <View
        pointerEvents="box-none"
        style={[StyleSheet.absoluteFill]}
        // @ts-ignore
        accessibilityExpanded={visible}
      >
        <TouchableWithoutFeedback onPress={onPressOutside}>
          <View ref={outerRef} style={[StyleSheet.absoluteFill, { flex: 1 }]} />
        </TouchableWithoutFeedback>
        <Surface
          style={[
            ...surfaceStyle,
            spaceBelow < 50 && { top: inputLayout.y + 6 - 250 },
          ]}
        >
          <View
            style={{
              maxHeight: spaceBelow < 50 ? 250 : spaceBelow,
              alignSelf: 'center',
              width: '100%',
            }}
          >
            {children}
          </View>
        </Surface>
      </View>
    </Portal>
  );
}

export default Popper;

import { Text } from "react-native";
import { useEffect } from "react";
import { animated, config, useSprings } from '@react-spring/native';
import tw from 'twrnc';

export default function AnimationLettersUp(props) {

  const { string, letterClassName, start, myDelay, colors } = props;

  const letters = [];
  for (let i = 0; i < string.length; i++) {
    letters.push(string[i]);
  }

  console.log(letters);

  const [springs, api] = useSprings(
    letters.length,
    (i) => ({ opacity: 0, color: '#374151' }));

  useEffect(() => {
    if (start) {
      api.start((i) => ({
        opacity: 1,
        delay: i * myDelay,
        config: config.gentle,
        color: colors[i]
      }));
    }
    if (!start) {
      api.start((i) => ({
        opacity: 0,
        delay: i * myDelay,
        config: config.gentle,
        color: '#374151'
      }));
    }
  }, [start]);

  return (
    <Text style={tw`flex z-50`}>
      {springs.map((props, i) => (
        <animated.Text
          style={[props, letterClassName, { color: props.color }]}
          key={i}
        >
          {letters[i] === ' ' ? '\u00A0' : letters[i]}
        </animated.Text>
      ))}
    </Text>
  );
}
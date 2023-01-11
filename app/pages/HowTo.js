import { View, Text, Pressable, Dimensions, Image } from 'react-native';
import react, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from 'twrnc';
import Carousel from 'react-native-looped-carousel';

// Assets
import howToGraphicA from './../assets/howTo/howToGraphicA.png';
import howToGraphicB from './../assets/howTo/howToGraphicB.gif';

const HowTo = (props) => {

  const { setPage } = props;

  const insets = useSafeAreaInsets();

  return (
    <View style={tw`z-50 absolute flex flex-1 top-0 left-0 w-full h-full bg-white`}>
      <View style={{ marginTop: insets.top }} />
      <View style={tw`flex flex-col justify-center items-center`}>

        <View style={tw`w-full h-10`}>
          <View style={tw`flex w-full flex-row px-4 justify-between`}>
            <Text style={tw`text-lg font-bold opacity-0`}>Done</Text>
            <Text style={tw`text-lg font-bold text-gray-700`}>How To Play</Text>
            <Pressable onPressIn={() => setPage('play')}><Text style={tw`text-lg font-bold text-blue-400`}>Done</Text></Pressable>
          </View>
        </View>

        <MyCarousel />

      </View>
      <View style={{ marginTop: insets.bottom }} />
    </View>
  );
};

const MyCarousel = () => {

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const insets = useSafeAreaInsets();

  const [size, setSize] = useState({ width: windowWidth, height: windowHeight - insets.bottom - insets.top - 50 });

  return (
    <>
      <Carousel
        delay={2000}
        style={size}
        autoplay={false}
        pageInfo={false}
        isLooped={false}
        bullets
        bulletStyle={tw`border-gray-700`}
        chosenBulletStyle={tw`border-gray-700 bg-gray-700`}
        onAnimateNextPage={(p) => console.log(p)}
      >
        <View style={[size]}><HowToPartA /></View>
        <View style={size}><HowToPartB /></View>
      </Carousel>
    </>
  );
};

const HowToPartA = () => {

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const insets = useSafeAreaInsets();

  const [size, setSize] = useState({ width: windowWidth, height: windowHeight });

  return (
    <View style={tw`flex flex-1 justify-center items-center h-full w-full`}>
      <View style={[tw`w-full bg-gray-500`, { height: 1 }]} />
      <View style={tw`mx-4 flex flex-1 items-center`}>
        <View style={tw`mt-8`} />
        <Image
          source={howToGraphicA}
          style={{ width: 220, height: 220 }}
        />
        <View style={tw`mt-4`} />
        <Text style={tw`text-gray-500 text-base font-medium text-center`}>
          The puzzle begins with a 3x3 colorful grid that is filled with jumbled numbers.
          {"\n \n"}
          The outer “Total Squares“ represent the sum that you need to achieve for each row or column of the “Jumble Grid Tiles”. Grey numbers represent totals that you have yet to achieve and gold numbers represent correct totals for the current Jumble.
        </Text>
        <View style={{ marginBottom: insets.bottom + insets.top }} />
      </View>
    </View>
  );
};

const HowToPartB = () => {

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const insets = useSafeAreaInsets();

  const [size, setSize] = useState({ width: windowWidth, height: windowHeight });

  return (
    <View style={tw`flex flex-1 justify-center items-center h-full w-full bg-white`}>
      <View style={[tw`w-full bg-gray-500`, { height: 1 }]} />
      <View style={tw`mx-4 flex flex-1 items-center`}>
        <View style={tw`mt-8`} />
        <Image
          source={howToGraphicB}
          style={{ width: 220, height: 220 }}
        />
        <View style={tw`mt-4`} />
        <Text style={tw`text-gray-500 text-base font-medium text-center`}>
          The goal of the puzzle is to rearrange the “Jumble Grid Tiles” to equal the sum of the outer “Total Squares”.
          {"\n \n"}
          Moving Tiles: First, tap on a tile you want to move. Second, select a directly adjacent position you want your tile to replace. The sum of the two tiles will now be displayed.
        </Text>
        <View style={{ marginBottom: insets.bottom + insets.top }} />
      </View>
    </View>
  );
};

export default HowTo;;
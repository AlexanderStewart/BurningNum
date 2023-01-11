import react, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import tw from 'twrnc';

const Loading = () => {

  const [loadingIndicator, setLoadingIndicator] = useState(<Text>Loading<Text style={tw`opacity-0`}>...</Text></Text>);
  const [internetMessage, setInternetMessage] = useState('');

  useEffect(() => {
    loadIndicator();

    setTimeout(() => {
      setInternetMessage('You need an internet connection to play.');
    }, 5000);
  }, []);

  const loadIndicator = () => {

    setLoadingIndicator(<Text>Loading<Text style={tw`opacity-0`}>...</Text></Text>);;

    setTimeout(() => {
      setLoadingIndicator(<Text>Loading.<Text style={tw`opacity-0`}>..</Text></Text>);
    }, 500);

    setTimeout(() => {
      setLoadingIndicator(<Text>Loading..<Text style={tw`opacity-0`}>.</Text></Text>);
    }, 1000);

    setTimeout(() => {
      setLoadingIndicator(<Text>Loading...</Text>);
    }, 1500);

    setTimeout(() => {
      loadIndicator();
    }, 2000);
  };

  return (
    <View style={[tw`flex flex-1 justify-center items-center flex-col`]}>
      <View style={[tw`flex flex-1 h-full w-full justify-center items-center`, { backgroundColor: '#83AF9B' }]}>
        <Text style={tw`text-gray-800`}>{loadingIndicator}</Text>
        <View style={tw`mt-1`} />
        <Text style={tw`text-gray-800`}>{internetMessage}</Text>
      </View>
    </View>
  );
};

export default Loading;
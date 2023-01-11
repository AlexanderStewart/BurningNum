
import Axios from 'axios';
import { API_HOST } from './Constants';
import { SafeAreaProvider } from "react-native-safe-area-context";
import react, { useEffect, useState } from 'react';
import { View, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sound from 'react-native-sound';
import tw from 'twrnc';

// Pages
import Play from "./app/pages/Play";
import HowTo from "./app/pages/HowTo";
import Loading from './app/pages/Loading';

const Home = () => {

  const [page, setPage] = useState('load');
  const [todaysBoards, setTodaysBoards] = useState(null);
  const [sounds, setSounds] = useState(null);
  const [audioOn, setAudioOn] = useState(true);

  const getTodaysBoards = async () => {

    const dateObj = new Date();

    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();
    const year = dateObj.getFullYear();

    const myDate = date.toString() + "/" + month.toString() + "/" + year.toString();

    const res = await Axios.post(`${API_HOST}/api/get_boards`, {
      currentDateObject: new Date()
    })
      .catch((err) => {
        console.log(err);
      });

    const boards = res.data.todaysBoards;
    const myBoards = JSON.parse(boards);

    setTodaysBoards(myBoards);
  };

  const setCurrentPage = async () => {
    const firstLoad = await AsyncStorage.getItem('firstLoad');
    if (firstLoad === null) {
      setPage('howTo');
      await AsyncStorage.setItem('firstLoad', 'false');
    }
    else {
      setPage('play');
    }
  };

  const setAudioOnOff = async () => {
    const audioOnOff = await AsyncStorage.getItem('audioOn');

    if (audioOnOff === 'true' || audioOnOff === null) {
      setAudioOn(true);
      await AsyncStorage.setItem('audioOn', 'true');
    }
    else {
      setAudioOn(false);
      await AsyncStorage.setItem('audioOn', 'false');
    }
  };

  const toggleAudio = async () => {
    if (audioOn) {
      setAudioOn(false);
      await AsyncStorage.setItem('audioOn', 'false');
    }
    else {
      setAudioOn(true);
      await AsyncStorage.setItem('audioOn', 'true');
    }
  };

  useEffect(() => {
    // AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);
    Sound.setCategory('Playback');

    var tinyClosing = new Sound('tinyClosing.wav', Sound.MAIN_BUNDLE, (err) => {
      if (err) {
        console.log('failed to load the sound', err);
        return;
      }
    });

    tinyClosing.setVolume(0.3);

    var closing = new Sound('closing.wav', Sound.MAIN_BUNDLE, (err) => {
      if (err) {
        console.log('failed to load the sound', err);
        return;
      }
    });

    closing.setVolume(0.3);


    var exclamation = new Sound('exclamation.wav', Sound.MAIN_BUNDLE, (err) => {
      if (err) {
        console.log('failed to load the sound', err);
        return;
      }
    });

    exclamation.setVolume(0.3);

    var humanWhistle = new Sound('humanWhistle.wav', Sound.MAIN_BUNDLE, (err) => {
      if (err) {
        console.log('failed to load the sound', err);
        return;
      }
    });

    humanWhistle.setVolume(0.3);

    var harmonica = new Sound('harmonica.wav', Sound.MAIN_BUNDLE, (err) => {
      if (err) {
        console.log('failed to load the sound', err);
        return;
      }
    });

    harmonica.setVolume(0.3);


    setSounds({
      tinyClosing: tinyClosing,
      exclamation: exclamation,
      humanWhistle: humanWhistle,
      harmonica: harmonica,
      closing: closing
    });

    setCurrentPage();
    setAudioOnOff();
    getTodaysBoards();
  }, []);

  return (
    <SafeAreaProvider>
      <View style={tw`flex flex-1 bg-white`}>
        {((page === 'load' || page === 'play') && todaysBoards) ?
          <Play setPage={setPage} todaysBoards={todaysBoards} sounds={sounds} toggleAudio={toggleAudio} audioOn={audioOn} /> :
          <Loading />}
        {page === 'howTo' && <HowTo setPage={setPage} />}
      </View>
    </SafeAreaProvider>
  );
};

export default Home;
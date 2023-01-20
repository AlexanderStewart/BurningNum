import { View, Text, Dimensions, Pressable, Share } from "react-native";
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import React, { useEffect, useState, useRef } from 'react';
import { useSprings, animated, config, useSpring } from '@react-spring/native';
import colors from 'nice-color-palettes';
import AnimateLetters from './../animation/AnimateLetters';

// Board
import { tileBoards } from './../Boards';
import NextTo from './../NextTo';
import UpdateMarkers from './../UpdateMarkers';
import LightOrDark from './../LightOrDark';

// Hooks
// import UseWindowSize from '../app/hooks/UseWindowSize';

// Assets
import { ArrowPathIcon, InformationCircleIcon, SpeakerWaveIcon, SpeakerXMarkIcon, ArrowTopRightOnSquareIcon } from 'react-native-heroicons/outline';

const Play = (props) => {

  // props
  const { setPage, sounds, toggleAudio, audioOn } = props;

  const AnimatedView = animated(View);
  const insets = useSafeAreaInsets();

  // colors
  const myColors = {
    mainBackground: '#fff',
    // mainBackground: '#f3f4f6', // gray 100
    lightText: '#fff', // white
    darkText: '#374151', // gray 700
  };

  const niceColors = [
    colors[0][0], // Square 1
    colors[0][1], // Square 2
    colors[0][2], // Square 3
    colors[5][0], // Square 4
    colors[1][4], // Square 5
    colors[2][0], // Square 6
    colors[1][1], // Square 7
    colors[1][2], // Square 8
    colors[1][3], // Square 9
  ];

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  // States
  const [win, setWin] = useState(false);
  const [payScreen, setWon] = useState(false);
  const [level, setLevel] = useState(null);
  const [showTileMarkers, setShowTileMarkers] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [levelsChangedThisSession, setLevelsChangedThisSession] = useState(0);
  const [hideNums, setHideNums] = useState(false);

  const [tiles, setTiles] = useState([]);
  const [tileMarkers, setTileMarkers] = useState([]);
  const [tilesSelected, setTilesSelected] = useState([]);

  const [wholeWidth, setWholeWidth] = useState();
  const [tileWidth, setTileWidth] = useState();
  const [tileBoardWidth, setTileBoardWidth] = useState();
  const [tileMarkersBoardWidth, setTileMarkersBoardWidth] = useState();

  // Refs
  const onFirstAnimation = useRef(true);
  const allowWin = useRef(true);
  const allowLevelUp = useRef(true);

  // Springs
  const [springsA, apiA] = useSprings(9, i => {
    return { init: i };
  });

  const [springsB, apiB] = useSprings(9, i => {
    return { init: i };
  });

  const initialOpacity = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.gentle,
  });

  const winScreenOpacity = useSpring({
    from: { opacity: 0 },
    to: { opacity: payScreen ? 1 : 0 },
    config: config.gentle,
  });

  const wiggleSpring = useSpring({
    from: { rotate: -1 },
    to: { rotate: 1 },
    loop: { reverse: true },
    config: config.wobbly,
  });

  const springOpacityMenu = useSpring({
    from: { opacity: 0, top: 100 },
    top: showMenu ? 80 : 100,
    opacity: showMenu ? 1 : 0,
    delay: 0,
    config: config.gentle,
    onRest: () => {
      setShowMenu(false);
    }
  });

  const springOpacityTileMarkers = useSpring({
    from: { opacity: 0 },
    opacity: showTileMarkers ? 1 : 0,
    delay: 9 * 45,
    config: config.default,
  });

  const startSprings = () => {

    if (!wholeWidth || !tileWidth || !tileBoardWidth || !tileMarkersBoardWidth) return;

    apiA.start(i => {
      return {
        backgroundColor: 'white',
        opacity: i === 4 ? 1.0 : 0,
        left: (i * tileWidth) - Math.floor(i / 3) * tileBoardWidth,
        top: Math.floor(i / 3) * tileWidth,
        value: i,
        num: i,
        zIndex: 20,
        padding: tileWidth * 0.077,
        border: '1px solid #d1d5db',
        display: 'flex',
        flex: 1,
      };
    });

    apiB.start(i => {
      return ({
        backgroundColor: niceColors[i],
        color: LightOrDark(niceColors[i], myColors.lightText, myColors.darkText),
        zIndex: 20,
        display: 'flex',
        flex: 1,
      });
    });

    const tempTiles = [...tiles];

    for (let n = 0; n < tempTiles.length; n++) {
      tempTiles[n].zIndex = 20;
    }

    setTiles(tempTiles);
  };

  // Functions
  const start = () => {

    if (!wholeWidth || !tileWidth || !tileBoardWidth || !tileMarkersBoardWidth || (!level && level !== 0)) return;

    let tempTiles = [];

    for (let n = 0; n < 9; n++) {
      tempTiles.push({
        backgroundColor: niceColors[n],
        color: LightOrDark(niceColors[n], myColors.lightText, myColors.darkText),
        value: tileBoards(level, n),
        selected: false,
        left: (n * tileWidth) - Math.floor(n / 3) * tileBoardWidth,
        top: Math.floor(n / 3) * tileWidth,
        index: n,
        springIndex: n,
        display: 'flex',
        flex: 1,
        zIndex: 20,
      });
    }

    setTiles(tempTiles);
  };

  const backToDefaultSprings = () => {

    if (!wholeWidth || !tileWidth || !tileBoardWidth || !tileMarkersBoardWidth) return;

    apiA.start(i => {
      return {
        left: (i * tileWidth) - Math.floor(i / 3) * tileBoardWidth,
        top: Math.floor(i / 3) * tileWidth,
        value: i,
        num: i,
        display: 'flex',
        flex: 1,
        zIndex: 20,
      };
    });

    apiB.start(i => {
      return ({
        backgroundColor: niceColors[i],
        color: LightOrDark(niceColors[i], myColors.lightText, myColors.darkText),
        zIndex: 20,
        display: 'flex',
        flex: 1,
      });
    });
  };

  const move = (lastTileIndex, lastTileSpringIndex, currentTileIndex, currentTileSpringIndex, position) => {
    const tempTiles = [...tiles];

    if (position === 'left') {
      apiA.start(i => {
        if (i === lastTileSpringIndex) {
          return {
            zIndex: 90,
            left: tiles[lastTileIndex].left - tileWidth,
            config: config.wobbly,
          };
        }
      });

      tempTiles[lastTileSpringIndex].left = tempTiles[lastTileSpringIndex].left - tileWidth;
      tempTiles[lastTileSpringIndex].index = tempTiles[lastTileSpringIndex].index - 1;
      tempTiles[lastTileSpringIndex].zIndex = 90;
    }
    if (position === 'right') {
      apiA.start(i => {
        if (i === lastTileSpringIndex) {
          return {
            zIndex: 90,
            left: tiles[lastTileSpringIndex].left + tileWidth,
            config: config.wobbly,
          };
        }
      });

      tempTiles[lastTileSpringIndex].left = tempTiles[lastTileSpringIndex].left + tileWidth;
      tempTiles[lastTileSpringIndex].index = tempTiles[lastTileSpringIndex].index + 1;
      tempTiles[lastTileSpringIndex].zIndex = 90;
    }
    if (position === 'up') {
      apiA.start(i => {
        if (i === lastTileSpringIndex) {
          return {
            zIndex: 90,
            top: tiles[lastTileSpringIndex].top - tileWidth,
            config: config.wobbly,
          };
        }
      });

      tempTiles[lastTileSpringIndex].top = tempTiles[lastTileSpringIndex].top - tileWidth;
      tempTiles[lastTileSpringIndex].index = tempTiles[lastTileSpringIndex].index - 3;
      tempTiles[lastTileSpringIndex].zIndex = 90;
    }
    if (position === 'down') {
      apiA.start(i => {
        if (i === lastTileSpringIndex) {
          return {
            zIndex: 90,
            top: tiles[lastTileSpringIndex].top + tileWidth,
            config: config.wobbly,
          };
        }
      });

      tempTiles[lastTileSpringIndex].top = tempTiles[lastTileSpringIndex].top + tileWidth;
      tempTiles[lastTileSpringIndex].index = tempTiles[lastTileSpringIndex].index + 3;
      tempTiles[lastTileSpringIndex].zIndex = 90;
    }

    tempTiles[lastTileSpringIndex].value = tempTiles[currentTileSpringIndex].value + tempTiles[lastTileSpringIndex].value;
    tempTiles[currentTileSpringIndex].value = null;

    setTiles(tempTiles);
  };

  const select = (currentTileSpringIndex, currentTileIndex) => {

    if (currentTileSpringIndex === 4 && onFirstAnimation.current) {
      setShowTileMarkers(true);
      setTileMarkers(UpdateMarkers(tiles, level));
      start();

      onFirstAnimation.current = false;
      apiA.start(i => {
        return {
          delay: i * 100,
          from: { opacity: i === 4 ? 1.0 : 0 },
          opacity: 1,
        };
      });
    }

    const tempTiles = [...tiles];

    const lastTileIndex = tilesSelected[tilesSelected.length - 1]?.lastTileIndex;
    const lastTileSpringIndex = tilesSelected[tilesSelected.length - 1]?.lastTileSpringIndex;

    const tilesNextTo = NextTo(lastTileIndex + 1, currentTileIndex + 1);

    if (tilesNextTo) {

      if (currentTileIndex - 1 === lastTileIndex) move(lastTileIndex, lastTileSpringIndex, currentTileIndex, currentTileSpringIndex, 'right');
      if (currentTileIndex + 1 === lastTileIndex) move(lastTileIndex, lastTileSpringIndex, currentTileIndex, currentTileSpringIndex, 'left');
      if (currentTileIndex - 3 === lastTileIndex) move(lastTileIndex, lastTileSpringIndex, currentTileIndex, currentTileSpringIndex, 'down');
      if (currentTileIndex + 3 === lastTileIndex) move(lastTileIndex, lastTileSpringIndex, currentTileIndex, currentTileSpringIndex, 'up');

      if (audioOn) {
        sounds.exclamation.stop(() => {
          sounds.exclamation.play();
        });
      }
    }
    else {
      if (audioOn) {
        sounds.tinyClosing.stop(() => {
          sounds.tinyClosing.play();
        });
      }
    }

    if (tiles[currentTileSpringIndex].selected) {

      apiA.start(i => {
        if (i === currentTileSpringIndex) {
          return {
            padding: tileWidth * 0.077,
            config: config.wobbly
          };
        }
      });

      for (let n = 0; n < tempTiles.length; n++) {
        tempTiles[n].selected = false;
        tempTiles[n].zIndex = 20;
      }
    }
    else if (!tiles[currentTileSpringIndex].selected) {

      apiA.start(i => {
        if (i === currentTileSpringIndex) {

          return {
            padding: tileWidth * 0.077 * 1.6,
            config: config.wobbly
          };
        }
      });

      for (let n = 0; n < tempTiles.length; n++) {
        tempTiles[n].selected = false;
        tempTiles[n].zIndex = 20;
      }

      tempTiles[currentTileSpringIndex].selected = true;
      tempTiles[currentTileSpringIndex].zIndex = 90;
    }

    let tempTilesSelected = [...tilesSelected];
    if (tempTilesSelected.length > 0) {
      tempTilesSelected = [];
      for (let i = 0; i < tempTiles.length; i++) tempTiles[i].selected = false;

      animateDeselectAll();

    }
    else tempTilesSelected.push({ lastTileIndex: currentTileIndex, lastTileSpringIndex: currentTileSpringIndex });
    setTilesSelected(tempTilesSelected);

    setTiles(tempTiles);
  };

  const animateDeselectAll = () => {

    apiA.start(i => {
      return {
        padding: tileWidth * 0.077,
        config: config.wobbly,
      };
    });

    apiB.start(i => {
      return {
        config: { duration: 1000 },
      };
    });
  };

  const checkForWin = () => {
    let numOfHits = 0;

    for (let i = 0; i < tileMarkers.length; i++) {

      if (tileMarkers[i].currentValue === tileMarkers[i].goalValue) {
        numOfHits++;
      }
    }

    if (numOfHits === 25) {
      allowLevelUp.current = true;
      setWin(true);
    }
  };

  const reset = () => {
    start();
    backToDefaultSprings();
  };

  useEffect(() => {
    if (windowWidth >= 720 - ((720 - 10) / 9) * 2) {
      const myWholeWidth = 720;
      const myTileWidth = ((myWholeWidth - 10) / 5);
      setWholeWidth(myWholeWidth);
      setTileWidth(myTileWidth);
      setTileBoardWidth(myTileWidth * 3);
      setTileMarkersBoardWidth(myTileWidth * 5);
    }
    else {
      setWholeWidth(windowWidth);
      setTileWidth((windowWidth) / 5);
      setTileBoardWidth(((windowWidth) / 5) * 3);
      setTileMarkersBoardWidth(((windowWidth) / 5) * 5);
    }
  }, []);

  useEffect(() => {
    reset();
    startSprings();
  }, [wholeWidth, tileWidth, tileBoardWidth, tileMarkersBoardWidth]);

  const sameDay = (d1, d2) => {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  };

  useEffect(() => {
    const getLevel = async () => {
      //TODO: CHANGE THIS
      const myLevel = await AsyncStorage.getItem('level');

      if (myLevel) setLevel(parseInt(myLevel));
      else {
        setLevel(1);
      }

      const storedDate = new Date(JSON.parse(await AsyncStorage.getItem('storedDate')));
      if (storedDate === null) {
        await AsyncStorage.setItem('storedDate', JSON.stringify(new Date()));
        storedDate = new Date();
      }

      if (!sameDay(storedDate, new Date())) {
        await AsyncStorage.setItem('storedDate', JSON.stringify(new Date()));
        setLevel(1);
      }

      reset();
    };

    getLevel();
  }, []);

  useEffect(() => {
    console.log('level', level);
    start();
    if (level) {

      allowLevelUp.current = false;

      const saveLevel = async () => {
        await AsyncStorage.setItem('level', level.toString());
        reset();
      };
      saveLevel();
      if (level === 4) setWon(true);
    }
  }, [level]);

  useEffect(() => {
    setTileMarkers(UpdateMarkers(tiles, level));
    checkForWin();
    console.log('tiles[0]', tiles[0]?.value);
  }, [tiles]);

  useEffect(() => {
    checkForWin();
  }, [tileMarkers]);

  useEffect(() => {
    if (win && allowWin.current) {

      setTimeout(() => {
        if (audioOn) {
          sounds.humanWhistle.stop(() => {
            sounds.humanWhistle.play();
          });
        }
      }, 500);

      setLevelsChangedThisSession(levelsChangedThisSession + 1);
      setHideNums(true);

      apiA.start(i => {
        return {
          delay: i * 100,
          opacity: 0
        };
      });

      setTimeout(() => {
        const newLevel = level + 1;
        setLevel(newLevel);
        if (newLevel === 4) {
          setTimeout(() => {
            if (audioOn) {
              sounds.harmonica.stop(() => {
                sounds.harmonica.play();
              });
            }
          }, 700);
        }

        setShowMenu(true);
        setShowTileMarkers(false);
        apiA.start(i => {
          return {
            delay: i * 100,
            opacity: 1
          };
        });
      }, 9 * 100);

      setTimeout(() => {
        setShowTileMarkers(true);
        setHideNums(false);
        setWin(false);
      }, 18 * 100);

      // onRest: () => {
      //   apiA.start(i => {
      //     return {
      //       delay: i * 100,
      //       from: { opacity: i === 4 ? 1.0 : 0 },
      //       opacity: 1,
      //       onRest: () => {
      //         setWin(false);
      //         setTimeout(() => {
      //           onFirstAnimation.current = true;
      //         }, 9 * 45);
      //       }
      //     };
      //   });
    }
    if (!win) {
      allowWin.current = true;
    }
  }, [win]);

  useEffect(() => {
    console.log('showMenu', showMenu);
  }, [showMenu]);

  const RenderTiles = () => {

    const myTiles = tiles.map((tile, i) => {

      if (tile.value === null) return null;

      return (
        <Pressable
          key={i}
          style={{ zIndex: tiles[i].zIndex }}
          onPressIn={() => {
            select(tile.springIndex, tile.index);
          }}
        >
          <AnimatedView
            style={[springsA[i], { width: tileWidth, height: tileWidth, zIndex: tiles[i].zIndex }, tw`shadow-xl absolute flex flex-1 rounded-md border border-gray-300`]}
          >
            <AnimatedView
              style={[springsB[i], wiggleSpring, tw`flex flex-1 rounded-md justify-center items-center opacity-80`, tile.selected ? { opacity: 1 } : { opacity: 0.6 }, { backgroundColor: tile.backgroundColor }]}
            >
              <Text style={[tw`text-3xl font-bold text-gray-600 text-center`, { color: tiles[i].color }]}>
                {((tile.value === 0 || !showTileMarkers || (tile.index === 4 && !showTileMarkers) || hideNums)) ? '' : tile.value}
                {((tile.index === 4 && !showTileMarkers) && !hideNums) && <Text style={tw`text-sm text-center`}>Tap{"\n"}Me!</Text>}
              </Text>
            </AnimatedView>
          </AnimatedView>
        </Pressable>
      );
    });

    return myTiles;
  };

  const RenderTileMarkers = () => {

    const myTiles = tileMarkers.map((marker, i) => {

      let visible = true;
      if ((i >= 6 && i <= 8) || (i >= 11 && i <= 13) || (i >= 16 && i <= 18) || i === 0 || i === 4 || i === 20 || i === 24) visible = false;


      return (
        <AnimatedView key={i}
          style={[{ width: tileWidth, height: tileWidth, left: (i * tileWidth) - Math.floor(i / 5) * tileMarkersBoardWidth, top: Math.floor(i / 5) * tileWidth }, tw`absolute flex flex-1 rounded-md`, !visible && { opacity: 0, height: 0, width: 0 }]}
        >
          <View

            style={[{ margin: tileWidth * 0.077 * 1.6 }, marker.currentValue === marker.goalValue ? tw`flex flex-1 justify-center items-center opacity-100 border-2 border-amber-300 rounded-md` : tw`flex flex-1 justify-center items-center border border-gray-300 rounded-md`]}
          >
            <Text
              style={[marker.currentValue === marker.goalValue ? tw`justify-center items-center text-3xl font-bold text-amber-300 opacity-100` : tw`justify-center items-center text-3xl font-bold opacity-100 text-gray-300`]}
            >{marker.goalValue}</Text>
          </View>
        </AnimatedView>
      );
    });

    return myTiles;
  };

  if (level === 4) {
    return (
      <AnimatedView style={[winScreenOpacity, tw`flex-1 flex justify-center items-center px-12`, { backgroundColor: '#83AF9B' }]}>
        <Text style={tw`text-6xl font-bold text-white`}>You Win!</Text>
        <View style={tw`mt-4`} />
        <Text style={tw`text-gray-800`}>Today's Score:</Text>
        <View style={tw`mt-4`} />
        <Text style={tw`text-5xl font-bold text-gray-700 text-gray-800`}>{level - 1}<Text style={tw`text-xl font-medium`}>/3</Text></Text>
        <View style={tw`mt-4`} />
        <Text style={tw`text-gray-800 text-center`}>Check in tomorrow for a new set of three puzzles!</Text>
        <View style={tw`mt-16`} />
        <View style={tw`w-60 bg-gray-100 rounded-md flex p-4 shadow-lg`}>
          <Text style={tw`text-sm text-gray-800`}>Let a friend know you beat today's puzzles!</Text>
          <View style={tw`mt-2`} />
          <Pressable
            onPress={async () => {
              const result = await Share.share({
                message:
                  `Check it out! I beat today's puzzles!`,
                url: 'https://apps.apple.com/ca/app/burning-num/id6444410183'
              }, {
                subject: 'Check it out! I beat today\'s puzzles!',
                tintColor: '#83AF9B'
              });
            }}
            style={tw`w-full border border-gray-800 bg-white px-4 py-2 flex items-center rounded-md flex-row justify-center`}
          >
            <ArrowTopRightOnSquareIcon width={25} height={25} color={'#1f2937'} />
            <View style={tw`ml-2`} />
            <Text style={tw`text-lg text-gray-800`}>Share</Text>
          </Pressable>
        </View>
      </AnimatedView>
    );
  }

  if (tiles.length === 0 || tileMarkers.length === 0 || !wholeWidth || !tileWidth || !tileBoardWidth || !tileMarkersBoardWidth || !level) return null;

  return (
    <>
      <View style={[{ height: windowHeight, width: windowWidth }, tw`z-0 absolute left-0 top-0 flex flex-1 overflow-hidden bg-white`]} />

      <AnimatedView style={[initialOpacity, springOpacityTileMarkers, tw`z-0 absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl border border-gray-300 shadow-sm`, { width: tileMarkersBoardWidth, height: insets.bottom + tileWidth * 1.75 }]} />
      <AnimatedView style={[initialOpacity, springOpacityTileMarkers, tw`z-0 absolute top-0 left-0 right-0 bg-white rounded-b-3xl border border-gray-300 shadow-sm`, { width: tileMarkersBoardWidth, height: insets.bottom + tileWidth * 1.75 }]} />

      <AnimatedView
        style={[initialOpacity, springOpacityMenu, tw`absolute left-0 right-0 z-0 flex justify-center items-center flex-col overflow-hidden`]}
      >
        <AnimateLetters
          string={'You Win!'}
          letterClassName={tw`text-6xl font-bold tracking-tight text-gray-700`}
          colors={niceColors}
          myDelay={100}
          start={showMenu}
        />
      </AnimatedView>

      <AnimatedView style={[initialOpacity, springOpacityTileMarkers, tw`absolute w-full justify-center items-center flex flex-1 flex-row overflow-hidden`, { top: insets.top + 10, zIndex: 100 }]}>

        <View style={[tw`px-4 flex rounded-lg flex justify-center items-center flex-col`, { width: tileMarkersBoardWidth }]}>
          {/* Restart */}
          <View style={tw`flex flex-1 w-full flex-row justify-between items-center`}>

            {/* HIDDEN */}
            <View style={tw`flex flex-row`}>

              <Pressable style={tw`z-50 opacity-0`}>
                <InformationCircleIcon width={tileWidth * 0.4} height={tileWidth * 0.4} color={'#60a5fa'} />
              </Pressable>

              <View style={tw`ml-2`} />

              <Pressable style={tw`z-50 opacity-0`}>
                <InformationCircleIcon width={tileWidth * 0.4} height={tileWidth * 0.4} color={'#60a5fa'} />
              </Pressable>
            </View>

            <Text style={tw`text-gray-700`}>Today's Score:</Text>

            <View style={tw`flex flex-row`}>

              {audioOn ?
                <Pressable onPressIn={() => toggleAudio()} style={tw`z-50`}>
                  <SpeakerWaveIcon width={tileWidth * 0.4} height={tileWidth * 0.4} color={'#60a5fa'} />
                </Pressable> :
                <Pressable onPressIn={() => toggleAudio()} style={tw`z-50`}>
                  <SpeakerXMarkIcon width={tileWidth * 0.4} height={tileWidth * 0.4} color={'#60a5fa'} />
                </Pressable>
              }

              <View style={tw`ml-2`} />

              <Pressable onPressIn={() => setPage('howTo')} style={tw`z-50`}>
                <InformationCircleIcon width={tileWidth * 0.4} height={tileWidth * 0.4} color={'#60a5fa'} />
              </Pressable>
            </View>
          </View>
          <View style={tw`mt-2`} />
          <Text style={tw`text-5xl font-bold text-gray-700 text-gray-700`}>{level - 1}<Text style={tw`text-xl font-medium`}>/100</Text></Text>
        </View>

      </AnimatedView>

      <AnimatedView style={[initialOpacity, tw`z-0 absolute left-0 right-0 top-0 bottom-0 flex flex-1 justify-center items-center overflow-hidden`, { height: windowHeight, width: windowWidth }, springOpacityTileMarkers]}>
        <View
          style={[{ width: tileMarkersBoardWidth, height: tileMarkersBoardWidth }, tw`flex`]}
        >
          <RenderTileMarkers />
        </View>
      </AnimatedView>

      <AnimatedView style={[initialOpacity, tw`z-50 absolute left-0 right-0 top-0 bottom-0 flex flex-1 justify-center items-center overflow-hidden`, { height: windowHeight, width: windowWidth }]}>
        {/* Board */}
        <View
          style={[{ width: tileBoardWidth, height: tileBoardWidth }, tw`z-50 flex rounded-lg`]}
        >
          <RenderTiles />
        </View>
      </AnimatedView>

      <AnimatedView style={[initialOpacity, springOpacityTileMarkers, tw`z-50 absolute w-full justify-center items-center flex flex-1 flex-row overflow-hidden`, { bottom: insets.bottom + 20 }]}>

        <View style={[tw`p-4 flex m-4 rounded-lg flex justify-center items-center`, { width: tileMarkersBoardWidth - tileWidth }]}>
          {/* Restart */}
          <Pressable onPressIn={() => {
            if (audioOn) {
              sounds.closing.stop(() => {
                sounds.closing.play();
              });
            }
            reset();
          }}>
            <ArrowPathIcon width={tileWidth * 0.7} height={tileWidth * 0.7} color={'#334155'} />
          </Pressable>
        </View>

      </AnimatedView>
    </>
  );
};

export default Play;
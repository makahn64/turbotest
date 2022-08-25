import React, {useState} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import NativeSampleModule from './js/NativeSampleModule';

import performance from 'react-native-performance';
import {runChunked, runParallel, runSequential, TestResult} from './scenarios';
import {VerticalGap} from './src/components/VerticalGap';

enum Scenario {
  WAITING = 'waiting',
  SEQ = 'Sequential',
  ALL = 'Simultaneous',
  CHUNK = 'Chunked',
}

const App = () => {
  const [testRunning, setTestRunning] = useState<Scenario>(Scenario.WAITING);

  const runScenario = (scenario: Scenario) => async () => {
    setTestRunning(scenario);
    let result: TestResult;

    switch (scenario) {
      case Scenario.ALL:
        result = await runParallel();
        break;
      case Scenario.SEQ:
        result = await runSequential();
        break;
      case Scenario.CHUNK:
        result = await runChunked();
        break;
      default:
        setTestRunning(Scenario.WAITING);
        Alert.alert('Bad scenario');
        return;
    }

    const {deltaMs, loops} = result;
    Alert.alert(
      `${scenario}${'\n'}${
        (deltaMs / loops).toFixed(6)
      }ms avg${'\n'}Total ${deltaMs}ms for ${loops} loops`,
    );
    setTestRunning(Scenario.WAITING);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Turbo Benchmark</Text>
      {testRunning === Scenario.WAITING ? (
        <View>
          <VerticalGap />
          <Button title="Sequential" onPress={runScenario(Scenario.SEQ)} />
          <VerticalGap />
          <Button title="All at Once" onPress={runScenario(Scenario.ALL)} />
          <VerticalGap />
          <Button title="Chunked" onPress={runScenario(Scenario.CHUNK)} />
        </View>
      ) : (
        <Text>Test Running...</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 32,
    paddingHorizontal: 24,
    justifyContent: 'flex-start',
    flex: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '600',
  },
  button: {
    margin: 20,
  },
});

export default App;

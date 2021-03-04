import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable, Modal } from 'react-native';
// import { Dimensions } from 'react-native';
import { Colors } from '../styles/Colors';

import { Languages } from '../models/Languages';
import { TextStyles } from '../styles/TextStyles';

// const { width } = Dimensions.get('window');

export const LangFilter: React.FC = () => {
  //  const langCodes = Object.keys(Languages);
  //  const langWords = Object.values(Languages);

  const [modalVisible, setModalVisible] = useState(false);

  // const languages = {};
  // Object.keys(Languages).map(key => (languages[key] = false));
  // console.log(languages);

  // const [langChecked, setLangChecked] = useState(languages);
  // const langs = ['en', 'es']
  // langs.push()/langs.pop()

  const [enChecked, setEnChecked] = useState(false);
  const [esChecked, setEsChecked] = useState(false);
  const [frChecked, setFrChecked] = useState(false);

  return (
    <View style={styles.container}>

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>

          <View style={styles.modalView}>

            {/* {langCodes.map((lang) => (
                    <View key={lang} style={styles.languagesList}>
                        <Text>{Languages[lang]}</Text>
                    </View>
                ))} */}

            <View key="en" style={styles.langList}>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ ...TextStyles.c2, alignSelf: 'center' }}>{Languages.en}</Text>
                <Pressable
                  style={styles.checkButton}
                  onPress={() => setEnChecked(!enChecked)}
                >
                  <View style={enChecked ? styles.boxChecked : styles.boxNotChecked}/>
                </Pressable>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ ...TextStyles.c2, alignSelf: 'center' }}>{Languages.es}</Text>
                <Pressable
                  style={styles.checkButton}
                  onPress={() => setEsChecked(!esChecked)}
                >
                  <View style={esChecked ? styles.boxChecked : styles.boxNotChecked}/>
                </Pressable>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ ...TextStyles.c2, alignSelf: 'center' }}>{Languages.fr}</Text>
                <Pressable
                  style={styles.checkButton}
                  onPress={() => setFrChecked(!frChecked)}
                >
                  <View style={frChecked ? styles.boxChecked : styles.boxNotChecked}/>
                </Pressable>
              </View>

            </View>

            <Pressable
              style={styles.confirmButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.confirmText}>Confirm</Text>
            </Pressable>

          </View>

        </View>

      </Modal>

      <Pressable
        style={styles.filterButton}
        onPress={() => setModalVisible(true)}
      />

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 40,
    width: 40,
    margin: 17,
    backgroundColor: 'lightblue',
  },
  centeredView: {
    justifyContent: 'center',
    height: 150,
    width: 140,
    margin: 17,
    backgroundColor: 'lightblue',
  },
  langList: {
    marginVertical: 5,
    // flexDirection: 'row',
    backgroundColor: 'yellow',
  },
  checkButton: {
    marginLeft: 20,
  },
  boxChecked: {
    height: 24,
    width: 24,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Colors.orange,
    backgroundColor: 'green',
  },
  boxNotChecked: {
    height: 24,
    width: 24,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Colors.orange,
    backgroundColor: 'red',
  },
  modalView: {
    height: 115,
    width: 111,
    margin: 10,
    padding: 5,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: Colors.orange,
    shadowColor: 'black',
    shadowRadius: 2,
    shadowOpacity: 0.16,
    shadowOffset: { width: 0, height: 3 },
  },
  filterButton: {
    height: 40,
    width: 40,
    backgroundColor: Colors.orange,
  },
  confirmButton: {
    padding: 10,
    backgroundColor: Colors.orange,
  },
  confirmText: {
    color: 'white',
    textAlign: 'center',
    ...TextStyles.c2,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

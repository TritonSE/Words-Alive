import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable, Modal } from 'react-native';
import { Colors } from '../styles/Colors';

import { Languages } from '../models/Languages';
import { TextStyles } from '../styles/TextStyles';

// const { width } = Dimensions.get('window');

const langCodes = Object.keys(Languages);
const langNames = Object.values(Languages);
const numLangs = langCodes.length;

const languages = [];

langNames.map(el => {
    languages.push({lang: el, isActive: false})
});

const activeLanguages = {
  arr: languages,
};

export const LangFilter: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [_, setLangToggle] = useState(activeLanguages);

  const onChangeLangFilter = (index: number) => {
    const temp = activeLanguages.arr;
    temp[index].isActive = !temp[index].isActive;
    setLangToggle({ arr: temp });
  };

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

            <View style={styles.langList}>
              {activeLanguages.arr.map((el, index: number) => (

                <View key={el.lang} style={{ flexDirection: 'row' }}>
                  <Text style={{ ...TextStyles.c2, alignSelf: 'center' }}>{el.lang}</Text>

                  <Pressable
                    style={styles.checkButton}
                    onPress={() => onChangeLangFilter(index)}
                  >
                    <View style={el.isActive ? styles.boxChecked : styles.boxNotChecked} />
                  </Pressable>

                </View>

              ))}
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
    // backgroundColor: 'yellow',
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
    height: numLangs * 24 + 20,
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
    padding: 7.5,
    height: 30,
    width: 90,
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

import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable, Modal, Dimensions } from 'react-native';
import { Colors } from '../styles/Colors';

import { Languages } from '../models/Languages';
import { TextStyles } from '../styles/TextStyles';

const { height } = Dimensions.get('window');

// language codes and the number of languages
const langCodes = Object.keys(Languages);
const numLangs = langCodes.length;

// array of objects containing the language code and whether the language is "active" for the filter
const langArray = [];
langCodes.forEach(el => {
  langArray.push({ lang: el, isActive: false });
});

// object containing the array of language objects
const langState = {
  arr: langArray,
};

export const LangFilter: React.FC = () => {
  // states for the dropdown and languages for the buttons & filter
  const [dropdownVisible, setDropDownVisible] = useState(false);
  const [languages, setLanguages] = useState(langState);

  // toggle the language at a given index
  const onChangeLangFilter = (index: number): void => {
    const temp = langState.arr;
    temp[index].isActive = !temp[index].isActive;
    setLanguages({ arr: temp });
  };

  return (

    <Pressable
      onPress={() => setDropDownVisible(!dropdownVisible)}
      style={styles.container}
      >
            
        {dropdownVisible ? 
        
        <View style={styles.modalView}>

          {languages.arr.map((el, index: number) => (

            <View key={el.lang} style={styles.nameBoxContainer}>
              <Text style={{ ...TextStyles.c2, alignSelf: 'center' }}>{Languages[el.lang]}</Text>

              <Pressable
                style={el.isActive ? styles.boxChecked : styles.boxNotChecked}
                onPress={() => onChangeLangFilter(index)}
              />

            </View>

          ))}

        </View>
        
         : 

        null

        }

    </Pressable>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 40,
    width: 40,
    marginRight: 10,
    backgroundColor: Colors.orange,
  },
  modalView: {
    height: numLangs * 28 + 14,
    width: 111,
    marginTop: 50,
    paddingTop: 8,
    paddingBottom: 6,
    paddingHorizontal: 5,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: Colors.orange,
    shadowColor: 'black',
    shadowRadius: 2,
    shadowOpacity: 0.16,
    shadowOffset: { width: 0, height: 3 },
  },
  nameBoxContainer: {
    flexDirection: 'row',
    marginBottom: 2,
    justifyContent: 'space-between',
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
});

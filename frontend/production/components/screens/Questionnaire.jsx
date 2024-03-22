import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { Picker } from '@react-native-picker/picker';
import { View, StyleSheet, TextInput, Button, Alert, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Pressable } from 'react-native';

export default function Questionnaire ({navigation}) {
  //use state functions for the rnpicker and the dropdowns
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedLocation, setLocation] = useState('');
  const [selectedDestination, setDestination] = useState('');
  const [selectedEvent, setEvent] = useState('');
  const [selectedTime, setTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  //populating dropdowns
  const locations = ['Ang Mo Kio', 'Bedok', 'Bishan', 'Bukit Batok', 'Bukit Merah', 'Bukit Panjang', 'Choa Chu Kang','Clementi','Geylang','Hougang','Jurong East','Jurong West','Kallang/Whampoa','Pasir Ris','Punggol','Queenstown','Sembawang','Sengkang','Serangoon','Tampines','Tengah','Toa Payoh','Woodlands','Yishun'];
  const destinations = ['Ang Mo Kio', 'Bedok', 'Bishan', 'Bukit Batok', 'Bukit Merah', 'Bukit Panjang', 'Choa Chu Kang','Clementi','Geylang','Hougang','Jurong East','Jurong West','Kallang/Whampoa','Pasir Ris','Punggol','Queenstown','Sembawang','Sengkang','Serangoon','Tampines','Tengah','Toa Payoh','Woodlands','Yishun'];
  const events = ['slowdive','Amber Liu: No More Sad Songs Tour 2024', '2024 FTISLAND HEY DAY','Baekhyun "Lonsdaelite"','Mosaic Music Series: The Rare Occasions','KYUHYUN 2024 Asia Tour "Restart"','Bruno Mars','EVNNE Fan-Concert [SQUAD:R] Asia Tour','ITZY 2nd World Tour <BORN TO BE>','Moon Byul of MAMAMOO 1ST WORLD TOUR [MUSEUM : an epic of starlit]','U H.E.R World Tour Concert','CNBLUE Live CNBLUENTITY','INCUBUS','Mosaic Music Series: Diana Krall','Niall Horan: “THE SHOW”','elijah woods: ilu 24/7, 365','ATARASHII GAKKO! World Tour','NCT Dream World Tour <THE DREAM SHOW 3>','aespa LIVE TOUR SYNK: Parallel Line','RIIZE fan-con tour "RIIZING DAY"','Final Fantasy VII Rebirth Orchestra World Tour Concert','LANY a beautiful blur: the world tour'];
  const time = ['2pm-3pm','3pm-4pm','4pm-5pm','5pm-6pm','6pm-7pm','7pm-8pm','8pm-9pm','9pm-10pm','10pm-11pm','11pm-12am','12am-1am','1am-2am'];

  //constants needed for dates
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };
  const handleSubmit = () => {
    if (selectedDate) {
      Alert.alert('Selected Date', selectedDate);
    } else {
      Alert.alert('Error', 'Please select a date');
    }
  };

  return (

    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerText}>we have a few questions for you:</Text>
      </View>

      <View style={styles.uP}>
        <RNPickerSelect 
          onValueChange={(value) => setSelectedValue(value)}
          items={[
            { label: 'user', value: 'user' },
            { label: 'provider', value: 'provider' },
          ]}
          placeholder={{
            label: 'user/provider',
            value: null,
          }}
          style={{
            placeholder: styles.optionPlaceholder,
          }}
          textInputProps={{
            style: styles.optionText,
          }}
        />
        {selectedValue === 'provider' && (
          <View styles={styles.transport}>
            <RNPickerSelect
              onValueChange={(value) => console.log(value)}
              items={[
                { label: 'taxi', value: 'taxi' },
                { label: 'bus', value: 'bus' },
                {label: 'mrt', value: 'mrt'}
              ]}
              placeholder={{
                label: 'transport',
                value: null,
              }}
              style={{
                placeholder: styles.transportPlaceholder,
              }}
              textInputProps={{
                style: styles.transportText,
              }}
            />
          </View>
        )}
      </View>

      <View style={styles.location}>
        <Picker
          style={styles.pickerL}
          selectedValue={selectedLocation}
          onValueChange={(itemValue, itemIndex) => setLocation(itemValue)}>
          <Picker.Item label="Location" value="" />
          {locations.map((name, index) => (
            <Picker.Item key={index} label={name} value={name} />
          ))}
        </Picker>
      </View>

      <View styles={styles.destination}>
        <Picker
          style={styles.pickerD}
          selectedValue={selectedDestination}
          onValueChange={(itemValue, itemIndex) => setDestination(itemValue)}>
          <Picker.Item label="Destination" value="" />
          {destinations.map((name, index) => (
            <Picker.Item key={index} label={name} value={name} />
          ))}
        </Picker>
      </View>

      <View style={styles.event}>
        <Picker
          style={styles.pickerE}
          selectedValue={selectedEvent}
          onValueChange={(itemValue, itemIndex) => setEvent(itemValue)}>
          <Picker.Item label="Event" value="" />
          {events.map((name, index) => (
            <Picker.Item key={index} label={name} value={name} />
          ))}
        </Picker>
      </View>

      <View styles={styles.time}>
        <Picker
          style={styles.pickerT}
          selectedValue={selectedTime}
          onValueChange={(itemValue, itemIndex) => setTime(itemValue)}>
          <Picker.Item label="Time" value="" />
          {time.map((name, index) => (
            <Picker.Item key={index} label={name} value={name} />
          ))}
        </Picker>
      </View>

      <View style={styles.calender}>
        <Calendar
          current={'2024-03-21'}
          onDayPress={handleDayPress}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: 'blue',
              // Optionally, you can also customize the text color of the selected date
              textColor: 'white',
            },
          }}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Selected Date"
            value={selectedDate}
            editable={false}
          />
        </View>
      </View>

      <View style={styles.button}>
        <Pressable onPress={() => navigation.navigate('Results')}>
          <Text style={styles.buttonText}>travel!</Text>
        </Pressable>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: '#F7F9FF',
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //borderColor: 'grey',
    //borderWidth: 1,
  },
  header: {
    marginTop: 20,
    marginBottom: 20
  },
  headerText: {
    fontSize: 32,
    color: '#2D3548',
    fontWeight: 'bold',
    fontFamily: 'Montserrat_700Bold',
  },
  container: {
    backgroundColor: '#F7F9FF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  uP: {
    marginBottom: 20, // Adjust as needed
    width: 250, 
  },
  optionPlaceholder: {
    fontSize: 24,
    fontWeight: "bold",
    color: '#CE8239'
  },
  location: {
    width: 265,
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  destination: {
    width: 265,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerD: {
    backgroundColor: '#3455A9',
    borderRadius: 48,
    width: 250,
    height: 40,
    paddingHorizontal: 15,
    //paddingRight: 10,
    color: '#F7F9FF', 
    fontFamily: 'Montserrat_700Bold',
    fontSize: 18,
    borderWidth: 0,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerL: {
    backgroundColor: '#97B4FF',
    borderRadius: 48,
    width: 250,
    height: 40,
    paddingLeft: 15,
    paddingRight: 10,
    color: '#3455A9', 
    fontFamily: 'Montserrat_700Bold',
    fontSize: 18,
    borderWidth: 0,
    marginBottom: 20
  },
  pickerT: {
    backgroundColor: '#21366C',
    borderRadius: 48,
    width: 250,
    height: 40,
    paddingLeft: 15,
    paddingRight: 10,
    color: '#F7F9FF', 
    fontFamily: 'Montserrat_700Bold',
    fontSize: 18,
    borderWidth: 0,
    marginBottom: 20
  },
  pickerE: {
    backgroundColor: '#CE8239',
    borderRadius: 48,
    width: 250,
    height: 40,
    paddingLeft: 15,
    paddingRight: 10,
    color: '#2D3548', 
    fontFamily: 'Montserrat_700Bold',
    fontSize: 18,
    borderWidth: 0,
    marginBottom: 20
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 3,
    borderColor: '#3455A9',
    borderRadius: 28,
    padding: 10,
    marginRight: 10,

  },
  selectedTime: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 18,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#3455A9',
    height: 40,
    width: 112,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent:"center"
  },
  buttonText: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 18,
    color:'#F7F9FF'
  }
});
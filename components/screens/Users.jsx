import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { Picker } from '@react-native-picker/picker';
import { View, StyleSheet, TextInput, Button, Alert, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function Users ({navigation}) {
  const pressHandler = () => {
    navigation.goBack();
  }


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

      <View style={styles.uP}>
        <RNPickerSelect 
          onValueChange={(value) => setSelectedValue(value)}
          items={[
            { label: 'user', value: 'user' },
            { label: 'provider', value: 'provider' },
            // Add more options as needed
          ]}
          placeholder={{
            label: 'What are you?',
            value: null,
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
                // Sub-options for Option 2
              ]}
              placeholder={{
                label: 'Select which transportation service...',
                value: null,
              }}
            />
          </View>
        )}
      </View>

      <View styles={styles.location}>
        <Picker
          selectedValue={selectedLocation}
          onValueChange={(itemValue, itemIndex) => setLocation(itemValue)}>
          {locations.map((name, index) => (
            <Picker.Item key={index} label={name} value={name} />
          ))}
        </Picker>
      </View>

      <View styles={styles.destination}>
        <Picker 
          selectedValue={selectedDestination}
          onValueChange={(itemValue, itemIndex) => setDestination(itemValue)}>
          {destinations.map((name, index) => (
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
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </View>

      <View style={styles.event}>
        <Picker
          selectedValue={selectedEvent}
          onValueChange={(itemValue, itemIndex) => setEvent(itemValue)}>
          {events.map((name, index) => (
            <Picker.Item key={index} label={name} value={name} />
          ))}
        </Picker>
      </View>

      <View styles={styles.time}>
        <Picker
          selectedValue={selectedTime}
          onValueChange={(itemValue, itemIndex) => setTime(itemValue)}>
          {time.map((name, index) => (
            <Picker.Item key={index} label={name} value={name} />
          ))}
        </Picker>
      </View>

      <View styles={styles.time}>
        <Button title= 'back to home screen' onPress={pressHandler}/>
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginRight: 10,
  },
  selectedTime: {
    fontSize: 18,
    marginTop: 10,
  },
});
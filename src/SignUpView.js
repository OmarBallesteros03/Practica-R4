import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';

export default class SignUpView extends Component {
  constructor (props) {
    super (props)
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }


  static navigationOptions = {
    title: "Signup",
    headerLeft: () => (
      <TouchableOpacity onPress={() => Actions.pop()}>
        <Text style={{ marginHorizontal: 10 }}>Regresar</Text>
      </TouchableOpacity>
    ),
  };

  handleGoBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  validatePassword = (password) => {
    // Contraseña de al menos 8 caracteres con al menos una letra mayúscula y un caracter especial:
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return passwordRegex.test(password);
  };

  handleSignUp = () => {
    const { email, password, confirmPassword } = this.state;

    if (!this.validateEmail(email)) {
      Alert.alert('Por favor, ingresa un correo electrónico válido.');
    } else if (!this.validatePassword(password)) {
      Alert.alert('La contraseña no cumple con los requisitos.');
    } else if (password !== confirmPassword) {
      Alert.alert('Las contraseñas no coinciden.')
    } else {
      // Validación exitosa.
      Actions.login();
    }
  };

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.subTitle}>Registrarse</Text>

        <TextInput
          placeholder="Correo"
          style={styles.textInput}
          onChangeText={(text) => this.setState({email: text})}
          value={this.state.email}
        />

        <TextInput
          placeholder="Nombre de usuario"
          style={styles.textInput}
          onChangeText={(text) => this.setState({ username: text })}
          value={this.state.username}
        />

        <TextInput
          placeholder="Contraseña"
          style={styles.textInput}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
          secureTextEntry={true}
        /> 

        <TextInput
          placeholder="Confirmar contraseña"
          style={styles.textInput}
          onChangeText={(text) => this.setState({ confirmPassword: text })}
          value={this.state.confirmPassword}
          secureTextEntry={true}
        /> 

      <View style={styles.buttonContainer}>
        <Button
          title="Registrarme"
          onPress={this.handleSignUp}
            accessibilityLabel="Sign Up button"/>
      </View>


        <StatusBar style="auto" />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  subTitle: {
    fontSize: 20,
    marginBottom: 10,
  },

  logo: {
    width: 200,
    height: 100
  },
  

  textInput: {
    borderColor: 'gray',
    marginBottom:10,
    backgroundColor: 'lightgray',
    borderWidth:0,
    paddingHorizontal:10,
    borderRadius: 10,
    minWidth: '50%',
  },

  buttonContainer: {
    margin:5,
  },
  subTitle: {
    fontSize:24,
    marginBottom:10,
  },
});
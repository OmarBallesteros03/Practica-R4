import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class LoginView extends Component {
  constructor (props) {
    super (props)
    this.state = {
      email: '',
      password: '',
    };
  }

  validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  validatePassword = (password) => {
    // Contraseña de al menos 8 caracteres con al menos una letra mayúscula y un número:
    const passwordRegex = /^(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  handleLogin = () => {
    const { email, password } = this.state;

    if (!this.validateEmail(email)) {
      Alert.alert('Por favor, ingresa un correo electrónico válido.');
    } else if (!this.validatePassword(password)) {
      Alert.alert('La contraseña no cumple con los requisitos.');
    } else {
      // Validación exitosa.
      Alert.alert('Has iniciado sesión correctamente!');
      Actions.home();
    }
  };

  render() {
    return (
      <View style={styles.container}>
      
        <Text style={styles.subTitle}>Iniciar sesión</Text>

        <Image
          style={styles.logo}
          source={require('./assets/Gojo.jpg',)}
        />


        <TextInput
          placeholder="Correo"
          style={styles.textInput}
          onChangeText={(text) => this.setState({email: text})}
          value={this.state.email}
        />

        <TextInput
          placeholder="Contraseña"
          style={styles.textInput}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
          secureTextEntry={true}
        /> 

      <View style={styles.buttonContainer}>
        <Button
          title="Iniciar sesión"
          onPress={this.handleLogin}
            accessibilityLabel="Log in button"/>

      </View>

      <View style={styles.buttonContainer}>
      <Button
        title="Registrarse"
        onPress={() => Actions.signup()} // Navegar a la vista de registro
        accessibilityLabel="go sign up button"
/>
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

  logo: {
    width: 200,
    height: 100,
    margin:10,
    borderWidth:2,
    borderRadius:10,
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
    marginBottom:5,
  },

  subTitle: {
    fontSize:24,
    marginBottom:10,
  }
});
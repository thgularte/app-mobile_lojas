import React, { useState, useCallback } from 'react';
import { Platform, View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Image, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { get_lojas, post_loja } from '../../controllers/lojas_controllers';
import DropDown from '../../assets/components/dropdown';
import TagInput from '../../assets/components/tagsInput';

const PageCadastro = () => {
  const navigation = useNavigation();

  // Criar estados para os inputs
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('');
  const [nomeEstabelecimento, setNomeEstabelecimento] = useState('');
  const [cnpjCpf, setCnpjCpf] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');  
  const [whatsapp, setWhatsapp] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [twitter, setTwitter] = useState('');
  const [tags, setTags] = useState('');
  const [descricao, setDescricao] = useState('');
  const [cepErro, setCepErro] = useState(false);
  const [cpfCnpjErro, setCpfCnpjErro] = useState(false);
  const [categoria, setCategoria] = useState('')
  const validarCEP = async (cep) => {
    const cepFormatado = cep.replace(/\D/g, '');
  
    if (cepFormatado.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepFormatado}/json/`);
        const data = await response.json();
  
        if (data.erro) {
          setCepErro(true); // Marca o campo como com erro
          alert('CEP inválido!');
          return false;
        } else {
          setCepErro(false); // Remove o erro se válido
          setRua(data.logradouro); // Preenche o campo "Rua" automaticamente
          setBairro(data.bairro);
          setCidade(data.localidade);
          setEstado(data.uf)
          return true;
        }
      } catch (error) {
        setCepErro(true); // Marca erro em caso de falha na API
        alert('Erro na validação do CEP!');
        return false;
      }
    } else {
      setCepErro(true); // Marca erro se o CEP tiver menos de 8 dígitos
      alert('CEP deve ter 8 dígitos!');
      return false;
    }
  };
  

  const validarCpfCnpj = (valor) => {
    const cleanValue = valor.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cleanValue.length === 11) {
      // Validação de CPF
      let soma = 0;
      let resto;

      if (/^(\d)\1+$/.test(cleanValue)) return false; // Verifica se todos os dígitos são iguais

      for (let i = 1; i <= 9; i++) {
        soma += parseInt(cleanValue.substring(i - 1, i)) * (11 - i);
      }

      resto = (soma * 10) % 11;

      if (resto === 10 || resto === 11) resto = 0;
      if (resto !== parseInt(cleanValue.substring(9, 10))) return false;

      soma = 0;
      for (let i = 1; i <= 10; i++) {
        soma += parseInt(cleanValue.substring(i - 1, i)) * (12 - i);
      }

      resto = (soma * 10) % 11;

      if (resto === 10 || resto === 11) resto = 0;
      if (resto !== parseInt(cleanValue.substring(10, 11))) return false;

      return true;
    } else if (cleanValue.length === 14) {
      // Validação de CNPJ
      let tamanho = cleanValue.length - 2;
      let numeros = cleanValue.substring(0, tamanho);
      let digitos = cleanValue.substring(tamanho);
      let soma = 0;
      let pos = tamanho - 7;

      if (/^(\d)\1+$/.test(cleanValue)) return false; // Verifica se todos os dígitos são iguais

      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }

      let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

      if (resultado !== parseInt(digitos.charAt(0))) return false;

      tamanho += 1;
      numeros = cleanValue.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;

      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }

      resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

      if (resultado !== parseInt(digitos.charAt(1))) return false;

      return true;
    } else {
      return false; // Valor inválido (não é CPF nem CNPJ)
    }
  };

  const handleBlurCpfCnpj = () => {
    if (!validarCpfCnpj(cnpjCpf)) {
      setCpfCnpjErro(true); // Marca o campo como com erro
      alert('CPF ou CNPJ inválido!');
    } else {
      setCpfCnpjErro(false); // Remove o erro se válido
    }
  };

  const handleSocialInput = (network, text) => {
    switch (network) {
      case 'whatsapp':
        setWhatsapp(text);
        break;
      case 'instagram':
        setInstagram(text);
        break;
      case 'facebook':
        setFacebook(text);
        break;
      case 'twitter':
        setTwitter(text);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    const dadosCadastro = {
      email, 
      senha,
      nomeEstabelecimento,
      cnpjCpf,
      cep,
      rua,
      numero,
      bairro,
      estado,
      cidade,
      categoria,
      comunicacao: { whatsapp, instagram, facebook, twitter },
      tags,
      descricao
    };
  
    try {
      const res = await post_loja(dadosCadastro);  // Chama a função assíncrona post_loja
      console.log(res);  // Exibe a resposta no console
    } catch (error) {
      // Tratamento de erros
      console.error('Erro no cadastro:', error);
      alert('Ocorreu um erro ao cadastrar a loja. Por favor, tente novamente mais tarde.');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <Image source={require('../../assets/images/logo_redondo.png')} style={styles.icon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Cadastre a loja</Text>
        </View>

        {/* Formulário */}
        
        <View style={styles.form}>
          {/* Nome do estabelecimento */}
          <TextInput 
            style={styles.input} 
            placeholder="E-mail" 
            placeholderTextColor="#888" 
            value={email}
            onChangeText={setEmail}
          />
            <TextInput 
            style={styles.input} 
            placeholder="Senha"
            secureTextEntry
            placeholderTextColor="#888" 
            value={senha}
            onChangeText={setSenha}
          />
          <TextInput 
            style={styles.input} 
            placeholder="Nome do estabelecimento" 
            placeholderTextColor="#888" 
            value={nomeEstabelecimento}
            onChangeText={setNomeEstabelecimento}
          />

          {/* Documento */}
          <TextInput
            style={[styles.input, cpfCnpjErro && styles.inputErro]} // Aplica o estilo de erro se necessário
            placeholder="CNPJ/CPF"
            placeholderTextColor="#888"
            value={cnpjCpf}
            onChangeText={setCnpjCpf}
            onBlur={handleBlurCpfCnpj} // Valida ao sair do campo
          />

          {/* Localização */}
          <TextInput 
            style={[styles.input, cepErro && styles.inputErro]} // Aplica o estilo de erro se necessário
            placeholder="CEP" 
            placeholderTextColor="#888" 
            value={cep}
            onChangeText={setCep}
            onBlur={() => validarCEP(cep)} // Chama a validação ao sair do campo
          />
          <View style={styles.addressRow}>
            <TextInput 
              style={[styles.input, styles.smallInput]} 
              placeholder="Rua" 
              placeholderTextColor="#888" 
              value={rua} // Campo "Rua" é preenchido automaticamente
              onChangeText={setRua}
            />
            <TextInput 
              style={[styles.input, styles.smallInput]} 
              placeholder="Número" 
              placeholderTextColor="#888" 
              value={numero}
              onChangeText={setNumero}
            />
          </View>

          {/* Redes Sociais */}
          <Text style={styles.socialTitle}>Adicione meios de comunicação</Text>
          <View style={styles.socialContainer}>
            {['whatsapp', 'instagram', 'facebook', 'twitter'].map((network) => (
              <TextInput 
                key={network}
                style={styles.socialInput} 
                placeholder={`Adicionar ${network}`} 
                value={network === 'whatsapp' ? whatsapp : network === 'instagram' ? instagram : network === 'facebook' ? facebook : twitter}
                onChangeText={(text) => handleSocialInput(network, text)}
                placeholderTextColor="#888" 
              />
            ))}
          </View>
          
          <DropDown selectedValue={categoria} setSelectedValue={setCategoria}></DropDown>
          {/* Tags */}
          <TagInput tags={tags} setTags={setTags}></TagInput>
          {/* Descrição */}
          <TextInput 
            style={[styles.input, styles.largeInput]} 
            placeholder="Descrição" 
            multiline
            placeholderTextColor="#888" 
            value={descricao}
            onChangeText={setDescricao}
          />
        </View>

        {/* Botões */}
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("PageLogin")}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#400C58',
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
  },
  input: {
    height: 50,
    width: '100%',
    backgroundColor: '#FFF',
   borderRadius: 3,
    marginBottom: 16,
    paddingHorizontal: 12,
    color: '#000',
  },
  smallInput: {
    width: '48%',
  },
  addressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialTitle: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 8,
    marginTop: 20,
  },
  socialContainer: {
    marginBottom: 20,
  },
  socialInput: {
    height: 50,
    backgroundColor: '#FFF',
   borderRadius: 3,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  largeInput: {
    height: 100,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 32,
   borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: '48%',
  },
  buttonText: {
    fontSize: 16,
    color: '#4A148C',
    fontWeight: 'bold',
  },
  inputErro: {
    borderColor: '#FF0000',
    borderWidth: 2,
  },
});

export default PageCadastro;

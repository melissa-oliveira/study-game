import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';

const ComoJogar = () => {
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Como jogar</Text>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Flashcard</Text>
                    <View style={styles.content}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>- Crie um um jogo selecionando “flashcard” e insira a pergunta e a resposta de cada cartão.</Text>
                            <Text style={styles.text}>- Inicie o jogo escolhido.</Text>
                            <Text style={styles.text}>- Quando aparecer um flashcard, leia a pergunta e pense na resposta.</Text>
                            <Text style={styles.text}>- Vire o cartão, análise a resposta e selecione o seu desempenho.</Text>
                        </View>
                        <Image source={require('@/assets/images/flashcard.png')} style={styles.image} />
                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={[styles.button, styles.wrongButton, styles.shadow]}>
                            <Text style={styles.buttonText}>ERREI</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.easyButton, styles.shadow]}>
                            <Text style={styles.buttonText}>FÁCIL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.hardButton, styles.shadow]}>
                            <Text style={styles.buttonText}>DIFÍCIL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.guessButton, styles.shadow]}>
                            <Text style={styles.buttonText}>CHUTE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quiz</Text>
                    <View style={styles.content}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>- Crie um um jogo selecionando “quiz” e insira a pergunta e até 4 respostas, sendo apenas uma correta.</Text>
                            <Text style={styles.text}>- Inicie o jogo escolhido.</Text>
                            <Text style={styles.text}>- Ao aparecer cada pergunta e suas opções de respostas, selecione a resposta que você acredita ser a correta.</Text>
                            <Text style={styles.text}>- Se acertar a questão, selecione o que achou da questão entre “fácil”, “difícil” ou “chute”.</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f7c6b1',
    },
    container: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
        color: '#455f8f',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
        color: '#d37361',
        fontWeight: 'bold',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    textContainer: {
        flex: 1,
        paddingRight: 10,
    },
    text: {
        color: '#455f8f',
        lineHeight: 20,
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 16,
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    button: {
        borderRadius: 5,
        padding: 10,
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    wrongButton: {
        backgroundColor: '#ffd670',
    },
    easyButton: {
        backgroundColor: '#5fd98e',
    },
    hardButton: {
        backgroundColor: '#f28482',
    },
    guessButton: {
        backgroundColor: '#809bce',
    },
    buttonText: {
        fontSize: 14,
        color: '#fff',
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default ComoJogar;

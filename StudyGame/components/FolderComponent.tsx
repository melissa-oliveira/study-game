import { Colors } from '@/constants/Colors';
import { Folder } from '@/models/Folder';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
    folder: Folder
}

export function FolderComponent(props: Props) {

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const handleDeleteFolder = () => {
        axios.delete(apiUrl + '/folder/' + props.folder.id)
            .then(response => {
                console.log('Folder deleted: ', response.data);
            })
            .catch(error => {
                console.error('Error deleting folder: ', error);
            });

    }

    return (
        <TouchableOpacity style={styles.folderContainer}>
            <Text style={styles.folderName}>{props.folder.description}</Text>
            <View style={styles.actionsContainer}>
                <TouchableOpacity onPress={handleDeleteFolder}>
                    <Ionicons name='trash-outline' size={18} color={Colors.azul} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    folderContainer: {
        backgroundColor: Colors.rosaMedio,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        marginTop: 15,
        borderRadius: 10,
    },
    folderName: {
        color: Colors.azul,
        fontSize: 16,
        fontWeight: '500',
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});
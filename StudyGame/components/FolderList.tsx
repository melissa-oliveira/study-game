import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { FolderComponent } from './FolderComponent'; // Importe corretamente o componente FolderComponent
import { Folder } from '@/models/Folder'; // Importe corretamente o tipo Folder
import { MenuProvider } from 'react-native-popup-menu';

type Props = {
    folders: Folder[]
}

const FolderList = (props: Props) => {
    const sortedFolders = props.folders.sort((a, b) => a.description.localeCompare(b.description));

    return (
        <MenuProvider>
            <FlatList
                data={sortedFolders}
                renderItem={({ item, index }) => {
                    return (
                        <FolderComponent
                            key={index.toString()}
                            folder={item}
                        />
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
            />
        </MenuProvider>
    );
};

export default FolderList;

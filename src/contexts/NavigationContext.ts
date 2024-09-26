import { NavigationContainerRef } from '@react-navigation/native';
import { createRef } from 'react';

type RootStackParamList = {
    Home: undefined; // Se a rota 'Home' não tiver parâmetros
    Profile: { userId: string }; // Exemplo de rota com parâmetro
    // Adicione outras rotas e seus parâmetros aqui
  };
  
export const navigationRef = createRef<NavigationContainerRef<RootStackParamList>>();

export function navigate(name:any) {
  navigationRef.current?.navigate(name);
}
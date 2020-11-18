# Tutos-Mobile

<h2 align="center">Tuto's Mobile</h2>
<h3 align="center">Proyecto UVG Ingeniería de Software</h3>

## Configuración de entorno

* Instalar Yarn
* Instalar React
* Clonar repo
* Instalar dependencias
    ```shell
    $ yarn install
    ```
* Crear archivos locales nativos
    ```shell
    $ yarn add react-native-eject
    $ npx react-native eject
    ```
* Para iOS dentro de carpeta tutos/ios
    ```shell
    $ pod install
    ```

## Desarrollo

* [Configuracion para correr en simulador o en dispositivo](https://reactnative.dev/docs/environment-setup)
* Crear archivo de configuracion local en /tutos/src/localsettings.js
    ```js
    export const LOCAL_URL = 'http://192.168.1.16:3000/api'   // Usa tu ip
    ```
* Run Server en Android dos diferentes consolas
    ```shell
    $ yarn start
    $ yarn android
    ```

* Run Server en iOS dos diferentes consolas
    ```shell
    $ yarn start
    $ yarn ios (o ejecutar archivo .workspace)
    ```

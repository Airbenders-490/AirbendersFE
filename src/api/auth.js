// API calls regarding authentification
import AsyncStorage from '@react-native-async-storage/async-storage';

export var AuthAPI = {

    async getData(key) {
        try {
            return await AsyncStorage.getItem(key)
        } catch (e) {
            // error reading value
            console.log("error reading value")
            return e;
        }
    },

    async setData(key, value) {
        try {
            return await AsyncStorage.setItem(key, value)
        } catch (e) {
            // error reading value
            console.log("error reading value")
            return e;
        }
    },

    async getConfig() {
        let token  = await this.getData('token')

        return {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    },

    async getUserID() {
        return await this.getData("userID")
    },

    async getToken() {
        return await this.getData('token')
    }

}
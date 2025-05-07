import { Account, Client, Databases, ID, Storage, Query } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('flashpay'); 

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

const DATABASE_ID = 'flashpay-db';

export { account, client, DATABASE_ID, databases, ID, storage, Query };


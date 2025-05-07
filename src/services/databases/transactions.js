import { DATABASE_ID, databases, ID, Query } from "../../lib/appwrite";

const TRANSACTIONS_COLLECTION_ID = "transactions";

/**
 * Crée un document transaction
 * @param {string} sender - ID de l'expéditeur
 * @param {string} receiver - ID du destinataire 
 * @param {string} motif - Motif de la transaction
 * @param {number} montant - Montant de la transaction
 * @param {string} type - Type de transaction soit envoi | reception
 * @returns {Promise<Object>}
 */
export async function createTransaction(senderId, receiverId, motif, montant, type) {
    return await databases.createDocument(
        DATABASE_ID,
        TRANSACTIONS_COLLECTION_ID,
        ID.unique(),
        {
            senderId,
            receiverId,
            motif,
            montant,
            type
        }
    );
}

/**
 * Récupère les transactions liées à un utilisateur (en tant qu'expéditeur ou destinataire)
 * @param {string} userId - ID de l'utilisateur
 * @returns {Promise<Array<Object>>}
 */
export async function getTransactionsByUser(userId) {
    return await databases.listDocuments(
        DATABASE_ID,
        TRANSACTIONS_COLLECTION_ID,
        [
            Query.or([
                Query.equal('senderId', userId),
                Query.equal('receiverId', userId)
            ]),
            Query.orderDesc("$createdAt")
        ]
    );
}

/**
 * Récupère les 5 dernières transactions d'un utilisateur
 * @param {string} userId - ID de l'utilisateur
 * @returns {Promise<Array<Object>>}
 */
export async function getRecentTransactionsByUser(userId) {
    return await databases.listDocuments(
        DATABASE_ID,
        TRANSACTIONS_COLLECTION_ID,
        [
            Query.or([
                Query.equal('senderId', userId),
                Query.equal('receiverId', userId)
            ]),
            Query.orderDesc("$createdAt"),
            Query.limit(5)
        ]
    );
}

/**
 * Récupère les transactions de réception pour un utilisateur (où l'utilisateur est l'expéditeur)
 * @param {string} userId - ID de l'utilisateur
 * @returns {Promise<Array<Object>>}
 */
export async function getReceptionTransactions(userId) {
    return await databases.listDocuments(
        DATABASE_ID,
        TRANSACTIONS_COLLECTION_ID,
        [
            Query.and([
                Query.equal('senderId', userId),
                Query.equal('type', 'RECEPTION')
            ]),
            Query.orderDesc("$createdAt")
        ]
    );
}




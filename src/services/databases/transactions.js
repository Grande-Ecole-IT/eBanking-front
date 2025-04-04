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
            ])
        ]
    );
}
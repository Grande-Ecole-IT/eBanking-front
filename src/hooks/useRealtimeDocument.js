import { useEffect } from 'react';
import { client, DATABASE_ID } from '../lib/appwrite';

/**
 * Hook pour s'abonner aux nouvelles transactions en temps réel
 * @param {function} callback - Fonction appelée lorsqu'une nouvelle transaction est créée
 * @returns {void}
 */
export function useRealtimeDocument(callback, prevData, TRANSACTIONS_COLLECTION_ID = "transactions") {
  useEffect(() => {
    // S'abonner aux événements de création de documents
    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${TRANSACTIONS_COLLECTION_ID}.documents`,
      (response) => {
        if (response.events.includes('databases.*.collections.*.documents.*.create')) {
          callback([prevData, response.payload]);
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [callback, TRANSACTIONS_COLLECTION_ID, prevData]);
}

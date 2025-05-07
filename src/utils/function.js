export const formatDate = (isoString) => {
    if (!isoString) return "Date inconnue";
    
    const date = new Date(isoString);
    
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
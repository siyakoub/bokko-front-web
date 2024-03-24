export async function uploadImageToPCloud(imageFile: any) {
    // Vérifie si le fichier est un JPG ou un PNG
    if (imageFile.type !== 'image/jpeg' && imageFile.type !== 'image/png') {
        console.error('Le fichier doit être une image au format JPG ou PNG.');
        return;
    }

    const formData = new FormData();
    formData.append('file', imageFile);

    try {
        const response = await fetch('https://api.pcloud.com/uploadfile?path=/dossierdestockage&auth=TON_AUTH_TOKEN', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        if (data && data.metadata) {
            console.log('URL de l\'image :', data.metadata[0].filelink);
            // Ici, tu peux mettre à jour l'état de ton composant avec l'URL de l'image
        } else {
            console.error('Erreur lors de l\'upload de l\'image');
        }
    } catch (error) {
        console.error('Erreur lors de l\'upload vers pCloud:', error);
    }
}


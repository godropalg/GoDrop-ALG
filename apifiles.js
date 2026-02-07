// apifiles.js - Gestione file completa
export default async function handler(req, res) {
  // Imposta CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Gestisci preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    if (req.method === 'GET') {
      // GET: Ottieni file usando codice
      const { code } = req.query;
      
      if (!code) {
        return res.status(400).json({ 
          error: 'Codice richiesto',
          esempio: '/api/files?code=ABCD'
        });
      }
      
      // Database simulato (in memoria)
      const filesDB = {
        'ABCD': { 
          name: 'documento_esempio.pdf', 
          size: '2.5 MB', 
          time: '5 minuti fa',
          type: 'application/pdf',
          url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
        },
        'EFGH': { 
          name: 'foto_esempio.jpg', 
          size: '1.8 MB', 
          time: '10 minuti fa',
          type: 'image/jpeg',
          url: 'https://picsum.photos/800/600'
        }
      };
      
      const file = filesDB[code];
      
      if (file) {
        return res.status(200).json({
          success: true,
          code: code,
          file: file,
          downloadUrl: file.url,
          instructions: 'Usa questo URL per scaricare il file',
          expiresIn: '24 ore'
        });
      } else {
        return res.status(404).json({ 
          success: false,
          error: 'File non trovato',
          message: 'Codice errato o file scaduto'
        });
      }
    }
    
    if (req.method === 'POST') {
      // POST: Carica nuovo file (simulato)
      const body = req.body;
      const { fileName, fileSize } = body;
      
      // Genera codice a 4 lettere
      const code = generate4LetterCode();
      
      // Simula salvataggio
      console.log('📁 File salvato:', {
        code: code,
        name: fileName || 'file_senza_nome',
        size: fileSize || '0 MB',
        timestamp: new Date().toISOString()
      });
      
      return res.status(200).json({
        success: true,
        message: 'File caricato con successo',
        code: code,
        file: {
          name: fileName || 'file_senza_nome',
          size: fileSize || '0 MB',
          uploaded: new Date().toLocaleTimeString('it-IT')
        },
        instructions: 'Usa questo codice sul sito web per scaricare',
        shareUrl: `https://${req.headers.host}/?code=${code}`
      });
    }
    
    return res.status(405).json({ 
      error: 'Metodo non consentito',
      methods: ['GET', 'POST']
    });
    
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Errore interno del server',
      message: error.message
    });
  }
}

// Genera codice a 4 lettere casuali
function generate4LetterCode() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return code;
}
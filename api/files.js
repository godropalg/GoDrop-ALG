export default function handler(req, res) {
  // Permetti chiamate da qualsiasi origine
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const { code } = req.query;
    
    // Database fittizio per test
    const db = {
      'TEST': { 
        name: 'file_di_prova.txt', 
        size: '1.2 MB',
        type: 'text/plain',
        url: 'https://www.learningcontainer.com/wp-content/uploads/2020/04/sample-text-file.txt'
      },
      'ABCD': { 
        name: 'documento_esempio.pdf', 
        size: '2.5 MB',
        type: 'application/pdf',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
      }
    };
    
    const file = db[code];
    
    if (file) {
      return res.json({
        success: true,
        message: '✅ API FUNZIONANTE!',
        code: code,
        file: file,
        downloadUrl: file.url
      });
    } else {
      return res.status(404).json({
        success: false,
        error: 'Codice non valido. Usa "TEST" o "ABCD" per testare.'
      });
    }
  }

  return res.status(405).json({ error: 'Metodo non consentito. Usa GET.' });
}

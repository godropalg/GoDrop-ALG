// apistats.js - Statistiche live
let stats = {
  totalFiles: 1247,
  todayFiles: 45,
  activeUsers: 162,
  totalDownloads: 2891,
  revenue: 124.50
};

export default async function handler(req, res) {
  // Imposta CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  
  try {
    if (req.method === 'GET') {
      // Aggiorna statistiche live
      stats.todayFiles += Math.floor(Math.random() * 3);
      stats.activeUsers = 150 + Math.floor(Math.random() * 50);
      
      return res.status(200).json({
        success: true,
        stats: stats,
        live: {
          usersOnline: stats.activeUsers,
          filesToday: stats.todayFiles,
          totalTransfers: stats.totalDownloads
        },
        serverTime: new Date().toLocaleString('it-IT')
      });
    }
    
    if (req.method === 'POST') {
      // Aggiorna statistiche (chiamato da client)
      const { action, value } = req.body;
      
      if (action === 'file_uploaded') {
        stats.totalFiles++;
        stats.todayFiles++;
      }
      
      if (action === 'download_completed') {
        stats.totalDownloads++;
        // Simula revenue
        const revenue = 0.05 + (Math.random() * 0.10); // €0.05-0.15 per download
        stats.revenue += revenue;
        console.log(`💰 Revenue: +€${revenue.toFixed(2)}`);
      }
      
      return res.status(200).json({
        success: true,
        message: 'Statistiche aggiornate',
        stats: stats
      });
    }
    
    return res.status(405).json({ error: 'Metodo non consentito' });
    
  } catch (error) {
    console.error('Stats API Error:', error);
    return res.status(500).json({ error: 'Errore interno' });
  }
}
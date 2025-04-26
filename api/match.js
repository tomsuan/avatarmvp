export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { name, interests } = req.body;
  
      // Simulate matching logic (replace with real logic later)
      const mockMatch = {
        name: 'Friend Avatar',
        interests: interests, // Echo back the same interests for now
      };
  
      res.status(200).json(mockMatch);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
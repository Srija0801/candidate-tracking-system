import pool from '../config/db.js';

export async function getDashboardStats(req, res) {

  const [[{ totalCandidates }]] = await pool.query(
    'SELECT COUNT(*) AS totalCandidates FROM candidates WHERE is_deleted = 0'
  );

  
  const [candidatesByStatus] = await pool.query(`
    SELECT interview_status, COUNT(*) AS count
    FROM candidates
    WHERE is_deleted = 0
    GROUP BY interview_status
  `);

  
  const [recentCandidates] = await pool.query(`
    SELECT id, full_name, interview_status, created_at
    FROM candidates
    WHERE is_deleted = 0
    ORDER BY created_at DESC
    LIMIT 5
  `);

 
  const [topSkills] = await pool.query(`
    SELECT skill_name, COUNT(*) AS count
    FROM candidate_skills cs
    JOIN candidates c ON cs.candidate_id = c.id
    WHERE c.is_deleted = 0
    GROUP BY skill_name
    ORDER BY count DESC
    LIMIT 10
  `);

  res.json({
    data: {
      totalCandidates,
      candidatesByStatus,
      recentCandidates,
      topSkills
    }
  });
}
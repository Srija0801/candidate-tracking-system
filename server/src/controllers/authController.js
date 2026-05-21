
import pool from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export async function login(req, res) {
  try {
    const { email, password } = req.body;

    
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      });
    }

   
    const [rows] = await pool.query(
      'SELECT * FROM recruiters WHERE email = ?',
      [email]
    );

    
    if (rows.length === 0) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

    const user = rows[0];

   
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );
   
    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

   
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d'
      }
    );

    
    res.status(200).json({
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);

    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
}


export async function me(req, res) {
  try {
    res.status(200).json({
      data: req.user
    });
  } catch (error) {
    console.error('Me error:', error);

    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
}


export async function logout(req, res) {
  try {
    res.status(200).json({
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);

    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
}
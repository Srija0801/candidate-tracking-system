import pool from "../config/db.js";


function validateCandidate(data) {
  const errors = [];

  if (!data.full_name || !data.full_name.trim()) {
    errors.push("Full Name is required");
  }

  if (!data.email || !data.email.trim()) {
    errors.push("Email is required");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    data.email &&
    !emailRegex.test(data.email)
  ) {
    errors.push("Invalid email format");
  }

  if (
    data.years_of_experience &&
    Number(data.years_of_experience) < 0
  ) {
    errors.push(
      "Years of experience cannot be negative"
    );
  }

  if (
    data.resume_link &&
    data.resume_link.trim() &&
    !/^https?:\/\//.test(data.resume_link)
  ) {
    errors.push(
      "Resume link must start with http:// or https://"
    );
  }

  if (errors.length > 0) {
    const error = new Error(
      errors.join(", ")
    );

    error.status = 400;

    throw error;
  }
}


export const getCandidates = async (
  req,
  res,
  next
) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM candidates ORDER BY id DESC"
    );

    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error(
      "Get Candidates Error:",
      error
    );

    next(error);
  }
};


export const getCandidate = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      "SELECT * FROM candidates WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    res.status(200).json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    console.error(
      "Get Candidate Error:",
      error
    );

    next(error);
  }
};


export const createCandidate = async (
  req,
  res,
  next
) => {
  try {
    console.log(
      "Incoming Request Body:",
      req.body
    );

    validateCandidate(req.body);

    const {
      full_name,
      email,
      phone_number,
      years_of_experience,
      skills,
      current_company,
      expected_salary,
      notice_period,
      interview_status,
      resume_link,
      notes,
    } = req.body;

    const skillsString = Array.isArray(
      skills
    )
      ? skills.join(", ")
      : skills || "";

    const [result] = await pool.query(
      `
      INSERT INTO candidates (
        full_name,
        email,
        phone_number,
        years_of_experience,
        skills,
        current_company,
        expected_salary,
        notice_period,
        interview_status,
        resume_link,
        notes
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        full_name,
        email,
        phone_number || null,
        years_of_experience || 0,
        skillsString,
        current_company || null,
        expected_salary || null,
        notice_period || null,
        interview_status || "Applied",
        resume_link || null,
        notes || null,
      ]
    );

    res.status(201).json({
      success: true,
      message:
        "Candidate created successfully",
      candidateId: result.insertId,
    });
  } catch (error) {
    console.error(
      "Create Candidate Error:",
      error
    );

    next(error);
  }
};


export const updateCandidate = async (
  req,
  res,
  next
) => {
  try {
    validateCandidate(req.body);

    const { id } = req.params;

    const {
      full_name,
      email,
      phone_number,
      years_of_experience,
      skills,
      current_company,
      expected_salary,
      notice_period,
      interview_status,
      resume_link,
      notes,
    } = req.body;

    const skillsString = Array.isArray(
      skills
    )
      ? skills.join(", ")
      : skills || "";

    await pool.query(
      `
      UPDATE candidates
      SET
        full_name = ?,
        email = ?,
        phone_number = ?,
        years_of_experience = ?,
        skills = ?,
        current_company = ?,
        expected_salary = ?,
        notice_period = ?,
        interview_status = ?,
        resume_link = ?,
        notes = ?
      WHERE id = ?
      `,
      [
        full_name,
        email,
        phone_number || null,
        years_of_experience || 0,
        skillsString,
        current_company || null,
        expected_salary || null,
        notice_period || null,
        interview_status || "Applied",
        resume_link || null,
        notes || null,
        id,
      ]
    );

    res.status(200).json({
      success: true,
      message:
        "Candidate updated successfully",
    });
  } catch (error) {
    console.error(
      "Update Candidate Error:",
      error
    );

    next(error);
  }
};


export const deleteCandidate = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM candidates WHERE id = ?",
      [id]
    );

    res.status(200).json({
      success: true,
      message:
        "Candidate deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Candidate Error:",
      error
    );

    next(error);
  }
};
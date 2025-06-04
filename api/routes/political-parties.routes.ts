import { Router } from "express";
import pool from "../config/db.config";
import { PoliticalParty } from "../types/service.types";

const router = Router();
const TABLE_NAME = "political_party";

router.get("/", async (req, res) => {
  try {
    const results = await pool.query(`SELECT * FROM ${TABLE_NAME}`);
    const total = results.rows.length;

    // Convert the result to a JSON object: PoliticalParty
    const data: PoliticalParty[] = results.rows.map((row) => {
      return {
        id: row.id,
        name: row.name,
        abbreviation: row.abbreviation,
        founded_date: row.founded_date,
        ideology: row.ideology,
        leader: row.leader,
        headquarters: row.headquarters,
        website: row.website,
        number_of_members: row.number_of_members,
        ballot_status: row.ballot_status,
        presidential_candidate: row.presidential_candidate,
        vice_presidential_candidate: row.vice_presidential_candidate,
      };
    });

    res.status(200).json({ total, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query(
      `SELECT * FROM ${TABLE_NAME} WHERE id = $1`,
      [id]
    );
    const data: PoliticalParty = results.rows[0];
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      name,
      abbreviation,
      founded_date,
      ideology,
      leader,
      headquarters,
      website,
      number_of_members,
      ballot_status,
      presidential_candidate,
      vice_presidential_candidate,
    } = req.body;
    const results = await pool.query(
      `INSERT INTO ${TABLE_NAME} (name, abbreviation, founded_date, ideology, leader, headquarters, website, number_of_members, ballot_status, presidential_candidate, vice_presidential_candidate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [
        name,
        abbreviation,
        founded_date,
        ideology,
        leader,
        headquarters,
        website,
        number_of_members,
        ballot_status,
        presidential_candidate,
        vice_presidential_candidate,
      ]
    );
    const data: PoliticalParty = results.rows[0];
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      abbreviation,
      founded_date,
      ideology,
      leader,
      headquarters,
      website,
      number_of_members,
      ballot_status,
      presidential_candidate,
      vice_presidential_candidate,
    } = req.body;
    const results = await pool.query(
      `UPDATE ${TABLE_NAME} SET name = $1, abbreviation = $2, founded_date = $3, ideology = $4, leader = $5, headquarters = $6, website = $7, number_of_members = $8, ballot_status = $9, presidential_candidate = $10, vice_presidential_candidate = $11 WHERE id = $12 RETURNING *`,
      [
        name,
        abbreviation,
        founded_date,
        ideology,
        leader,
        headquarters,
        website,
        number_of_members,
        ballot_status,
        presidential_candidate,
        vice_presidential_candidate,
        id,
      ]
    );
    const data: PoliticalParty = results.rows[0];
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(`DELETE FROM ${TABLE_NAME} WHERE id = $1`, [id]);
    res.status(200).json({ message: "Political party deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

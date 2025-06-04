import { Router } from "express";
import pool from "../config/db.config";
import {
  PoliticalParty,
  PoliticalPartyDataEdit,
  PoliticalPartyDataNew,
} from "../types/service.types";

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
        created_at: row.created_at,
        updated_at: row.updated_at,
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
    console.log("req.body ->", req.body);

    const {
      name,
      abbreviation,
      presidential_candidate,
      vice_presidential_candidate,
    } = req.body as PoliticalPartyDataNew;

    const created_at = new Date().toISOString();
    const updated_at = new Date().toISOString();

    const results = await pool.query(
      `INSERT INTO ${TABLE_NAME} (name, abbreviation, presidential_candidate, vice_presidential_candidate, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,

      [
        name,
        abbreviation,
        presidential_candidate,
        vice_presidential_candidate,
        created_at,
        updated_at,
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
    console.log("req.body ->", req.body);
    const { id } = req.params;

    const updated_at = new Date().toISOString();
    const {
      name,
      abbreviation,
      presidential_candidate,
      vice_presidential_candidate,
    } = req.body as PoliticalPartyDataEdit;
    const results = await pool.query(
      `UPDATE ${TABLE_NAME} SET name = $1, abbreviation = $2, presidential_candidate = $3, vice_presidential_candidate = $4, updated_at = $5 WHERE id = $6 RETURNING *`,

      [
        name,
        abbreviation,
        presidential_candidate,
        vice_presidential_candidate,
        updated_at,
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

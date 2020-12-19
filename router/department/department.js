const express = require("express");
const router = express.Router();
const sql = require("mssql");
const config = require("../../config");

router.get("/", async (req, res, next) => {
  let pool = await sql.connect(config);
  let result = await pool.request().query(`SELECT *
  FROM [dbo].[Department]`);
  res.status(200).json({
    data: result.recordsets,
  });
});

router.get("/department-byID", async (req, res, next) => {
  try{
    let pool = await sql.connect(config);
    const AutoID = req.body.DepartmentID;
    let result = await pool
    .request()
    .query(`SELECT *
    FROM [dbo].[Department] WHERE [AutoId] = ${AutoID}`);
    res.status(200).json({
      data: result.recordsets,
    });
  }
  catch(e)
  {
    console.log(e);
    next(e)
  }
});

router.get("/department-byID-typ2", async (req, res, next) => {
  try{
    let pool = await sql.connect(config);
    let result = await pool
    .request()
    .input("AutoID",sql.Int, req.body.DepartmentID)
    .query(`SELECT *
    FROM [dbo].[Department] WHERE [AutoId] = @AutoID`);
    res.status(200).json({
      data: result.recordsets,
    });
  }
  catch(e)
  {
    console.log(e);
    next(e)
  }
});

router.get("/department-SSP", async (req, res, next) => {
  try{
    let pool = await sql.connect(config);
    let result = await pool
    .request()
    .execute("DepartmentSSP")
    res.status(200).json({
      data: result.recordsets,
    });
  }
  catch(e)
  {
    console.log(e);
    next(e)
  }
});

router.get("/department-SSP-byID", async (req, res, next) => {
  try{
    let pool = await sql.connect(config);
    let result = await pool
    .request()
    .input("AutoID",sql.Int,req.body.DepaermentID)
    .input("AutoID2",sql.Int,req.body.AutoID2)
    .execute("DepartmentSSP-1")
    res.status(200).json({
      data: result.recordsets,
    });
  }
  catch(e)
  {
    console.log(e);
    next(e)
  }
});


router.post("/", async (req, res, next) => {
  try{
    let pool = await sql.connect(config);
    let result = await pool
    .request()
    .input("Name",sql.VarChar,req.body.Name)
    .input("Description",sql.VarChar,req.body.Description)
      .query(`INSERT INTO [dbo].[Department]
      (
      [Name],
      [Description])
      VALUES
      (
        @Name,
        @Description
      )`)
    res.status(200).json({
      data: result.recordsets,
    });
  }
  catch(e)
  {
    console.log(e);
    next(e)
  }
});



router.post("/departmentMSP", async (req, res, next) => {
  try{
    let pool = await sql.connect(config);
    let result = await pool
    .request()
    .input("AutoID",sql.Int,req.body.AutoID)
    .input("Department",sql.NVarChar,req.body.Department)
    .execute("DepartmentMSP")
    res.status(200).json({
      data: result.recordsets,
    });
  }
  catch(e)
  {
    console.log(e);
    next(e)
  }
});




module.exports = router;

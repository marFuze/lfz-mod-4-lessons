app.get('/api/grades/:gradeId', (req, res, next) => {
    const { gradeId } = req.params;
    if (!parseInt(gradeId, 10)) {
      return res.status(400).json({
        error: '"gradeId" must be a positive integer'
      });
    }
    const sql = `
      select *
        from "grades"
       where "gradeId" = $1
    `;
    const params = [gradeId];
    // review the documentation on parameterized queries here:
    // https://node-postgres.com/features/queries#Parameterized%20query
    db.query(sql, params)
      .then(result => {
        // the query succeeded, even if nothing was found
        const grade = result.rows[0];
        if (!grade) {
          res.status(404).json({
            error: `Cannot find grade with "gradeId" ${gradeId}`
          });
        } else {
          res.json(grade);
        }
      })
      .catch(err => {
        // the query failed for some reason
        console.error(err);
        res.status(500).json({
          error: 'An unexpected error occurred.'
        });
      });
    // review the documentation on Express.js error handling here:
    // https://expressjs.com/en/guide/error-handling.html
  })
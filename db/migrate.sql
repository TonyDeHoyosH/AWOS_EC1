-- Main migration script to set up the entire database
-- In Docker, we rely on the alphabetical order of files in /docker-entrypoint-initdb.d/
-- or we can use this single file to include others if we were using psql directly.
-- For this project, the docker-compose volumes map individual files. 
-- However, if run manually:

\i db/schema.sql
\i db/seed.sql
\i db/reports_vw.sql
\i db/indexes.sql
\i db/roles.sql
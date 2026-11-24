-- ==============================================================================
-- GeoSpatialX MMI: PostgreSQL 16 + PostGIS Spatial Migration Script
-- Target: SMAN 1 Mejayan, Kab. Madiun, Jawa Timur (SRID 4326 - WGS 84)
-- ==============================================================================

-- 1. Enable PostGIS Extension
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Relational Tables
CREATE TYPE "Role" AS ENUM ('STUDENT', 'TEACHER', 'VALIDATOR', 'ADMIN');
CREATE TYPE "StimulusType" AS ENUM ('IMAGE', 'SATELLITE_CROP', 'THEMATIC_MAP', 'AUDIO', 'VIDEO', 'CASE_STUDY');

-- School Classes
CREATE TABLE IF NOT EXISTS "school_classes" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "name" TEXT NOT NULL UNIQUE,
    "academicYear" TEXT NOT NULL DEFAULT '2026/2027',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE IF NOT EXISTS "users" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',
    "schoolClassId" TEXT REFERENCES "school_classes"("id") ON DELETE SET NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Chapters (6 Geosphere Modules)
CREATE TABLE IF NOT EXISTS "chapters" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "slug" TEXT NOT NULL UNIQUE,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL UNIQUE,
    "description" TEXT NOT NULL,
    "sphereName" TEXT NOT NULL,
    "themeColor" TEXT NOT NULL,
    "videoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Sub Materials
CREATE TABLE IF NOT EXISTS "sub_materials" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "chapterId" TEXT NOT NULL REFERENCES "chapters"("id") ON DELETE CASCADE,
    "slug" TEXT NOT NULL UNIQUE,
    "order" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "contentMarkdown" TEXT NOT NULL,
    "diagramUrl" TEXT,
    "audioUrl" TEXT,
    "videoUrl" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "zoomLevel" INTEGER DEFAULT 14,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "sub_materials_chapter_order_unique" UNIQUE ("chapterId", "order")
);

-- Geospatial Layers with PostGIS Geometry column
CREATE TABLE IF NOT EXISTS "geospatial_layers" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL UNIQUE,
    "level" INTEGER NOT NULL, -- 1: Makro, 2: Meso, 3: Mikro
    "category" TEXT NOT NULL,
    "source_name" TEXT NOT NULL,
    "license_type" TEXT NOT NULL,
    "attribution_text" TEXT NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT FALSE,
    "geom" geometry(Geometry, 4326), -- PostGIS Spatial Column
    "geojson_simplified" JSONB NOT NULL,
    "opacity_default" DOUBLE PRECISION NOT NULL DEFAULT 0.8,
    "stroke_color" TEXT NOT NULL DEFAULT '#00D2EE',
    "fill_color" TEXT NOT NULL DEFAULT '#004090',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Spatial GIST Index for high-performance bounding box queries
CREATE INDEX IF NOT EXISTS "idx_geospatial_layers_geom" ON "geospatial_layers" USING GIST ("geom");
CREATE INDEX IF NOT EXISTS "idx_geospatial_layers_level_verified" ON "geospatial_layers" ("level", "is_verified");

-- Student Progress with Composite Unique Constraint
CREATE TABLE IF NOT EXISTS "student_progress" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
    "subMaterialId" TEXT NOT NULL REFERENCES "sub_materials"("id") ON DELETE CASCADE,
    "isCompleted" BOOLEAN NOT NULL DEFAULT FALSE,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "student_progress_user_submaterial_unique" UNIQUE ("userId", "subMaterialId")
);

-- Quizzes (Chapter-Gated End-of-Chapter Summative Assessments)
CREATE TABLE IF NOT EXISTS "quizzes" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "chapterId" TEXT NOT NULL UNIQUE REFERENCES "chapters"("id") ON DELETE CASCADE,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "timeLimitMinutes" INTEGER NOT NULL DEFAULT 15,
    "passingScore" DOUBLE PRECISION NOT NULL DEFAULT 75.0,
    "totalQuestions" INTEGER NOT NULL DEFAULT 5,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- C4 Hot questions with stimulus
CREATE TABLE IF NOT EXISTS "questions" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "quizId" TEXT NOT NULL REFERENCES "quizzes"("id") ON DELETE CASCADE,
    "order" INTEGER NOT NULL,
    "cognitive_level" TEXT NOT NULL DEFAULT 'C4',
    "stimulus_type" "StimulusType" NOT NULL DEFAULT 'CASE_STUDY',
    "stimulus_url" TEXT,
    "stimulus_text" TEXT NOT NULL,
    "question_text" TEXT NOT NULL,
    "option_a" TEXT NOT NULL,
    "option_b" TEXT NOT NULL,
    "option_c" TEXT NOT NULL,
    "option_d" TEXT NOT NULL,
    "correct_option_key" TEXT NOT NULL,
    "explanation_feedback" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "questions_quiz_order_unique" UNIQUE ("quizId", "order")
);

-- Quiz Attempts
CREATE TABLE IF NOT EXISTS "quiz_attempts" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "quizId" TEXT NOT NULL REFERENCES "quizzes"("id") ON DELETE CASCADE,
    "userId" TEXT NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submittedAt" TIMESTAMP(3),
    "score" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "isPassed" BOOLEAN NOT NULL DEFAULT FALSE,
    "answersJson" JSONB NOT NULL DEFAULT '{}'::jsonb,
    "diagnosticsJson" JSONB NOT NULL DEFAULT '{}'::jsonb,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "idx_quiz_attempts_user_quiz" ON "quiz_attempts" ("userId", "quizId");

-- 3. PostGIS Geometry Helper Function for School Lab Payload Optimization
-- Simplifies complex polygon geometries before sending GeoJSON to client browsers
CREATE OR REPLACE FUNCTION get_simplified_layer_geojson(layer_slug TEXT, tolerance FLOAT DEFAULT 0.001)
RETURNS JSONB AS $$
DECLARE
    result JSONB;
BEGIN
    SELECT jsonb_build_object(
        'type', 'Feature',
        'geometry', ST_AsGeoJSON(ST_SimplifyPreserveTopology(geom, tolerance))::jsonb,
        'properties', jsonb_build_object(
            'id', id,
            'name', name,
            'level', level,
            'source_name', source_name,
            'license_type', license_type,
            'attribution_text', attribution_text
        )
    ) INTO result
    FROM geospatial_layers
    WHERE slug = layer_slug AND is_verified = TRUE;

    RETURN result;
END;
$$ LANGUAGE plpgsql STABLE;

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://vjcupjqgwtrvhmfwfozo.supabase.co";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqY3VwanFnd3RydmhtZndmb3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3ODQ3MDUsImV4cCI6MjA3NzM2MDcwNX0.KVa3oCJzixoR8V8Xqyb4O0hkMEiaKOafw4RXVPw98oM";

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);
